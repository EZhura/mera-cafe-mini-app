"use strict";

const telegramWebApp = window.Telegram ? .WebApp ? ? null;

if (telegramWebApp) {
    telegramWebApp.ready();
    telegramWebApp.expand();

    try {
        telegramWebApp.setHeaderColor("#f4eee4");
        telegramWebApp.setBackgroundColor("#f4eee4");
    } catch (error) {
        console.warn("Telegram theme settings are unavailable:", error);
    }
}

const translations = {
    en: {
        brandTagline: "Mediterranean brunch",
        reserveShort: "Reserve",

        heroEyebrow: "Mediterranean café concept",
        heroSubtitle: "Mediterranean brunch, specialty coffee and slow mornings.",
        viewMenu: "View menu",
        reserveTable: "Reserve a table",

        openDaily: "Open daily",
        demoLocation: "Demo location",
        specialtyCoffee: "Specialty coffee",
        freshDaily: "Fresh daily",

        popularEyebrow: "Guest favourites",
        popularTitle: "Popular right now",
        popularDescription: "The dishes our guests return for.",

        meraBreakfastDescription: "Eggs, avocado, halloumi, vegetables and sourdough.",
        shakshukaDescription: "Baked eggs, tomatoes, peppers, feta and sourdough.",
        salmonDescription: "Poached eggs, smoked salmon, brioche and hollandaise.",
        bowlDescription: "Quinoa, hummus, vegetables, feta and tahini.",
        pistachioDescription: "Buttery pastry with pistachio cream.",
        cheesecakeDescription: "Creamy cheesecake with a caramelised top.",
        viewInMenu: "View in menu",

        menuEyebrow: "Fresh every day",
        menuTitle: "Menu",
        menuDescription: "Choose a category and explore our café menu.",
        selectedCategory: "Selected category",

        categoryBreakfast: "Breakfast",
        categoryBrunch: "Brunch",
        categoryBowls: "Bowls & salads",
        categoryPastries: "Pastries",
        categoryCoffee: "Coffee",
        categoryDrinks: "Cold drinks",

        aboutEyebrow: "Our atmosphere",
        aboutTitle: "A place to slow down",
        aboutText: "Mera is a fictional Mediterranean café concept created to show how a Mini App can combine a digital menu, business information and table reservations in one link.",
        benefitFresh: "Fresh ingredients",
        benefitVegetarian: "Vegetarian options",
        benefitPetFriendly: "Pet-friendly terrace",
        benefitWifi: "Free Wi-Fi",

        visitEyebrow: "Visit us",
        visitText: "A demo location for the Mera Café concept. In a real project, this block contains the exact address, route and active map.",
        hoursLabel: "Opening hours",
        openDailyTime: "Daily · 08:00–20:00",
        contactLabel: "Contact",
        openMap: "Open map",

        faqTitle: "Frequently asked questions",
        faqDescription: "Everything you may want to know before your visit.",

        faqReservationQuestion: "Do you accept reservations?",
        faqReservationAnswer: "Yes. Send a reservation request through the Mini App. The café will confirm availability after receiving it.",

        faqVegetarianQuestion: "Do you have vegetarian options?",
        faqVegetarianAnswer: "Yes. Vegetarian dishes are marked in the menu.",

        faqPetsQuestion: "Is the café pet-friendly?",
        faqPetsAnswer: "Pets are welcome on the terrace.",

        faqWifiQuestion: "Is Wi-Fi available?",
        faqWifiAnswer: "Yes. Free Wi-Fi is available for guests.",

        faqTakeawayQuestion: "Is takeaway available?",
        faqTakeawayAnswer: "Selected drinks, pastries and dishes are available for takeaway.",

        finalEyebrow: "Slow mornings start here",
        finalTitle: "Reserve your table at Mera Café",
        finalText: "Choose a date, time and seating preference. We will contact you to confirm availability.",

        navHome: "Home",
        navMenu: "Menu",
        navReserve: "Reserve",
        navVisit: "Visit",

        reservationEyebrow: "Table reservation",
        reservationTitle: "Reserve a table",
        reservationDescription: "Send a request and the café will confirm availability.",

        nameLabel: "Name",
        namePlaceholder: "Your name",
        contactPlaceholder: "Phone / Telegram / WhatsApp",
        dateLabel: "Date",
        timeLabel: "Time",
        selectTime: "Select time",
        guestsLabel: "Number of guests",
        selectGuests: "Select",
        seatingLabel: "Seating preference",
        selectSeating: "Select",
        seatingInside: "Inside",
        seatingTerrace: "Terrace",
        seatingNoPreference: "No preference",
        requestLabel: "Special request",
        requestPlaceholder: "Allergies, children, a quiet table or another request",

        sendReservation: "Send reservation request",
        formNote: "This is a reservation request, not an automatic confirmation.",

        validationRequired: "Please fill in all required fields.",
        validationDate: "Please select today or a future date.",
        sending: "Sending request…",
        sendSuccess: "Thank you! Your reservation request has been sent. We will contact you to confirm availability.",
        sendError: "The request could not be sent. Please try again.",
        networkError: "Connection error. Please check your internet connection."
    },

    ru: {
        brandTagline: "Средиземноморские завтраки",
        reserveShort: "Бронь",

        heroEyebrow: "Концепт средиземноморского кафе",
        heroSubtitle: "Средиземноморские завтраки, спешелти-кофе и неспешные встречи.",
        viewMenu: "Посмотреть меню",
        reserveTable: "Забронировать столик",

        openDaily: "Открыто ежедневно",
        demoLocation: "Демо-локация",
        specialtyCoffee: "Спешелти-кофе",
        freshDaily: "Готовим каждый день",

        popularEyebrow: "Выбор гостей",
        popularTitle: "Популярные блюда",
        popularDescription: "Блюда, за которыми хочется возвращаться.",

        meraBreakfastDescription: "Яйца, авокадо, халуми, овощи и хлеб на закваске.",
        shakshukaDescription: "Запечённые яйца, томаты, перец, фета и хлеб.",
        salmonDescription: "Яйца пашот, лосось, бриошь и голландский соус.",
        bowlDescription: "Киноа, хумус, овощи, фета и соус тахини.",
        pistachioDescription: "Слоёная выпечка с фисташковым кремом.",
        cheesecakeDescription: "Нежный чизкейк с карамелизированной корочкой.",
        viewInMenu: "Открыть в меню",

        menuEyebrow: "Готовим каждый день",
        menuTitle: "Меню",
        menuDescription: "Выберите категорию и посмотрите блюда кафе.",
        selectedCategory: "Выбранная категория",

        categoryBreakfast: "Завтраки",
        categoryBrunch: "Бранчи",
        categoryBowls: "Боулы и салаты",
        categoryPastries: "Выпечка",
        categoryCoffee: "Кофе",
        categoryDrinks: "Холодные напитки",

        aboutEyebrow: "Наша атмосфера",
        aboutTitle: "Место, где можно замедлиться",
        aboutText: "Mera — вымышленный концепт средиземноморского кафе, созданный, чтобы показать, как Mini App объединяет цифровое меню, информацию о бизнесе и бронирование столиков в одной ссылке.",
        benefitFresh: "Свежие ингредиенты",
        benefitVegetarian: "Вегетарианские блюда",
        benefitPetFriendly: "Можно с питомцами",
        benefitWifi: "Бесплатный Wi-Fi",

        visitEyebrow: "Как нас найти",
        visitText: "Это демонстрационная локация для концепта Mera Café. В реальном проекте здесь размещаются точный адрес, маршрут и активная карта.",
        hoursLabel: "Часы работы",
        openDailyTime: "Ежедневно · 08:00–20:00",
        contactLabel: "Контакт",
        openMap: "Открыть карту",

        faqTitle: "Частые вопросы",
        faqDescription: "Всё, что может пригодиться перед визитом.",

        faqReservationQuestion: "Можно ли забронировать столик?",
        faqReservationAnswer: "Да. Отправьте заявку через Mini App. Кафе свяжется с вами и подтвердит наличие свободного столика.",

        faqVegetarianQuestion: "Есть ли вегетарианские блюда?",
        faqVegetarianAnswer: "Да. Вегетарианские позиции отмечены в меню.",

        faqPetsQuestion: "Можно ли прийти с питомцем?",
        faqPetsAnswer: "На террасе кафе можно находиться с питомцами.",

        faqWifiQuestion: "Есть ли Wi-Fi?",
        faqWifiAnswer: "Да. Для гостей доступен бесплатный Wi-Fi.",

        faqTakeawayQuestion: "Можно ли взять еду с собой?",
        faqTakeawayAnswer: "Часть напитков, выпечки и блюд доступна навынос.",

        finalEyebrow: "Неспешное утро начинается здесь",
        finalTitle: "Забронируйте столик в Mera Café",
        finalText: "Выберите дату, время и место. Мы свяжемся с вами, чтобы подтвердить наличие столика.",

        navHome: "Главная",
        navMenu: "Меню",
        navReserve: "Бронь",
        navVisit: "Адрес",

        reservationEyebrow: "Бронирование столика",
        reservationTitle: "Забронировать столик",
        reservationDescription: "Отправьте заявку, и кафе подтвердит наличие свободного столика.",

        nameLabel: "Имя",
        namePlaceholder: "Ваше имя",
        contactPlaceholder: "Телефон / Telegram / WhatsApp",
        dateLabel: "Дата",
        timeLabel: "Время",
        selectTime: "Выберите время",
        guestsLabel: "Количество гостей",
        selectGuests: "Выберите",
        seatingLabel: "Где разместиться",
        selectSeating: "Выберите",
        seatingInside: "В зале",
        seatingTerrace: "На террасе",
        seatingNoPreference: "Не имеет значения",
        requestLabel: "Особые пожелания",
        requestPlaceholder: "Аллергии, дети, тихий столик или другое пожелание",

        sendReservation: "Отправить заявку",
        formNote: "Это заявка на бронирование, а не автоматическое подтверждение.",

        validationRequired: "Заполните все обязательные поля.",
        validationDate: "Выберите сегодняшнюю или будущую дату.",
        sending: "Отправляем заявку…",
        sendSuccess: "Спасибо! Заявка отправлена. Мы свяжемся с вами, чтобы подтвердить наличие столика.",
        sendError: "Не удалось отправить заявку. Попробуйте ещё раз.",
        networkError: "Ошибка соединения. Проверьте интернет."
    }
};

