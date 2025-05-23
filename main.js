const eventDate = new Date("2025-06-21T00:00:00");

// Update the countdown every second
function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

setInterval(updateCountdown, 1000);
updateCountdown();

const targetText = "HudaMUN";
const display = document.getElementById("name-display");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const totalDuration = 500; // total spin time (ms)
const letterDelay = 40; // delay between each letter stopping
const flickerMinInterval = 200; // slower flicker min delay in ms
const flickerMaxInterval = 800; // slower flicker max delay in ms
const flickerMinIntensity = 0.8; // 80% brightness (less dim)
const flickerMaxIntensity = 1; // 100% brightness (full neon)

function flickerNeon(letterSpan) {
  function flick() {
    const delayBetweenFlicks = 1000 + Math.random() * 2000; // 1s to 3s between flicks

    setTimeout(() => {
      // flicker steps: dim then restore quickly
      letterSpan.style.transition = "text-shadow 50ms ease";
      letterSpan.style.textShadow = `0 0 5px rgba(250,204,21,0.8), 0 0 10px rgba(250,204,21,0.8)`;

      setTimeout(() => {
        letterSpan.style.textShadow = `
          0 0 5px  rgba(250,204,21,0.45),
          0 0 10px rgba(250,204,21,0.45),
          0 0 20px rgba(250,204,21,0.45),
          0 0 30px rgba(250,204,21,0.45),
          0 0 40px rgba(250,204,21,0.45),
          0 0 55px rgba(250,204,21,0.45),
          0 0 75px rgba(250,204,21,0.45)
        `;
      }, 50);

      flick(); // schedule next flick after delay
    }, delayBetweenFlicks);
  }
  flick();
}

for (let i = 0; i < targetText.length; i++) {
  const span = document.createElement("span");
  span.classList.add("letter");
  display.appendChild(span);

  let count = 0;
  const maxCount = Math.floor(totalDuration / 40);
  const interval = setInterval(() => {
    span.textContent =
      characters[Math.floor(Math.random() * characters.length)];
    count++;
    if (count > maxCount + i * 2) {
      // slight delay between letters
      clearInterval(interval);
      span.textContent = targetText[i];
      span.style.filter = "none";
      span.style.textShadow = `
        0 0 5px rgba(250,204,21,0.45),
        0 0 10px rgba(250,204,21,0.45),
        0 0 20px rgba(250,204,21,0.45),
        0 0 30px rgba(250,204,21,0.45),
        0 0 40px rgba(250,204,21,0.45),
        0 0 55px rgba(250,204,21,0.45),
        0 0 75px rgba(250,204,21,0.45)
        `;
      span.style.transition = "text-shadow 0.5s ease";
      span.classList.add("revealed");
      flickerNeon(span); // #

      if (i === targetText.length - 1) {
        // Create wrapper for last letter
        const wrapper = document.createElement("span");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";

        // Remove the last letter span from display
        display.removeChild(span);

        // Append the letter span into wrapper
        wrapper.appendChild(span);

        // Append wrapper immediately (without cursor yet)
        display.appendChild(wrapper);

        // Create cursor span (but don't append yet)
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        cursor.textContent = "|";
        cursor.style.position = "absolute";
        cursor.style.right = "-0.7ch";
        cursor.style.bottom = "0";

        // Append the cursor after 1.5 seconds delay
        setTimeout(() => {
          wrapper.appendChild(cursor);
        }, 1500);
      }
    }
  }, 40);
}

const subtitleText = "21-22-23 June";
const subtitleDisplay = document.getElementById("subtitle-display");
const subtitleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789- ";
const scrambleSpeed = 30; // ms per scramble update
const maxScrambles = 10; // number of random changes per letter

for (let i = 0; i < subtitleText.length; i++) {
  const span = document.createElement("span");
  subtitleDisplay.appendChild(span);

  let count = 0;
  const interval = setInterval(() => {
    span.textContent =
      subtitleCharacters[Math.floor(Math.random() * subtitleCharacters.length)];
    count++;
    if (count > maxScrambles + i * 2) {
      // sequential delay per letter
      clearInterval(interval);
      span.textContent = subtitleText[i];
    }
  }, scrambleSpeed);
}
