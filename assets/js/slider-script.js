const cardsWrapper = document.querySelector('.cards-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlide = 0;
const visibleCards = 3; // Number of cards visible at once
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Update the state of the navigation buttons (Always enabled for infinite loop)
function updateNavButtons() {
  prevBtn.disabled = false;
  nextBtn.disabled = false;
}

// Move the slider left or right
function moveSlider() {
  const cardWidth = document.querySelector('.card').offsetWidth + parseFloat(getComputedStyle(document.querySelector('.card')).marginRight); // Card width + margin
  cardsWrapper.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
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
  if (currentSlide > totalSlides - visibleCards) {
    currentSlide = 0; // Loop back to the first card
  }
  moveSlider();
});

// --- Drag functionality ---

// Set the position based on the event type (mouse or touch)
function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Set up drag start
function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  cardsWrapper.classList.add('grabbing');
}

// Handle drag move
function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

// End dragging
function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const cardWidth = document.querySelector('.card').offsetWidth + parseFloat(getComputedStyle(document.querySelector('.card')).marginRight);
  const movedBy = currentTranslate - prevTranslate;

  // If moved enough, slide to the next or previous card
  if (movedBy < -cardWidth / 3) {
    currentSlide++;
  } else if (movedBy > cardWidth / 3) {
    currentSlide--;
  }

  // Looping functionality
  if (currentSlide < 0) {
    currentSlide = totalSlides - visibleCards; // Loop back to the last set of slides
  }
  if (currentSlide > totalSlides - visibleCards) {
    currentSlide = 0; // Loop back to the first card
  }

  moveSlider();
  prevTranslate = currentTranslate;
  cardsWrapper.classList.remove('grabbing');
}

// Animate slider during drag
function animation() {
  cardsWrapper.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

// Event listeners for drag functionality
cardsWrapper.addEventListener('mousedown', touchStart);
cardsWrapper.addEventListener('mousemove', touchMove);
cardsWrapper.addEventListener('mouseup', touchEnd);
cardsWrapper.addEventListener('mouseleave', touchEnd);

cardsWrapper.addEventListener('touchstart', touchStart);
cardsWrapper.addEventListener('touchmove', touchMove);
cardsWrapper.addEventListener('touchend', touchEnd);

// Initialize slider position and button states
const totalSlides = document.querySelectorAll('.card').length; // Dynamic calculation of totalSlides
moveSlider();
updateNavButtons();
