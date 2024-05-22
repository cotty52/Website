// Whenever the site is loaded, this function is called
SiteLoad = () => {
  // When site is loaded, press that button. Could also call ShowPage
  document.getElementById("designsBtn").click();
};

const ShowPage = (pageName, btnName) => {
  //Future proofing in case more pages and buttons are added
  var pageContent, i;
  pageContent = document.getElementsByClassName("page");
  for (i = 0; i < pageContent.length; i++) {
    pageContent[i].style.display = "none";
  }

  // Get id of previously active button, then remove the active class
  const activeButton = document.querySelector(".button.active");
  activeButton.classList.remove("active");

  // Get id of clicked button and add 'active' class
  const clickedButton = document.getElementById(btnName);
  clickedButton.classList.add("active");

  // Get id of the new page and show it
  const newPage = document.getElementById(pageName);
  newPage.style.display = "flex";

  // Construct the new URL
  const newUrl = window.location.origin + "/#" + pageName;

  // Update the URL without triggering a page reload
  window.history.pushState({ path: newUrl }, "", newUrl);
};

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.getElementById("navbar").style.padding = "30px 10px";
//     document.getElementById("logo").style.fontSize = "25px";
//   } else {
//     document.getElementById("navbar").style.padding = "80px 10px";
//     document.getElementById("logo").style.fontSize = "35px";
//   }
// }

// IMAGE SLIDER

const numSlides = document.querySelector(".slider-container").querySelectorAll(".slides");
const length = numSlides.length;
console.log(numSlides.length); // Check the number of slides
let slideIndex = 0;
let prevShown = 0;

InitializeSlider();

function InitializeSlider() {
  if (length > 0) {
    numSlides[slideIndex].classList.add("displaySlide");
  }
  console.log("slideIndex: " + slideIndex); // Check the current slide
}

function ShowSlide(index, prevShown, direction) {
  // console.log("index: " + index); 
  // console.log("prevShown: " + prevShown);
  // console.log("direction: " + direction);
  // console.log("slideIndex: " + slideIndex);
  if (index >= length) {
    slideIndex = 0;
    prevShown = length - 1;
  } else if (index < 0) {
    slideIndex = length - 1;
    prevShown = 0;
  }

  const prevSlide = numSlides[prevShown];
  const newSlide = numSlides[slideIndex];
  // console.log("prevSlide: " + prevSlide);
  // console.log("newSlide: " + newSlide);
  
  console.log("Before adding classes, newSlide", newSlide.classList);
  console.log("Before adding classes, prevSlide", prevSlide.classList);


  // slider-container.forEach(slides => {
  //   slides.classList.remove("displaySlide");
  // });
  
  if (direction === "left") {
    newSlide.classList.add("move-left-in", "displaySlide", "z-offset");
    prevSlide.classList.add("move-left-out");
  } else if (direction === "right") {
    newSlide.classList.add("move-right-in", "displaySlide", "z-offset");
    prevSlide.classList.add("move-right-out");
  }

  console.log("After adding classes, newSlide", newSlide.classList);
  console.log("After adding classes, prevSlide", prevSlide.classList);
  setTimeout(() => {
    prevSlide.classList.remove("displaySlide");
    numSlides.forEach(slides => {
      slides.classList.remove("move-left-in", "move-right-in", "move-left-out", "move-right-out");
    });
  }, 500);
  setTimeout(() => {
    numSlides.forEach(slides => {
      slides.classList.remove("z-offset");
    });
  }, 510); 


  // console.log("Previous slide: " + prevShown);
  // console.log("New slide: " + slideIndex);

  console.log("removing classes, newSlide", newSlide.classList);
  console.log("removing classes, prevSlide", prevSlide.classList);
}

function PrevSlide() {
  prevShown = slideIndex;
  slideIndex--;
  ShowSlide(slideIndex, prevShown, "left");
}

function NextSlide() {
  prevShown = slideIndex;
  slideIndex++;
  ShowSlide(slideIndex, prevShown, "right");
}