const categoryData = {
    breakfast: {
        image: "/static/images/category-breakfast.jpg",
        titles: {
            en: "Breakfast",
            ru: "Завтраки"
        },
        items: [{
                name: "Mera Breakfast",
                price: "€14",
                description: {
                    en: "Eggs, grilled halloumi, avocado, tomato, olives, sourdough and seasonal greens.",
                    ru: "Яйца, жареный халуми, авокадо, томаты, оливки, хлеб и сезонная зелень."
                },
                tags: {
                    en: ["signature", "vegetarian"],
                    ru: ["фирменное", "вегетарианское"]
                }
            },
            {
                name: "Avocado Sourdough",
                price: "€11",
                description: {
                    en: "Sourdough toast, avocado, poached egg, feta and herbs.",
                    ru: "Хлеб на закваске, авокадо, яйцо пашот, фета и зелень."
                },
                tags: {
                    en: ["vegetarian"],
                    ru: ["вегетарианское"]
                }
            },
            {
                name: "Greek Yogurt Bowl",
                price: "€9",
                description: {
                    en: "Greek yogurt, seasonal fruit, granola, honey and nuts.",
                    ru: "Греческий йогурт, сезонные фрукты, гранола, мёд и орехи."
                },
                tags: {
                    en: ["light"],
                    ru: ["лёгкое"]
                }
            },
            {
                name: "Halloumi Eggs",
                price: "€12",
                description: {
                    en: "Scrambled eggs, grilled halloumi, tomatoes and warm bread.",
                    ru: "Скрэмбл, жареный халуми, томаты и тёплый хлеб."
                },
                tags: {
                    en: ["vegetarian"],
                    ru: ["вегетарианское"]
                }
            }
        ]
    },

    brunch: {
        image: "/static/images/category-brunch.jpg",
        titles: {
            en: "Brunch",
            ru: "Бранчи"
        },
        items: [{
                name: "Shakshuka",
                price: "€13",
                description: {
                    en: "Baked eggs, tomato, peppers, feta and warm sourdough.",
                    ru: "Запечённые яйца, томаты, перец, фета и тёплый хлеб."
                },
                tags: {
                    en: ["popular", "vegetarian"],
                    ru: ["популярное", "вегетарианское"]
                }
            },
            {
                name: "Halloumi Croissant",
                price: "€10",
                description: {
                    en: "Butter croissant, grilled halloumi, tomato, greens and herb sauce.",
                    ru: "Круассан, жареный халуми, томаты, зелень и травяной соус."
                },
                tags: {
                    en: ["vegetarian"],
                    ru: ["вегетарианское"]
                }
            },
            {
                name: "Salmon Benedict",
                price: "€15",
                description: {
                    en: "Poached eggs, smoked salmon, brioche and hollandaise.",
                    ru: "Яйца пашот, копчёный лосось, бриошь и голландский соус."
                },
                tags: {
                    en: ["guest favourite"],
                    ru: ["выбор гостей"]
                }
            },
            {
                name: "Chicken Brioche",
                price: "€13",
                description: {
                    en: "Grilled chicken, avocado, greens and lemon herb sauce.",
                    ru: "Курица гриль, авокадо, зелень и лимонно-травяной соус."
                },
                tags: {
                    en: ["high protein"],
                    ru: ["много белка"]
                }
            }
        ]
    },

    bowls: {
        image: "/static/images/category-bowls-salads.jpg",
        titles: {
            en: "Bowls & salads",
            ru: "Боулы и салаты"
        },
        items: [{
                name: "Mediterranean Bowl",
                price: "€13",
                description: {
                    en: "Quinoa, hummus, roasted vegetables, feta, herbs and tahini.",
                    ru: "Киноа, хумус, запечённые овощи, фета, зелень и тахини."
                },
                tags: {
                    en: ["vegetarian"],
                    ru: ["вегетарианское"]
                }
            },
            {
                name: "Chicken Herb Bowl",
                price: "€14",
                description: {
                    en: "Grilled chicken, rice, greens, avocado and lemon-herb dressing.",
                    ru: "Курица гриль, рис, зелень, авокадо и лимонно-травяная заправка."
                },
                tags: {
                    en: ["high protein"],
                    ru: ["много белка"]
                }
            },
            {
                name: "Green Halloumi Salad",
                price: "€12",
                description: {
                    en: "Halloumi, cucumber, greens, avocado, seeds and citrus dressing.",
                    ru: "Халуми, огурец, зелень, авокадо, семена и цитрусовая заправка."
                },
                tags: {
                    en: ["vegetarian"],
                    ru: ["вегетарианское"]
                }
            },
            {
                name: "Salmon Grain Bowl",
                price: "€16",
                description: {
                    en: "Salmon, brown rice, vegetables, herbs and yogurt dressing.",
                    ru: "Лосось, бурый рис, овощи, зелень и йогуртовая заправка."
                },
                tags: {
                    en: ["balanced"],
                    ru: ["сбалансированное"]
                }
            }
        ]
    },

    pastries: {
        image: "/static/images/category-pastries.jpg",
        titles: {
            en: "Pastries",
            ru: "Выпечка"
        },
        items: [{
                name: "Almond Croissant",
                price: "€4.50",
                description: {
                    en: "Butter croissant with almond cream and toasted almonds.",
                    ru: "Сливочный круассан с миндальным кремом и лепестками миндаля."
                },
                tags: {
                    en: ["baked daily"],
                    ru: ["выпекаем ежедневно"]
                }
            },
            {
                name: "Pistachio Roll",
                price: "€5",
                description: {
                    en: "Flaky pastry with pistachio cream and roasted pistachios.",
                    ru: "Слоёная выпечка с фисташковым кремом и орехами."
                },
                tags: {
                    en: ["popular"],
                    ru: ["популярное"]
                }
            },
            {
                name: "Basque Cheesecake",
                price: "€6",
                description: {
                    en: "Creamy cheesecake with a caramelised top.",
                    ru: "Нежный чизкейк с карамелизированной корочкой."
                },
                tags: {
                    en: ["guest favourite"],
                    ru: ["выбор гостей"]
                }
            },
            {
                name: "Lemon Olive Cake",
                price: "€5.50",
                description: {
                    en: "Soft lemon cake with olive oil and citrus glaze.",
                    ru: "Мягкий лимонный кекс с оливковым маслом и цитрусовой глазурью."
                },
                tags: {
                    en: ["house made"],
                    ru: ["готовим сами"]
                }
            }
        ]
    },

    coffee: {
        image: "/static/images/category-coffee.jpg",
        titles: {
            en: "Coffee",
            ru: "Кофе"
        },
        items: [{
                name: "Espresso",
                price: "€2.50",
                description: {
                    en: "Double-shot specialty espresso.",
                    ru: "Двойной эспрессо из спешелти-зерна."
                },
                tags: {
                    en: ["specialty"],
                    ru: ["спешелти"]
                }
            },
            {
                name: "Cappuccino",
                price: "€4",
                description: {
                    en: "Espresso with silky steamed milk.",
                    ru: "Эспрессо с нежным взбитым молоком."
                },
                tags: {
                    en: ["classic"],
                    ru: ["классика"]
                }
            },
            {
                name: "Flat White",
                price: "€4.50",
                description: {
                    en: "Double espresso with fine-textured milk.",
                    ru: "Двойной эспрессо с молоком тонкой текстуры."
                },
                tags: {
                    en: ["strong"],
                    ru: ["насыщенный"]
                }
            },
            {
                name: "Iced Latte",
                price: "€5",
                description: {
                    en: "Espresso, milk and ice.",
                    ru: "Эспрессо, молоко и лёд."
                },
                tags: {
                    en: ["cold"],
                    ru: ["холодный"]
                }
            }
        ]
    },

    drinks: {
        image: "/static/images/category-cold-drinks.jpg",
        titles: {
            en: "Cold drinks",
            ru: "Холодные напитки"
        },
        items: [{
                name: "Homemade Lemonade",
                price: "€5",
                description: {
                    en: "Lemon, mint, soda and light syrup.",
                    ru: "Лимон, мята, содовая и лёгкий сироп."
                },
                tags: {
                    en: ["refreshing"],
                    ru: ["освежающий"]
                }
            },
            {
                name: "Matcha Strawberry",
                price: "€6",
                description: {
                    en: "Matcha, milk, strawberry purée and ice.",
                    ru: "Матча, молоко, клубничное пюре и лёд."
                },
                tags: {
                    en: ["popular"],
                    ru: ["популярное"]
                }
            },
            {
                name: "Fresh Orange Juice",
                price: "€5",
                description: {
                    en: "Freshly squeezed orange juice.",
                    ru: "Свежевыжатый апельсиновый сок."
                },
                tags: {
                    en: ["fresh"],
                    ru: ["свежий"]
                }
            },
            {
                name: "Cucumber Mint Cooler",
                price: "€5.50",
                description: {
                    en: "Cucumber, mint, lime and sparkling water.",
                    ru: "Огурец, мята, лайм и газированная вода."
                },
                tags: {
                    en: ["zero alcohol"],
                    ru: ["без алкоголя"]
                }
            }
        ]
    }
};

