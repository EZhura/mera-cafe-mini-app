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

TELEGRAM_API_URL = (
    f"https://api.telegram.org/bot{BOT_TOKEN}"
    if BOT_TOKEN
    else ""
)

WEBHOOK_SECRET = os.getenv(
    "WEBHOOK_SECRET",
    "",
).strip()

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path="/static",
)

app.config["JSON_AS_ASCII"] = False
app.config["MAX_CONTENT_LENGTH"] = 64 * 1024


def telegram_request(
    method: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 15.0,
) -> dict[str, Any]:
    """
    Send a request to the Telegram Bot API.
    """

    if not BOT_TOKEN:
        raise RuntimeError(
            "BOT_TOKEN is not configured."
        )

    url = f"{TELEGRAM_API_URL}/{method}"

    try:
        response = httpx.post(
            url,
            json=payload or {},
            timeout=timeout,
        )

        response.raise_for_status()

        result = response.json()

    except httpx.HTTPError as error:
        logger.exception(
            "Telegram HTTP request failed: %s",
            error,
        )

        raise RuntimeError(
            "Telegram API request failed."
        ) from error

    if not result.get("ok"):
        logger.error(
            "Telegram API returned an error: %s",
            result,
        )

        raise RuntimeError(
            result.get(
                "description",
                "Telegram API returned an error.",
            )
        )

    return result


def send_telegram_message(
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

    return telegram_request(
        "sendMessage",
        payload,
    )


def edit_telegram_message(
    chat_id: str | int,
    message_id: int,
    text: str,
) -> dict[str, Any]:
    return telegram_request(
        "editMessageText",
        {
            "chat_id": chat_id,
            "message_id": message_id,
            "text": text,
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        },
    )


def answer_callback_query(
    callback_query_id: str,
    text: str,
) -> None:
    telegram_request(
        "answerCallbackQuery",
        {
            "callback_query_id": callback_query_id,
            "text": text,
        },
    )


def clean_text(
    value: Any,
    maximum_length: int = 500,
) -> str:
    if value is None:
        return ""

    text = str(value).strip()

    if len(text) > maximum_length:
        text = text[:maximum_length]

    return text


def escape(value: Any) -> str:
    return html.escape(
        clean_text(value),
        quote=True,
    )


def validate_reservation(
    data: dict[str, Any],
) -> tuple[bool, str]:
    required_fields = {
        "name": "Name",
        "contact": "Contact",
        "date": "Date",
        "time": "Time",
        "guests": "Number of guests",
        "seating": "Seating preference",
    }

    for field, label in required_fields.items():
        if not clean_text(data.get(field)):
            return False, f"{label} is required."

    name = clean_text(data.get("name"), 80)
    contact = clean_text(data.get("contact"), 100)

    if len(name) < 2:
        return False, "Please enter a valid name."

    if len(contact) < 3:
        return False, "Please enter a valid contact."

    date_value = clean_text(data.get("date"), 20)

    try:
        selected_date = datetime.strptime(
            date_value,
            "%Y-%m-%d",
        ).date()

    except ValueError:
        return False, "Invalid date format."

    today = datetime.now(timezone.utc).date()

    if selected_date < today:
        return False, "The selected date is in the past."

    allowed_seating = {
        "Inside",
        "Terrace",
        "No preference",
    }

    if clean_text(data.get("seating")) not in allowed_seating:
        return False, "Invalid seating preference."

    return True, ""


def build_reservation_message(
    data: dict[str, Any],
) -> str:
    telegram_user = data.get("telegramUser") or {}

    username = clean_text(
        telegram_user.get("username"),
        80,
    )

    telegram_user_id = clean_text(
        telegram_user.get("id"),
        40,
    )

    source = clean_text(
        data.get("source"),
        120,
    ) or "Unknown"

    language = clean_text(
        data.get("language"),
        10,
    ).upper() or "EN"

    request_text = clean_text(
        data.get("request"),
        500,
    ) or "—"

    timestamp = datetime.now(
        timezone.utc
    ).strftime("%Y-%m-%d %H:%M UTC")

    telegram_details = ""

    if username:
        telegram_details = (
            f"\n<b>Telegram:</b> @{escape(username)}"
        )

    elif telegram_user_id:
        telegram_details = (
            f"\n<b>Telegram user ID:</b> "
            f"<code>{escape(telegram_user_id)}</code>"
        )

    return (
        "🍽 <b>New Mera Café reservation request</b>\n\n"
        f"<b>Name:</b> {escape(data.get('name'))}\n"
        f"<b>Contact:</b> {escape(data.get('contact'))}"
        f"{telegram_details}\n\n"
        f"<b>Date:</b> {escape(data.get('date'))}\n"
        f"<b>Time:</b> {escape(data.get('time'))}\n"
        f"<b>Guests:</b> {escape(data.get('guests'))}\n"
        f"<b>Seating:</b> {escape(data.get('seating'))}\n\n"
        f"<b>Special request:</b>\n"
        f"{escape(request_text)}\n\n"
        f"<i>Source: {escape(source)}</i>\n"
        f"<i>Language: {escape(language)}</i>\n"
        f"<i>Sent: {escape(timestamp)}</i>"
    )


def reservation_keyboard() -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {
                    "text": "✅ Confirm reservation",
                    "callback_data": "reservation_confirm",
                }
            ],
            [
                {
                    "text": "💬 Contact guest",
                    "callback_data": "reservation_contact",
                },
                {
                    "text": "🕒 Suggest another time",
                    "callback_data": "reservation_reschedule",
                },
            ],
            [
                {
                    "text": "☕ Open Mini App",
                    "web_app": {
                        "url": WEBAPP_URL,
                    },
                }
            ],
        ]
    }


