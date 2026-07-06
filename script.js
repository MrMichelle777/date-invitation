const OWNER_EMAIL = "m1shelsmirnov@mail.ru";

const cards = document.querySelectorAll(".date-card");
const chosenPlace = document.querySelector("#chosenPlace");
const choiceLabel = document.querySelector("#choiceLabel");
const form = document.querySelector("#dateForm");
const formNote = document.querySelector("#formNote");
const mailMessage = document.querySelector("#mailMessage");
const submittedAt = document.querySelector("#submittedAt");
const nextUrl = document.querySelector("#nextUrl");

function getThanksUrl() {
  const currentPath = window.location.pathname.replace(/\/[^/]*$/, "/");
  return `${window.location.origin}${currentPath}thanks.html`;
}

function setPlace(place) {
  cards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.place === place);
  });

  chosenPlace.value = place;
  choiceLabel.textContent = place;
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    setPlace(card.dataset.place);
  });
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.next)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

form.addEventListener("submit", (event) => {
  if (OWNER_EMAIL === "your-email@example.com") {
    event.preventDefault();
    formNote.textContent =
      "Сначала впиши свою почту в OWNER_EMAIL внутри script.js, затем кнопка начнет отправлять письмо.";
    formNote.classList.add("is-warning");
    return;
  }

  form.action = `https://formsubmit.co/${encodeURIComponent(OWNER_EMAIL)}`;
  nextUrl.value = getThanksUrl();
  submittedAt.value = new Date().toLocaleString("ru-RU", {
    dateStyle: "long",
    timeStyle: "short",
  });
  mailMessage.value = `Екатерина подтвердила поход на свидание. Выбранный вариант: ${chosenPlace.value}.`;
});