let currentLanguage = localStorage.getItem("meraLanguage") || "en";
let activeCategory = "breakfast";
let toastTimer = null;

const languageButton = document.getElementById("languageButton");
const categoryImage = document.getElementById("categoryImage");
const categoryTitle = document.getElementById("categoryTitle");
const menuList = document.getElementById("menuList");

const reservationModal =
    document.getElementById("reservationModal");

const reservationForm =
    document.getElementById("reservationForm");

const reservationDate =
    document.getElementById("reservationDate");

const submitReservation =
    document.getElementById("submitReservation");

const formMessage =
    document.getElementById("formMessage");

const toast =
    document.getElementById("toast");

function getTranslation(key) {
    return translations[currentLanguage] ? . [key] ? ? key;
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem("meraLanguage", language);

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translation = getTranslation(key);

        if (translation) {
            element.textContent = translation;
        }
    });

    document
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            const translation = getTranslation(key);

            if (translation) {
                element.placeholder = translation;
            }
        });

    languageButton.textContent =
        language === "en" ? "RU" : "EN";

    renderMenu(activeCategory);
}

function renderMenu(categoryKey) {
    const category = categoryData[categoryKey];

    if (!category) {
        return;
    }

    activeCategory = categoryKey;

    categoryImage.src = category.image;
    categoryImage.alt = category.titles[currentLanguage];
    categoryTitle.textContent =
        category.titles[currentLanguage];

    menuList.innerHTML = category.items
        .map((item) => {
            const tags = item.tags[currentLanguage]
                .map(
                    (tag) =>
                    `<span class="menu-tag">${escapeHtml(tag)}</span>`
                )
                .join("");

            return `
                <article class="menu-item">
                    <div class="menu-item-top">
                        <h3>${escapeHtml(item.name)}</h3>
                        <span class="menu-item-price">
                            ${escapeHtml(item.price)}
                        </span>
                    </div>

                    <p>
                        ${escapeHtml(
                            item.description[currentLanguage]
                        )}
                    </p>

                    <div class="menu-item-tags">
                        ${tags}
                    </div>
                </article>
            `;
        })
        .join("");

    document.querySelectorAll(".category-tab").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.category === categoryKey
        );
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function openReservationModal() {
    reservationModal.classList.add("open");
    reservationModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    formMessage.className = "form-message";
    formMessage.textContent = "";

    window.setTimeout(() => {
        document.getElementById("guestName") ? .focus();
    }, 250);
}

