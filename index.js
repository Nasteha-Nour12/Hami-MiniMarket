// ==== IMAGE SLIDER (HERO BACKGROUND) ====
const hero = document.querySelector(".hero");

const images = [
  "https://www.dreamstime.com/lettuce-orange-slices-being-washed-water-creating-refreshing-splash-bright-kitchen-enhances-vibrant-colors-image376120827",
  "https://img.freepik.com/free-photo/fresh-vegetables-table_144627-18449.jpg",
  
  "https://img.freepik.com/free-photo/assorted-fresh-vegetables-wooden-table_114579-7620.jpg"
];

let current = 0;

function changeBackground() {
  hero.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

setInterval(changeBackground, 5000);
changeBackground();

// ==== CONTACT FORM VALIDATION ====
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting!");
    return;
  }

  alert(`Thank you ${name}! Your message has been sent successfully.`);
  form.reset();
});
