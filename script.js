const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const menuSound = document.getElementById("menuSound"); // Get the audio element

// Lower the audio volume
menuSound.volume = 0.5; // Set volume to 20% of the original sound level

// Toggle nav menu when hamburger is clicked
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Reset the sound to the beginning and play it
  menuSound.currentTime = 0;
  menuSound.play();
});

// Close nav menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Close nav menu when scrolling
window.addEventListener("scroll", () => {
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
});

// QUOTE GENERATOR

document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  // Function to fetch and display a quote
  function fetchAndDisplayQuote() {
    fetch("https://quotes-api-self.vercel.app/quote")
      .then((response) => response.json())
      .then((data) => {
        quoteElement.textContent = data.quote;
        authorElement.textContent = "- " + data.author;
      })
      .catch((error) => {
        console.error(error);
        quoteElement.textContent = "Failed to fetch a quote.";
        authorElement.textContent = "";
      });
  }

  // Fetch a quote when the page loads
  fetchAndDisplayQuote();
});
