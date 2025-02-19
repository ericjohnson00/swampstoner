// Select elements
const audio = document.getElementById("audio");
const playlistItems = document.querySelectorAll(".playlist li");

// Add event listeners to playlist items
playlistItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove active class from all items
    playlistItems.forEach((el) => el.classList.remove("active"));

    // Add active class to the clicked item
    this.classList.add("active");

    // Update audio source
    const trackSrc = this.getAttribute("data-src");
    audio.src = trackSrc;

    // Play the selected track
    audio.play();
  });
});
