from __future__ import annotations

import html
import logging
import os
from datetime import datetime, timezone
from typing import Any

import httpx
from flask import Flask, jsonify, request, send_from_directory


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

BOT_TOKEN = os.getenv("BOT_TOKEN", "").strip()
ADMIN_CHAT_ID = os.getenv("ADMIN_CHAT_ID", "").strip()
WEBAPP_URL = os.getenv(
    "WEBAPP_URL",
    "https://mera-cafe-mini-app.onrender.com",
).rstrip("/")
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "").strip()

TELEGRAM_API_URL = (
    f"https://api.telegram.org/bot{BOT_TOKEN}"
    if BOT_TOKEN
    else ""
)

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path="/static",
)
app.config["JSON_AS_ASCII"] = False
app.config["MAX_CONTENT_LENGTH"] = 64 * 1024


def clean_text(value: Any, maximum_length: int = 500) -> str:
    if value is None:
        return ""
    return str(value).strip()[:maximum_length]


def escape(value: Any) -> str:
    return html.escape(clean_text(value), quote=True)


def telegram_request(
    method: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 15.0,
) -> dict[str, Any]:
    if not BOT_TOKEN:
        raise RuntimeError("BOT_TOKEN is not configured.")

    try:
        response = httpx.post(
            f"{TELEGRAM_API_URL}/{method}",
            json=payload or {},
            timeout=timeout,
        )
        response.raise_for_status()
        result = response.json()
    except httpx.HTTPError as error:
        logger.exception("Telegram request failed")
        raise RuntimeError("Telegram API request failed.") from error

    if not result.get("ok"):
        raise RuntimeError(
            result.get("description", "Telegram API error.")
        )

    return result


def send_message(
    chat_id: str | int,
    text: str,
    reply_markup: dict[str, Any] | None = None,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    if reply_markup:
        payload["reply_markup"] = reply_markup

    return telegram_request("sendMessage", payload)


def validate_reservation(data: dict[str, Any]) -> tuple[bool, str]:
    required = ("name", "contact", "date", "time", "guests", "seating")

    for field in required:
        if not clean_text(data.get(field)):
            return False, f"{field} is required."

    try:
        selected_date = datetime.strptime(
            clean_text(data.get("date"), 20),
            "%Y-%m-%d",
        ).date()
    except ValueError:
        return False, "Invalid date."

    if selected_date < datetime.now(timezone.utc).date():
        return False, "The selected date is in the past."

    if clean_text(data.get("seating")) not in {
        "Inside",
        "Terrace",
        "No preference",
    }:
        return False, "Invalid seating preference."

    return True, ""


def build_reservation_message(data: dict[str, Any]) -> str:
    telegram_user = data.get("telegramUser") or {}
    username = clean_text(telegram_user.get("username"), 80)
    user_id = clean_text(telegram_user.get("id"), 40)

    telegram_line = ""
    if username:
        telegram_line = f"\n<b>Telegram:</b> @{escape(username)}"
    elif user_id:
        telegram_line = (
            f"\n<b>Telegram user ID:</b> "
            f"<code>{escape(user_id)}</code>"
        )

    request_text = clean_text(data.get("request"), 500) or "—"
    timestamp = datetime.now(timezone.utc).strftime(
        "%Y-%m-%d %H:%M UTC"
    )

    return (
        "🍽 <b>New Mera Café reservation request</b>\n\n"
        f"<b>Name:</b> {escape(data.get('name'))}\n"
        f"<b>Contact:</b> {escape(data.get('contact'))}"
        f"{telegram_line}\n\n"
        f"<b>Date:</b> {escape(data.get('date'))}\n"
        f"<b>Time:</b> {escape(data.get('time'))}\n"
        f"<b>Guests:</b> {escape(data.get('guests'))}\n"
        f"<b>Seating:</b> {escape(data.get('seating'))}\n\n"
        f"<b>Special request:</b>\n{escape(request_text)}\n\n"
        f"<i>Source: {escape(data.get('source') or 'Direct web link')}</i>\n"
        f"<i>Language: {escape(data.get('language') or 'en').upper()}</i>\n"
        f"<i>Sent: {escape(timestamp)}</i>"
    )


def reservation_keyboard() -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {
                    "text": "☕ Open Mini App",
                    "web_app": {"url": WEBAPP_URL},
                }
            ]
        ]
    }


@app.get("/")
def index():
    return send_from_directory(STATIC_DIR, "index.html")


@app.get("/health")
def health():
    return jsonify(
        {
            "ok": True,
            "service": "mera-cafe-mini-app",
            "telegramConfigured": bool(
                BOT_TOKEN and ADMIN_CHAT_ID
            ),
        }
    )


@app.post("/api/reservations")
def create_reservation():
    if not request.is_json:
        return jsonify(
            {"ok": False, "error": "JSON body is required."}
        ), 415

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify(
            {"ok": False, "error": "Invalid request body."}
        ), 400

    valid, error = validate_reservation(data)
    if not valid:
        return jsonify({"ok": False, "error": error}), 400

    if not BOT_TOKEN or not ADMIN_CHAT_ID:
        logger.error("Telegram environment variables are missing.")
        return jsonify(
            {
                "ok": False,
                "error": "The notification bot is not configured.",
            }
        ), 503

    try:
        send_message(
            ADMIN_CHAT_ID,
            build_reservation_message(data),
            reservation_keyboard(),
        )
    except RuntimeError as error:
        logger.exception("Could not send reservation")
        return jsonify(
            {"ok": False, "error": str(error)}
        ), 502

    return jsonify(
        {"ok": True, "message": "Reservation request sent."}
    )


@app.post("/webhook")
def webhook():
    if WEBHOOK_SECRET:
        received = request.headers.get(
            "X-Telegram-Bot-Api-Secret-Token",
            "",
        )
        if received != WEBHOOK_SECRET:
            return jsonify(
                {"ok": False, "error": "Forbidden"}
            ), 403

    update = request.get_json(silent=True) or {}
    message = update.get("message") or {}
    chat_id = (message.get("chat") or {}).get("id")
    text = clean_text(message.get("text"), 500)

    if chat_id is not None and text.startswith("/start"):
        send_message(
            chat_id,
            (
                "Welcome to <b>Mera Café</b> ☀️\n\n"
                "Explore the menu and send a table reservation request."
            ),
            {
                "inline_keyboard": [
                    [
                        {
                            "text": "☕ Open Mera Café",
                            "web_app": {"url": WEBAPP_URL},
                        }
                    ]
                ]
            },
        )

    return jsonify({"ok": True})


def setup_webhook() -> None:
    if not BOT_TOKEN or not WEBAPP_URL.startswith("https://"):
        return

    payload: dict[str, Any] = {
        "url": f"{WEBAPP_URL}/webhook",
        "allowed_updates": ["message"],
    }

    if WEBHOOK_SECRET:
        payload["secret_token"] = WEBHOOK_SECRET

    try:
        result = telegram_request("setWebhook", payload)
        logger.info("Webhook setup result: %s", result)
    except RuntimeError:
        logger.exception("Webhook setup failed")


setup_webhook()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "10000")),
        debug=False,
    )
