// =============================================
// SLIDESHOW — fixed timer stacking bug
// =============================================

let slideIndex = 0;
let slideTimer = null; // store timer so we can clear it before resetting

showSlides();

function showSlides() {
  // Clear any existing timer FIRST — this is the fix for the speed bug
  // Every time this function ran before, it stacked a new timer on top
  // of the old one. clearTimeout kills the old one before making a new one.
  clearTimeout(slideTimer);

  const slides = document.getElementsByClassName("mySlides");

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  // Store the timeout reference — now only ONE timer ever exists at a time
  slideTimer = setTimeout(showSlides, 5000);
}

function plusSlides(n) {
  slideIndex += n;

  // Boundary check manually since we're bypassing the auto-increment
  const slides = document.getElementsByClassName("mySlides");

  if (slideIndex > slides.length) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slides.length;

  // Clear auto timer and reset from this new position
  clearTimeout(slideTimer);

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";

  // Restart the auto-timer from this slide
  slideTimer = setTimeout(showSlides, 5000);
}


// =============================================
// FALLING LEAVES — fade in on spawn, fade out on fall
// =============================================

const container = document.getElementById('leaf-container');

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');

  // Random horizontal start position
  leaf.style.left = Math.random() * 100 + 'vw';

  // Random fall duration between 6–12s — slower feels more natural
  const duration = 6 + Math.random() * 6;
  leaf.style.animationDuration = duration + 's';

  // Random delay so they don't all spawn in sync
  leaf.style.animationDelay = Math.random() * 4 + 's';

  // Random size — smaller leaves look way better (80–140px)
  const size = 80 + Math.random() * 60;
  leaf.style.width = size + 'px';
  leaf.style.height = size + 'px';

  container.appendChild(leaf);

  // Remove leaf after animation finishes — duration + delay + small buffer
  setTimeout(() => {
    if (container.contains(leaf)) {
      container.removeChild(leaf);
    }
  }, (duration + 4) * 1000);
}

// Spawn a leaf every 1.5s — was 1s before, slightly less dense feels cleaner
setInterval(createLeaf, 1500);