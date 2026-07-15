"use strict";

const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

if (tg) {
  tg.ready();
  tg.expand();

  try {
    tg.setHeaderColor("#f6efe5");
    tg.setBackgroundColor("#f6efe5");
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
    messageUs: "Message us",
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
    sendSuccess: "Thank you! Your reservation request has been sent.",
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
    messageUs: "Написать нам",
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
    sendSuccess: "Спасибо! Заявка отправлена.",
    sendError: "Не удалось отправить заявку. Попробуйте ещё раз.",
    networkError: "Ошибка соединения. Проверьте интернет."
  }
};

const categories = {
  breakfast: {
    image: "/static/images/category-breakfast.jpg",
    title: {
      en: "Breakfast",
      ru: "Завтраки"
    },
    items: [{
        name: "Mera Breakfast",
        price: "€14",
        desc: {
          en: "Eggs, grilled halloumi, avocado, tomato, olives and sourdough.",
          ru: "Яйца, жареный халуми, авокадо, томаты, оливки и хлеб."
        },
        tags: {
          en: ["signature", "vegetarian"],
          ru: ["фирменное", "вегетарианское"]
        }
      },
      {
        name: "Avocado Sourdough",
        price: "€11",
        desc: {
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
        desc: {
          en: "Greek yogurt, fruit, granola, honey and nuts.",
          ru: "Греческий йогурт, фрукты, гранола, мёд и орехи."
        },
        tags: {
          en: ["light"],
          ru: ["лёгкое"]
        }
      },
      {
        name: "Halloumi Eggs",
        price: "€12",
        desc: {
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
    title: {
      en: "Brunch",
      ru: "Бранчи"
    },
    items: [{
        name: "Shakshuka",
        price: "€13",
        desc: {
          en: "Baked eggs, tomatoes, peppers, feta and sourdough.",
          ru: "Запечённые яйца, томаты, перец, фета и хлеб."
        },
        tags: {
          en: ["popular", "vegetarian"],
          ru: ["популярное", "вегетарианское"]
        }
      },
      {
        name: "Halloumi Croissant",
        price: "€10",
        desc: {
          en: "Butter croissant, grilled halloumi, tomato and herbs.",
          ru: "Круассан, жареный халуми, томаты и зелень."
        },
        tags: {
          en: ["vegetarian"],
          ru: ["вегетарианское"]
        }
      },
      {
        name: "Salmon Benedict",
        price: "€15",
        desc: {
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
        desc: {
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
    title: {
      en: "Bowls & salads",
      ru: "Боулы и салаты"
    },
    items: [{
        name: "Mediterranean Bowl",
        price: "€13",
        desc: {
          en: "Quinoa, hummus, roasted vegetables, feta and tahini.",
          ru: "Киноа, хумус, запечённые овощи, фета и тахини."
        },
        tags: {
          en: ["vegetarian"],
          ru: ["вегетарианское"]
        }
      },
      {
        name: "Chicken Herb Bowl",
        price: "€14",
        desc: {
          en: "Grilled chicken, rice, greens, avocado and herbs.",
          ru: "Курица гриль, рис, зелень, авокадо и травы."
        },
        tags: {
          en: ["high protein"],
          ru: ["много белка"]
        }
      },
      {
        name: "Green Halloumi Salad",
        price: "€12",
        desc: {
          en: "Halloumi, cucumber, greens, avocado and citrus dressing.",
          ru: "Халуми, огурец, зелень, авокадо и цитрусовая заправка."
        },
        tags: {
          en: ["vegetarian"],
          ru: ["вегетарианское"]
        }
      },
      {
        name: "Salmon Grain Bowl",
        price: "€16",
        desc: {
          en: "Salmon, brown rice, vegetables and yogurt dressing.",
          ru: "Лосось, бурый рис, овощи и йогуртовая заправка."
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
    title: {
      en: "Pastries",
      ru: "Выпечка"
    },
    items: [{
        name: "Almond Croissant",
        price: "€4.50",
        desc: {
          en: "Butter croissant with almond cream.",
          ru: "Сливочный круассан с миндальным кремом."
        },
        tags: {
          en: ["baked daily"],
          ru: ["выпекаем ежедневно"]
        }
      },
      {
        name: "Pistachio Roll",
        price: "€5",
        desc: {
          en: "Flaky pastry with pistachio cream.",
          ru: "Слоёная выпечка с фисташковым кремом."
        },
        tags: {
          en: ["popular"],
          ru: ["популярное"]
        }
      },
      {
        name: "Basque Cheesecake",
        price: "€6",
        desc: {
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
        desc: {
          en: "Soft lemon cake with olive oil and citrus glaze.",
          ru: "Лимонный кекс с оливковым маслом и глазурью."
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
    title: {
      en: "Coffee",
      ru: "Кофе"
    },
    items: [{
        name: "Espresso",
        price: "€2.50",
        desc: {
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
        desc: {
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
        desc: {
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
        desc: {
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
    title: {
      en: "Cold drinks",
      ru: "Холодные напитки"
    },
    items: [{
        name: "Homemade Lemonade",
        price: "€5",
        desc: {
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
        desc: {
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
        desc: {
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
        desc: {
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
const modal = document.getElementById("reservationModal");
const form = document.getElementById("reservationForm");
const reservationDate = document.getElementById("reservationDate");
const submitButton = document.getElementById("submitReservation");
const formMessage = document.getElementById("formMessage");
const toast = document.getElementById("toast");

function t(key) {
  return translations[currentLanguage][key] || key;
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("meraLanguage", language);
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
    const key = element.getAttribute("data-i18n-placeholder");
    element.placeholder = t(key);
  });

  languageButton.textContent = language === "en" ? "RU" : "EN";
  renderMenu(activeCategory);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMenu(categoryKey) {
  const category = categories[categoryKey];
  if (!category) return;

  activeCategory = categoryKey;
  categoryImage.src = category.image;
  categoryImage.alt = category.title[currentLanguage];
  categoryTitle.textContent = category.title[currentLanguage];

  menuList.innerHTML = category.items.map(function (item) {
    const tags = item.tags[currentLanguage]
      .map(function (tag) {
        return '<span class="menu-tag">' + escapeHtml(tag) + "</span>";
      })
      .join("");

    return (
      '<article class="menu-item">' +
      '<div class="menu-item-head">' +
      "<h3>" + escapeHtml(item.name) + "</h3>" +
      '<span class="menu-price">' + escapeHtml(item.price) + "</span>" +
      "</div>" +
      "<p>" + escapeHtml(item.desc[currentLanguage]) + "</p>" +
      '<div class="menu-tags">' + tags + "</div>" +
      "</article>"
    );
  }).join("");

  document.querySelectorAll(".category-tab").forEach(function (button) {
    button.classList.toggle("active", button.getAttribute("data-category") === categoryKey);
  });
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  formMessage.className = "form-message";
  formMessage.textContent = "";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setMinDate() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  reservationDate.min = local.toISOString().split("T")[0];
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = "form-message visible " + type;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3800);
}

function sourceName() {
  if (tg && tg.initData) return "Telegram Mini App";

  const params = new URLSearchParams(window.location.search);
  if (params.get("utm_source")) return params.get("utm_source");

  return document.referrer || "Direct web link";
}

function telegramUser() {
  if (!tg || !tg.initDataUnsafe || !tg.initDataUnsafe.user) return null;

  const user = tg.initDataUnsafe.user;
  return {
    id: user.id || null,
    username: user.username || "",
    firstName: user.first_name || "",
    lastName: user.last_name || ""
  };
}

async function submitReservation(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    showFormMessage(t("validationRequired"), "error");
    return;
  }

  if (reservationDate.value < reservationDate.min) {
    showFormMessage(t("validationDate"), "error");
    return;
  }

  const payload = {
    name: document.getElementById("guestName").value.trim(),
    contact: document.getElementById("guestContact").value.trim(),
    date: reservationDate.value,
    time: document.getElementById("reservationTime").value,
    guests: document.getElementById("guestCount").value,
    seating: document.getElementById("seatingPreference").value,
    request: document.getElementById("specialRequest").value.trim(),
    language: currentLanguage,
    source: sourceName(),
    telegramUser: telegramUser(),
    telegramInitData: tg && tg.initData ? tg.initData : ""
  };

  submitButton.disabled = true;
  submitButton.textContent = t("sending");
  showFormMessage(t("sending"), "success");

  try {
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || t("sendError"));
    }

    form.reset();
    showFormMessage(t("sendSuccess"), "success");
    showToast(t("sendSuccess"));

    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred("success");
    }

    setTimeout(closeModal, 1700);
  } catch (error) {
    console.error(error);
    showFormMessage(error.message || t("networkError"), "error");

    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred("error");
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = t("sendReservation");
  }
}

function updateActiveNav() {
  const ids = ["home", "menu", "visit", "faq"];
  let active = "home";
  let best = Infinity;

  ids.forEach(function (id) {
    const section = document.getElementById(id);
    if (!section) return;

    const distance = Math.abs(section.getBoundingClientRect().top - 110);
    if (distance < best) {
      best = distance;
      active = id;
    }
  });

  document.querySelectorAll(".nav-item[data-scroll]").forEach(function (button) {
    button.classList.toggle("active", button.getAttribute("data-scroll") === active);
  });
}

languageButton.addEventListener("click", function () {
  setLanguage(currentLanguage === "en" ? "ru" : "en");
});

document.querySelectorAll("[data-scroll]").forEach(function (button) {
  button.addEventListener("click", function () {
    scrollToSection(button.getAttribute("data-scroll"));
  });
});

document.querySelectorAll("[data-reserve]").forEach(function (button) {
  button.addEventListener("click", openModal);
});

document.querySelectorAll("[data-close-modal]").forEach(function (element) {
  element.addEventListener("click", closeModal);
});

document.querySelectorAll(".category-tab").forEach(function (button) {
  button.addEventListener("click", function () {
    renderMenu(button.getAttribute("data-category"));
  });
});

document.querySelectorAll("[data-category-link]").forEach(function (button) {
  button.addEventListener("click", function () {
    renderMenu(button.getAttribute("data-category-link"));
    scrollToSection("menu");
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});
form.addEventListener("submit", submitReservation);

setMinDate();
setLanguage(currentLanguage);
renderMenu(activeCategory);
updateActiveNav();