function closeReservationModal() {
    reservationModal.classList.remove("open");
    reservationModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function setMinimumReservationDate() {
    const today = new Date();
    const localDate = new Date(
        today.getTime() -
        today.getTimezoneOffset() * 60 _000
    );

    reservationDate.min =
        localDate.toISOString().split("T")[0];
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className =
        `form-message visible ${type}`;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("show");
    }, 4200);
}

function getTelegramUser() {
    const user =
        telegramWebApp ? .initDataUnsafe ? .user ? ? null;

    if (!user) {
        return null;
    }

    return {
        id: user.id ? ? null,
        username: user.username ? ? "",
        firstName: user.first_name ? ? "",
        lastName: user.last_name ? ? ""
    };
}

function detectSource() {
    if (telegramWebApp ? .initData) {
        return "Telegram Mini App";
    }

    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");

    if (source) {
        return source;
    }

    if (document.referrer) {
        try {
            return new URL(document.referrer).hostname;
        } catch {
            return document.referrer;
        }
    }

    return "Direct web link";
}

async function submitReservationRequest(event) {
    event.preventDefault();

    if (!reservationForm.checkValidity()) {
        reservationForm.reportValidity();

        showFormMessage(
            getTranslation("validationRequired"),
            "error"
        );

        return;
    }

    const selectedDate = reservationDate.value;

    if (
        selectedDate &&
        reservationDate.min &&
        selectedDate < reservationDate.min
    ) {
        showFormMessage(
            getTranslation("validationDate"),
            "error"
        );

        return;
    }

    const payload = {
        name: document.getElementById("guestName").value.trim(),
        contact: document.getElementById("guestContact").value.trim(),
        date: selectedDate,
        time: document.getElementById("reservationTime").value,
        guests: document.getElementById("guestCount").value,
        seating: document.getElementById("seatingPreference").value,
        request: document.getElementById("specialRequest").value.trim(),
        language: currentLanguage,
        source: detectSource(),
        telegramUser: getTelegramUser(),
        telegramInitData: telegramWebApp ? .initData ? ? ""
    };

    submitReservation.disabled = true;
    submitReservation.textContent =
        getTranslation("sending");

    showFormMessage(
        getTranslation("sending"),
        "success"
    );

    try {
        const response = await fetch("/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.ok) {
            throw new Error(
                result.error ||
                getTranslation("sendError")
            );
        }

        reservationForm.reset();

        showFormMessage(
            getTranslation("sendSuccess"),
            "success"
        );

        showToast(getTranslation("sendSuccess"));

        if (telegramWebApp ? .HapticFeedback) {
            telegramWebApp.HapticFeedback.notificationOccurred(
                "success"
            );
        }

        window.setTimeout(() => {
            closeReservationModal();
        }, 2200);
    } catch (error) {
        console.error("Reservation error:", error);

        const errorMessage =
            error instanceof TypeError ?
            getTranslation("networkError") :
            error.message || getTranslation("sendError");

        showFormMessage(errorMessage, "error");

        if (telegramWebApp ? .HapticFeedback) {
            telegramWebApp.HapticFeedback.notificationOccurred(
                "error"
            );
        }
    } finally {
        submitReservation.disabled = false;
        submitReservation.textContent =
            getTranslation("sendReservation");
    }
}

