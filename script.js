
"use strict";

/* =====================================
   AAMHI SATPUTE — FRIENDSHIP WEBSITE
   Edit names, photos and memories here.
===================================== */

// CHANGE THESE DETAILS TO YOUR REAL FRIENDS
const friends = [
  {
    name: "Aditya Mahadik",
    nickname: "The Mastermind",
    image: "/aditya.jpeg",
    role: "The unofficial leader",
    message: "Every crazy adventure starts with your ideas. Life would be a lot more boring without you!"
  },
  {
    name: "Raveena Kumbhar",
    nickname: "Drama Queen",
    image: "/reveena.jpeg",
    role: "CEO of overreacting",
    message: "Nobody turns a small incident into an unforgettable story quite like you. Never change!"
  },
  {
    name: "Aishwarya Mangale",
    nickname: "The Foodie",
    image: "/aishwarya.jpeg",
    role: "Always hungry",
    message: "From midnight cravings to random food plans, you make every outing an adventure."
  },
  {
    name: "Jyoti Pandiya",
    nickname: "Silent Killer",
    image: "/Jyoti.jpeg",
    role: "Quiet but dangerous",
    message: "You don't always talk the most, but when you do, everyone remembers it."
  },
  {
    name: "Harshad Sawant",
    nickname: "The Comedian",
    image: "/Harshad.jpeg",
    role: "Professional mood changer",
    message: "You somehow make even the worst days funny. Thank you for every ridiculous laugh."
  },
  {
    name: "Rekha Chaudhari",
    nickname: "The Legend",
    image: "/rekha.jpeg",
    role: "One of a kind",
    message: "Some friendships happen by chance. Ours became something I'll always treasure."
  },
  {
    name: "Swati Gadave",
    nickname: "icecream lover",
    image: "/swati.jpeg",
    role: "loves icecream",
    message: "Life is sweeter with ice cream, but I think you're even sweeter!"
  },
];

// ADD YOUR REAL GROUP MEMORIES HERE
const memories = [
  {
    date: "THE BEGINNING",
    title: "The Day It All Started",
    image: "/begnning.jpeg",
    description: "We didn't know back then that one ordinary meeting would lead to so many unforgettable memories."
  },
  {
    date: "THE CRAZY DAYS",
    title: "Our First Adventure",
    image: "/delhi.jpeg",
    description: "The plan was simple. The execution was chaos. And somehow it became one of our favourite memories."
  },
  {
    date: "THE LITTLE MOMENTS",
    title: "Random Plans, Best Memories",
    image: "/Kopeshwar.jpeg",
    description: "The best days were often the ones we never planned. Just us, endless conversations and laughter."
  },
  {
    date: "FOREVER TO GO",
    title: "Still Writing Our Story",
    image: "/WhatsApp Image 2026-10-21 at 11.05.55 AM.jpeg",
    description: "This isn't the last page of our scrapbook. There are so many more memories waiting for us."
  }
];

const questions = [
  "Who's most likely to be late to every plan?",
  "Who will become a millionaire first?",
  "Who can sleep anywhere, anytime?",
  "Who is most likely to forget their own birthday?",
  "Who spends the most money on food?",
  "Who will get married first?",
  "Who laughs at the worst possible moment?",
  "Who will become famous one day?",
  "Who is always making excuses?",
  "Who gives the best advice but never follows it?",
  "Who would survive a zombie apocalypse?",
  "Who takes the longest to get ready?",
  "Who is secretly the most emotional?",
  "Who will plan a trip and cancel at the last moment?"
];

const rouletteMemories = [
  "Tell everyone your funniest memory together!",
  "Call out the friend who always makes you laugh.",
  "Recreate your favourite group photo!",
  "Tell the story of your most chaotic outing.",
  "Give a genuine compliment to the friend beside you.",
  "Share a secret funny nickname!",
  "Tell everyone your most embarrassing group memory.",
  "Plan your next adventure together!",
  "Remember a moment when a friend helped you.",
  "Everyone must take a new group selfie!"
];

// SHARE YOUR THOUGHTS - LOCAL DEMO

const thoughtName = document.getElementById("thoughtName");
const thoughtMessage = document.getElementById("thoughtMessage");
const submitThought = document.getElementById("submitThought");
const thoughtStatus = document.getElementById("thoughtStatus");
const thoughtsList = document.getElementById("thoughtsList");

