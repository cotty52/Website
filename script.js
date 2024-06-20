// Whenever the site is loaded, this function is called
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");
  sliders.forEach((sliderContainer) => {
    new Slider(sliderContainer);
  });
  // When site is loaded, press that button. Could also call ShowPage
  document.getElementById("designsBtn").click();
});
// SiteLoad = () => {
//   // When site is loaded, press that button. Could also call ShowPage
//   // document.getElementById("designsBtn").click();
// };

const ShowPage = (pageName, btnName) => {
  const clickedButton = document.getElementById(btnName);
  const buttons = Array.from(clickedButton.parentNode.querySelectorAll(".button"));
  const currentIndex = buttons.findIndex((button) => button.id === btnName);

  //Future proofing in case more pages and buttons are added
  var pageContent, i;
  pageContent = document.getElementsByClassName("page");
  for (i = 0; i < pageContent.length; i++) {
    pageContent[i].style.display = "none";
  }

  // Get id of previously active button, then remove the active class
  const activeButton = document.querySelector(".button.active");
  activeButton.classList.remove("active");
  clickedButton.classList.add("active");

  const rootStyles = getComputedStyle(document.documentElement);
  const buttonWidth = parseFloat(rootStyles.getPropertyValue("--buttonWidth"));
  const buttonGap = parseFloat(rootStyles.getPropertyValue("--buttonContainerGap"));

  if (currentIndex !== -1) {
    const translateX = currentIndex * (buttonWidth + buttonGap);
    const pill = document.querySelector(".button-selector");
    pill.style.transform = `translateX(${translateX}px)`;
  }

  // Get id of the new page and show it
  const newPage = document.getElementById(pageName);
  newPage.style.display = "flex";

  // Construct the new URL
  //const newUrl = window.location.origin + "/#" + pageName;

  // Update the URL without triggering a page reload
  //window.history.pushState({ path: newUrl }, "", newUrl);
};

// IMAGE SLIDER
class Slider {
  constructor(sliderContainer) {
    this.sliderContainer = sliderContainer;
    this.slides = sliderContainer.querySelectorAll('.slides');
    this.navButtons = sliderContainer.querySelectorAll('.sliderDot');
    this.prevButton = sliderContainer.querySelector('.prev');
    this.nextButton = sliderContainer.querySelector('.next');
    this.slideIndex = 0;
    this.prevShown = 0;
    this.length = this.slides.length;

    this.CreateNavigationDots();
    this.InitializeSlider();

    // Bind events
    this.prevButton.addEventListener('click', () => this.PrevSlide());
    this.nextButton.addEventListener('click', () => this.NextSlide());
    this.navButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.ChangeSlide(index));
    });
  }

  InitializeSlider() {
    if (this.length > 0) {
      this.slides[this.slideIndex].classList.add('displaySlide');
      this.navButtons[this.slideIndex].classList.add('current');
    }
    console.log('slideIndex: ' + this.slideIndex); // Check the current slide
  }

  CreateNavigationDots() {
    this.navContainer = document.createElement("div");
    this.navContainer.classList.add("slider-nav");

    for (let i = 0; i < this.length; i++) {
      const dot = document.createElement("button");
      dot.classList.add("sliderDot");
      dot.dataset.slideIndex = i;  // Store slide index in a data attribute

      this.navContainer.appendChild(dot);
    }

    this.sliderContainer.appendChild(this.navContainer);
    this.navButtons = this.navContainer.querySelectorAll('.sliderDot'); // Update reference to created buttons
  }

  ShowSlide(index, direction) {
    this.sliderContainer.style.pointerEvents = 'none';

    if (index >= this.length) {
      this.slideIndex = 0;
      this.prevShown = this.length - 1;
    } else if (index < 0) {
      this.slideIndex = this.length - 1;
      this.prevShown = 0;
    } else {
      this.prevShown = this.slideIndex;
      this.slideIndex = index;
    }

    const prevSlide = this.slides[this.prevShown];
    const newSlide = this.slides[this.slideIndex];

    if (direction === 'left') {
      newSlide.classList.add('move-right-in', 'displaySlide', 'z-offset');
      prevSlide.classList.add('move-right-out');
    } else if (direction === 'right') {
      newSlide.classList.add('move-left-in', 'displaySlide', 'z-offset');
      prevSlide.classList.add('move-left-out');
    }

    this.navButtons.forEach(sliderDot => {
      sliderDot.classList.remove('current');
    });

    setTimeout(() => {
      this.sliderContainer.style.pointerEvents = 'auto';
      prevSlide.classList.remove('displaySlide');
      this.navButtons[this.slideIndex].classList.add('current');
      this.slides.forEach(slide => {
        slide.classList.remove('move-left-in', 'move-right-in', 'move-left-out', 'move-right-out');
      });
    }, 510);
    setTimeout(() => {
      this.slides.forEach(slide => {
        slide.classList.remove('z-offset');
      });
    }, 510);
  }

  PrevSlide() {
    this.ShowSlide(this.slideIndex - 1, 'left');
  }

  NextSlide() {
    this.ShowSlide(this.slideIndex + 1, 'right');
  }

  ChangeSlide(index) {
    let direction = 'left';
    if (index === this.slideIndex) {
      return;
    } else if (index > this.slideIndex) {
      direction = 'right';
    }
    this.ShowSlide(index, direction);
  }
}