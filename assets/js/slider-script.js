const cardsWrapper = document.querySelector('.cards-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
let visibleCards = calculateVisibleCards(); // Dynamically calculate visible cards

// Function to calculate the number of visible cards based on screen width
function calculateVisibleCards() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    return 1; // Show 1 card on small screens (mobile)
  } else if (screenWidth < 1024) {
    return 2; // Show 2 cards on medium screens (tablets)
  } else {
    return 3; // Show 3 cards on large screens (desktops)
  }
}

// Update the state of the navigation buttons (Always enabled for infinite loop)
function updateNavButtons() {
  prevBtn.disabled = false;
  nextBtn.disabled = false;
}

// Move the slider left or right
function moveSlider() {
  const cardWidth = document.querySelector('.card').offsetWidth + parseFloat(getComputedStyle(document.querySelector('.card')).marginRight); // Card width + margin
  cardsWrapper.style.transform = `translateX(-${currentSlide * cardWidth}px)`; // Correct transform syntax
  updateNavButtons();
}

// Previous button functionality
prevBtn.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = totalSlides - visibleCards; // Loop back to the last set of slides
  }
  moveSlider();
});

// Next button functionality
nextBtn.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= totalSlides - visibleCards) {
    currentSlide = 0; // Loop back to the first card
  }
  moveSlider();
});

// Recalculate visible cards and move slider when window resizes
window.addEventListener('resize', () => {
  visibleCards = calculateVisibleCards(); // Recalculate visible cards on resize
  moveSlider(); // Adjust slider position
});

// Initialize slider position and button states
const totalSlides = document.querySelectorAll('.card').length; // Dynamic calculation of totalSlides
moveSlider();
updateNavButtons();