def welcome_keyboard() -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {
                    "text": "☕ Open Mera Café",
                    "web_app": {
                        "url": WEBAPP_URL,
                    },
                }
            ]
        ]
    }


def handle_start_command(
    chat_id: str | int,
) -> None:
    text = (
        "Welcome to <b>Mera Café</b> ☀️\n\n"
        "Explore our Mediterranean brunch menu, "
        "discover guest favourites and send a "
        "table reservation request.\n\n"
        "Tap the button below to open the café."
    )

    send_telegram_message(
        chat_id,
        text,
        welcome_keyboard(),
    )


def handle_callback_query(
    callback_query: dict[str, Any],
) -> None:
    callback_id = clean_text(
        callback_query.get("id"),
        200,
    )

    data = clean_text(
        callback_query.get("data"),
        100,
    )

    message = callback_query.get("message") or {}

    chat_id = (
        message.get("chat") or {}
    ).get("id")

    message_id = message.get("message_id")
    original_text = clean_text(
        message.get("text"),
        4000,
    )

    status_messages = {
        "reservation_confirm": (
            "✅ Reservation marked as confirmed."
        ),
        "reservation_contact": (
            "💬 Contact the guest using the contact "
            "details in the request."
        ),
        "reservation_reschedule": (
            "🕒 Reservation marked for time clarification."
        ),
    }

    status_text = status_messages.get(data)

    if not status_text:
        if callback_id:
            answer_callback_query(
                callback_id,
                "Unknown action.",
            )

        return

    if callback_id:
        answer_callback_query(
            callback_id,
            status_text,
        )

    if (
        chat_id is not None
        and message_id is not None
        and original_text
    ):
        updated_text = (
            f"{escape(original_text)}\n\n"
            f"<b>{escape(status_text)}</b>"
        )

        try:
            edit_telegram_message(
                chat_id,
                int(message_id),
                updated_text,
            )

        except RuntimeError:
            logger.exception(
                "Could not edit reservation message."
            )