const storageKey = "aamhi-sathpute-thoughts";

function loadThoughts() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

let thoughts = loadThoughts();

function renderThoughts() {
  thoughtsList.replaceChildren();

  thoughts.forEach(thought => {
    const entry = document.createElement("article");
    entry.className = "thought-entry";

    const name = document.createElement("strong");
    name.textContent = thought.name;

    const message = document.createElement("p");
    message.textContent = thought.message;

    entry.append(name, message);
    thoughtsList.appendChild(entry);
  });
}

submitThought.addEventListener("click", () => {
  const name = thoughtName.value.trim() || "Anonymous";
  const message = thoughtMessage.value.trim();

  if (!message) {
    thoughtStatus.textContent = "Please write your thoughts first.";
    return;
  }

  thoughts.unshift({ name, message });
  thoughts = thoughts.slice(0, 50);

  try {
    localStorage.setItem(storageKey, JSON.stringify(thoughts));
    thoughtStatus.textContent = "Your thought has been saved on this device!";
  } catch {
    thoughtStatus.textContent = "Your thought is shown here but couldn't be saved.";
  }

  thoughtName.value = "";
  thoughtMessage.value = "";
  renderThoughts();
});

renderThoughts();


/* =====================================
   HELPERS
===================================== */

function getFallback(text) {
  return "https://placehold.co/500x600/e8d1bd/604739?text="
    + encodeURIComponent(text);
}

function setImageFallback(img, text) {
  img.addEventListener("error", function () {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "true";
    img.src = getFallback(text);
  });
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/* =====================================
   FRIEND PHOTO GALLERY
===================================== */

const gallery = document.getElementById("friendsGallery");

friends.forEach((friend, index) => {
  const item = createElement("div", "friend-item reveal");

  const photo = createElement("div", "friend-photo");
  photo.setAttribute("role", "button");
  photo.setAttribute("tabindex", "0");
  photo.setAttribute("aria-label", "Read about " + friend.name);

  const tape = createElement("div", "photo-tape");

  const img = document.createElement("img");
  img.src = friend.image;
  img.alt = friend.name;
  img.loading = "lazy";
  setImageFallback(img, friend.name);

  const caption = createElement("span", "photo-caption", friend.name);
  const tag = createElement("span", "friend-tag", friend.nickname);

  photo.append(tape, img, caption);
  item.append(photo, tag);
  gallery.appendChild(item);

  photo.addEventListener("click", () => openFriend(index));

  photo.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFriend(index);
    }
  });

  enable3DTilt(photo, 13);
});

/* =====================================
   REAL CURSOR-BASED 3D TILT
===================================== */

function enable3DTilt(element, strength = 12) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const isFriend = element.classList.contains("friend-photo");

  element.addEventListener("pointermove", event => {
    const rect = element.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * strength * 2;
    const rotateX = (0.5 - y) * strength * 2;

    const baseRotation = isFriend
      ? getComputedStyle(element).getPropertyValue("--rotation").trim()
      : getComputedStyle(element).getPropertyValue("--base-rotate").trim();

    element.style.transform =
      `perspective(1000px) rotateZ(${baseRotation || "0deg"}) ` +
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ` +
      `translateZ(28px) scale(1.055)`;

    element.style.boxShadow =
      `${-rotateY * 1.2}px ${24 + rotateX}px 45px rgba(58,39,24,.25)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
    element.style.boxShadow = "";
  });
}

// Apply 3D movement to hero photographs too
document.querySelectorAll(".tilt-card").forEach(photo => {
  enable3DTilt(photo, 10);
});

/* =====================================
   FRIEND POPUP
===================================== */

const friendModal = document.getElementById("friendModal");
const letterModal = document.getElementById("letterModal");

let lastFocusedElement = null;

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".close-modal").focus();
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });

  document.body.classList.remove("modal-open");

  if (lastFocusedElement && lastFocusedElement.focus) {
    lastFocusedElement.focus();
  }
}