function updateActiveNavigation() {
    const sectionIds = ["home", "menu", "visit", "faq"];

    let activeId = "home";
    let smallestDistance = Number.POSITIVE_INFINITY;

    sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) {
            return;
        }

        const distance = Math.abs(
            section.getBoundingClientRect().top - 110
        );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            activeId = sectionId;
        }
    });

    document
        .querySelectorAll(".bottom-nav-item[data-scroll-to]")
        .forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.scrollTo === activeId
            );
        });
}

languageButton.addEventListener("click", () => {
    setLanguage(
        currentLanguage === "en" ? "ru" : "en"
    );
});

document
    .querySelectorAll("[data-scroll-to]")
    .forEach((element) => {
        element.addEventListener("click", () => {
            const categoryKey =
                element.dataset.menuCategory;

            if (categoryKey) {
                renderMenu(categoryKey);
            }

            scrollToSection(element.dataset.scrollTo);
        });
    });

document
    .querySelectorAll(".category-tab")
    .forEach((button) => {
        button.addEventListener("click", () => {
            renderMenu(button.dataset.category);
        });
    });

document
    .querySelectorAll("[data-open-reservation]")
    .forEach((button) => {
        button.addEventListener(
            "click",
            openReservationModal
        );
    });

document
    .querySelectorAll("[data-close-reservation]")
    .forEach((element) => {
        element.addEventListener(
            "click",
            closeReservationModal
        );
    });

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        reservationModal.classList.contains("open")
    ) {
        closeReservationModal();
    }
});

reservationForm.addEventListener(
    "submit",
    submitReservationRequest
);

window.addEventListener(
    "scroll",
    updateActiveNavigation, {
        passive: true
    }
);

setMinimumReservationDate();
setLanguage(currentLanguage);
renderMenu(activeCategory);
updateActiveNavigation();