@app.get("/")
def index():
    return send_from_directory(
        STATIC_DIR,
        "index.html",
    )


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
        return (
            jsonify(
                {
                    "ok": False,
                    "error": "JSON body is required.",
                }
            ),
            415,
        )

    data = request.get_json(
        silent=True,
    )

    if not isinstance(data, dict):
        return (
            jsonify(
                {
                    "ok": False,
                    "error": "Invalid request body.",
                }
            ),
            400,
        )

    is_valid, validation_error = (
        validate_reservation(data)
    )

    if not is_valid:
        return (
            jsonify(
                {
                    "ok": False,
                    "error": validation_error,
                }
            ),
            400,
        )

    if not BOT_TOKEN:
        logger.error(
            "Reservation received, but BOT_TOKEN "
            "is not configured."
        )

        return (
            jsonify(
                {
                    "ok": False,
                    "error": (
                        "The notification bot is not configured."
                    ),
                }
            ),
            503,
        )

    if not ADMIN_CHAT_ID:
        logger.error(
            "Reservation received, but ADMIN_CHAT_ID "
            "is not configured."
        )

        return (
            jsonify(
                {
                    "ok": False,
                    "error": (
                        "The administrator chat is not configured."
                    ),
                }
            ),
            503,
        )

    message = build_reservation_message(data)

    try:
        telegram_result = send_telegram_message(
            ADMIN_CHAT_ID,
            message,
            reservation_keyboard(),
        )

    except RuntimeError as error:
        logger.exception(
            "Could not send reservation notification."
        )

        return (
            jsonify(
                {
                    "ok": False,
                    "error": str(error),
                }
            ),
            502,
        )

    telegram_message = (
        telegram_result.get("result") or {}
    )

    logger.info(
        "Reservation notification sent. Message ID: %s",
        telegram_message.get("message_id"),
    )

    return jsonify(
        {
            "ok": True,
            "message": "Reservation request sent.",
        }
    )


@app.post("/webhook")
def telegram_webhook():
    if WEBHOOK_SECRET:
        received_secret = request.headers.get(
            "X-Telegram-Bot-Api-Secret-Token",
            "",
        )

        if received_secret != WEBHOOK_SECRET:
            logger.warning(
                "Rejected Telegram webhook with "
                "an invalid secret token."
            )

            return (
                jsonify(
                    {
                        "ok": False,
                        "error": "Forbidden",
                    }
                ),
                403,
            )

    update = request.get_json(
        silent=True,
    ) or {}

    try:
        callback_query = update.get(
            "callback_query"
        )

        if callback_query:
            handle_callback_query(callback_query)
            return jsonify({"ok": True})

        message = update.get("message") or {}
        chat_id = (
            message.get("chat") or {}
        ).get("id")

        text = clean_text(
            message.get("text"),
            500,
        )

        if chat_id is not None and text:
            command = text.split()[0].lower()

            if command.startswith("/start"):
                handle_start_command(chat_id)

            elif command.startswith("/menu"):
                handle_start_command(chat_id)

            elif command.startswith("/reserve"):
                handle_start_command(chat_id)

    except Exception:
        logger.exception(
            "Telegram webhook processing failed."
        )

    return jsonify({"ok": True})


def setup_webhook() -> None:
    if not BOT_TOKEN:
        logger.warning(
            "BOT_TOKEN is missing. Telegram webhook "
            "was not configured."
        )

        return

    if not WEBAPP_URL.startswith("https://"):
        logger.warning(
            "WEBAPP_URL must use HTTPS. "
            "Webhook was not configured."
        )

        return

    webhook_url = f"{WEBAPP_URL}/webhook"

    payload: dict[str, Any] = {
        "url": webhook_url,
        "allowed_updates": [
            "message",
            "callback_query",
        ],
        "drop_pending_updates": False,
    }

    if WEBHOOK_SECRET:
        payload["secret_token"] = WEBHOOK_SECRET

    try:
        result = telegram_request(
            "setWebhook",
            payload,
        )

        logger.info(
            "Telegram webhook setup result: %s",
            result,
        )

    except RuntimeError:
        logger.exception(
            "Telegram webhook setup failed."
        )


setup_webhook()


if __name__ == "__main__":
    port = int(
        os.getenv(
            "PORT",
            "10000",
        )
    )

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
    )