function openFriend(index) {
  const friend = friends[index];

  document.getElementById("modalFriendName").textContent = friend.name;
  document.getElementById("modalFriendRole").textContent = friend.role;
  document.getElementById("modalFriendMessage").textContent = friend.message;

  const image = document.getElementById("modalFriendImage");
  image.removeAttribute("data-fallback-applied");
  image.src = friend.image;
  image.alt = friend.name;
  image.onerror = function () {
    this.onerror = null;
    this.src = getFallback(friend.name);
  };

  openModal(friendModal);
}

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", closeModals);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModals();

  // Keep keyboard focus inside an open popup
  if (event.key !== "Tab") return;

  const activeModal = document.querySelector(".modal.active");
  if (!activeModal) return;

  const focusable = [...activeModal.querySelectorAll(
    "button, a[href], input, [tabindex]:not([tabindex='-1'])"
  )].filter(el => !el.disabled);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* =====================================
   MEMORY TIMELINE
===================================== */

const timeline = document.getElementById("memoryTimeline");

memories.forEach(memory => {
  const item = createElement("article", "memory-item reveal");

  const img = document.createElement("img");
  img.src = memory.image;
  img.alt = memory.title;
  img.loading = "lazy";
  setImageFallback(img, memory.title);

  const date = createElement("span", "memory-date", memory.date);
  const title = createElement("h3", "", memory.title);
  const description = createElement("p", "", memory.description);

  item.append(img, date, title, description);
  timeline.appendChild(item);
});

/* =====================================
   WHO'S MOST LIKELY TO GAME
===================================== */

const questionDisplay = document.getElementById("questionDisplay");
const nextQuestion = document.getElementById("nextQuestion");

let lastQuestionIndex = -1;

nextQuestion.addEventListener("click", () => {
  let index;

  do {
    index = Math.floor(Math.random() * questions.length);
  } while (index === lastQuestionIndex && questions.length > 1);

  lastQuestionIndex = index;

  questionDisplay.style.opacity = "0";
  questionDisplay.style.transform = "translateY(12px)";

  setTimeout(() => {
    questionDisplay.textContent = questions[index];
    questionDisplay.style.transition = "all .3s";
    questionDisplay.style.opacity = "1";
    questionDisplay.style.transform = "translateY(0)";
  }, 180);
});

/* =====================================
   MEMORY ROULETTE
===================================== */

const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("rouletteWheel");
const rouletteResult = document.getElementById("rouletteResult");

let wheelRotation = 0;
let spinning = false;

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  spinBtn.disabled = true;

  rouletteResult.textContent = "The universe is choosing...";

  wheelRotation += 1440 + Math.random() * 720;
  wheel.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    const result = rouletteMemories[
      Math.floor(Math.random() * rouletteMemories.length)
    ];

    rouletteResult.textContent = result;
    spinning = false;
    spinBtn.disabled = false;
  }, 1750);
});

/* =====================================
   SECRET LETTER
===================================== */

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {
  openModal(letterModal);
  launchConfetti(65);
});

envelope.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openModal(letterModal);
    launchConfetti(65);
  }
});

/* =====================================
   CONFETTI SURPRISE
===================================== */

const confettiLayer = document.getElementById("confetti");
const confettiColors = [
  "#b95c66", "#e8a9a1", "#f3d991",
  "#8d9e7a", "#fff1d8", "#c59a6d"
];

function launchConfetti(amount = 100) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  for (let i = 0; i < amount; i++) {
    const piece = createElement("span", "confetti-piece");

    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];

    piece.style.setProperty(
      "--drift",
      (Math.random() * 300 - 150) + "px"
    );

    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";

    confettiLayer.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
  }
}

document.getElementById("surpriseBtn").addEventListener("click", () => {
  launchConfetti(160);

  const button = document.getElementById("surpriseBtn");
  button.textContent = "Forever Aamhi Satpute! ❤️";

  setTimeout(() => {
    button.textContent = "One More Surprise ✨";
  }, 4500);
});

/* =====================================
   BACKGROUND MUSIC
===================================== */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.35;

musicBtn.addEventListener("click", async () => {
  if (!music.paused) {
    music.pause();
    return;
  }

  try {
    await music.play();
  } catch (error) {
    alert(
      "Music could not play. Check that music/friendship.mp3 exists."
    );
  }
});

music.addEventListener("play", () => {
  musicBtn.classList.add("playing");
  musicBtn.textContent = "♫";
  musicBtn.setAttribute("aria-label", "Pause music");
});

music.addEventListener("pause", () => {
  musicBtn.classList.remove("playing");
  musicBtn.textContent = "♫";
  musicBtn.setAttribute("aria-label", "Play music");
});

/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.textContent = isOpen ? "×" : "☰";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

console.log("Aamhi Satpute ❤️ Website loaded successfully!");
