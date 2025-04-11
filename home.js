//style.display is .js way of controlling whether or not an HTML element is visible on page by directly changing the css display property of that element 
//variables for slideshow 
let slideIndex = 0; //keeps track of slide to show
showSlides();//calls the function on page load

// loop function for slide movement , hides the slides and show the one at slideIndex (which ever image number)
function showSlides() {
  let slides = document.getElementsByClassName("mySlides"); /* variable set to the images in html */
  for (let slide of slides) {   // this is a "for of" loop that goes through each new variable named "slide"(image) in the "slides"(imagefolder basically) collection and hides it 
    slide.style.display = "none"; //tells browser to hide that slide
  }
  slideIndex++; /*next image*/

  if (slideIndex > slides.length) { 
    slideIndex = 1; //slide.length = total images(slides) and the > means if user goes past the last slide then...slide Index = 1 reset to beginning
  } 
  slides[slideIndex - 1].style.display = "block"; //show(make visible) only the current slide
  setTimeout(showSlides, 15000); // Change image every 3 seconds for autoplay
}
//function to change slide plusSlides(1) = next (-1) = back
function plusSlides(n) {
  slideIndex += n ; //to move forward or backward  +/- 1  through slides
  showSlides();	//calls function again to show the correct slide after updating the index.
}  


//simulate falling leaves in page background
const container = document.getElementById('leaf-container');

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');


//randomize horizontal start
  leaf.style.left = Math.random() * 100 + 'vw';

//randomize animation time
  const duration = 5 + Math.random() * 5;
  leaf.style.animationDuration = duration + 's';
  leaf.style.animationDelay = Math.random() * 3 + 's';
  container.appendChild(leaf);

// Remove leaf after it falls
  setTimeout(() => {
    container.removeChild(leaf);
  }, duration * 1000);
}

  //Create leaves every 1s
  setInterval(createLeaf, 1000);