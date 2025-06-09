// Cache for loaded pages
const pageCache = new Map();
let currentPage = "";
let particlesInitialized = false;

// Waits for all resources to load before executing
window.onload = () => {
	// Load the home page FIRST, then initialize particles
	LoadPage("home.html", "homeBtn").then(() => {
		// Wait a bit for the page to render, then initialize particles
		setTimeout(() => {
			InitializeParticles();
		}, 200);
	});
};

// Debounce variable
let resizeTimer;
let resized = false;
window.addEventListener("resize", () => {
	if (resized === false) {
		console.log("Resized");
		const activeButton = document.querySelector(".button.active");
		if (activeButton) {
			UpdatePillPosition(activeButton);
		}
		if (particlesInitialized) {
			AdjustParticlesContainer();
		}
		resized = true;
	}
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		console.log("Resized");
		const activeButton = document.querySelector(".button.active");
		if (activeButton) {
			UpdatePillPosition(activeButton);
		}
		if (particlesInitialized) {
			AdjustParticlesContainer();
		}
		resized = false;
	}, 400);
});

// Function to load page content dynamically
async function LoadPage(pageName, btnName) {
	try {
		let content;

		// Check if page is already cached
		if (pageCache.has(pageName)) {
			content = pageCache.get(pageName);
		} else {
			// Fetch the page content
			const response = await fetch(pageName);
			if (!response.ok) {
				throw new Error(`Failed to load ${pageName}`);
			}
			content = await response.text();
			// Cache the content
			pageCache.set(pageName, content);
		}

		// Update the page content
		const pageContainer = document.getElementById("page-content");
		pageContainer.innerHTML = content;

		// Update active button and pill
		const activeButton = document.querySelector(".button.active");
		const clickedButton = document.getElementById(btnName);
		if (activeButton) activeButton.classList.remove("active");
		clickedButton.classList.add("active");

		UpdatePillPosition(clickedButton);
		InitializePageComponents();

		// Only adjust particles if they're already initialized AND this isn't the first load
		if (particlesInitialized && currentPage !== "") {
			setTimeout(() => {
				AdjustParticlesContainer();
			}, 50);
		}

		currentPage = pageName;

		 // Update URL hash without triggering hashchange event
		const section = btnName.replace('Btn', '');
		history.replaceState(null, null, `#${section}`);

		// Return a promise so we can chain .then() in window.onload
		return Promise.resolve();
	} catch (error) {
		console.error("Error loading page:", error);
		document.getElementById("page-content").innerHTML =
			"<p>Error loading page content.</p>";
		return Promise.reject(error);
	}
}

// Add hash-based routing
function InitializeRouting() {
    // Handle initial page load
    HandleRoute();
    
    // Listen for hash changes
    window.addEventListener('hashchange', HandleRoute);
}

function HandleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    
    switch(hash) {
        case 'home':
            LoadPage('home.html', 'homeBtn');
            break;
        case 'designs':
            LoadPage('designs.html', 'designsBtn');
            break;
        case 'coding':
            LoadPage('coding.html', 'codingBtn');
            break;
        case 'formula':
            LoadPage('formula.html', 'formulaBtn');
            break;
        default:
            LoadPage('home.html', 'homeBtn');
    }
}

// Initialize routing when DOM is loaded
document.addEventListener('DOMContentLoaded', InitializeRouting);

// Initialize components after page load
function InitializePageComponents() {
	// Initialize Sliders
	const sliders = document.querySelectorAll(".slider-container");
	sliders.forEach((sliderContainer) => {
		new Slider(sliderContainer);
	});

	// Initialize More buttons
	InitializeMoreButtons();
}

// Function to initialize particles.js
function InitializeParticles() {
	console.log("Initializing particles...");

	particlesJS.load("particles-js", "particlesjs-config.json", function () {
		console.log("particles.js config loaded");

		// Set particlesInitialized to true only AFTER particles are fully loaded
		particlesInitialized = true;

		// Adjust particles container after initialization
		AdjustParticlesContainer();
	});
}

// Function to adjust particles height and trigger a refresh
function AdjustParticlesContainer() {
	console.log("AdjustParticlesContainer called");

	if (!particlesInitialized) {
		console.warn("Particles not initialized yet, skipping adjustment");
		return;
	}

	if (window.pJSDom && window.pJSDom.length > 0) {
		const pJSInstance = window.pJSDom[0].pJS;

		if (pJSInstance) {
			console.log("Triggering particles.js resize event");

			// Trigger the built-in resize handler
			if (pJSInstance.fn.vendors.resize) {
				pJSInstance.fn.vendors.resize();
			}

			// Force a refresh - remove the checkOverlap call
			pJSInstance.fn.particlesDraw();
			// pJSInstance.fn.vendors.checkOverlap(); // Remove this line

			console.log(
				`Particles refreshed. Canvas dimensions: ${pJSInstance.canvas.w}x${pJSInstance.canvas.h}`
			);
		} else {
			console.error("Particles instance not found");
		}
	} else {
		console.error("pJSDom not available");
	}
}

function UpdatePillPosition(activeButton) {
	const buttonContainer = activeButton.parentNode;
	const buttons = Array.from(buttonContainer.querySelectorAll(".button"));
	const currentIndex = buttons.findIndex((button) => button === activeButton);
	const pill = document.querySelector(".button-selector");
	let buttonGap = parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			"--buttonContainerGap"
		)
	);

	if (window.matchMedia("(max-width: 768px)").matches) {
		buttonGap = buttonGap * 0.8;
	} else if (window.matchMedia("(max-width: 480px)").matches) {
		buttonGap = buttonGap * 0.7;
	}

	if (currentIndex !== -1 && pill) {
		const translateX =
			currentIndex * (activeButton.offsetWidth + buttonGap);
		pill.style.width = `${activeButton.offsetWidth}px`;
		pill.style.transform = `translateX(${translateX}px)`;
	}
}

function InitializeMoreButtons() {
	const projectContents = document.querySelectorAll(".project-content");

	projectContents.forEach((content) => {
		const moreButton = content.querySelector(".more-button");
		const paragraphBlock = content.querySelector("p");
		const isTruncated = CheckOverflow(paragraphBlock);

		if (CheckHeight(content) && !isTruncated) {
			moreButton.style.display = "block";
			if (
				!paragraphBlock.classList.contains("truncate-text") &&
				!paragraphBlock.classList.contains("show-more")
			) {
				paragraphBlock.classList.add("truncate-text");
			}
		} else if (!CheckHeight(content) && !isTruncated) {
			moreButton.style.display = "none";
			paragraphBlock.classList.remove("truncate-text");
		}
	});
}

function ToggleMore(button) {
	const projectContent = button.parentElement.previousElementSibling;

	if (projectContent) {
		if (projectContent.classList.contains("truncate-text")) {
			button.textContent = "Less";
			projectContent.classList.remove("truncate-text");
			projectContent.classList.add("show-more");
		} else {
			button.textContent = "More";
			projectContent.classList.remove("show-more");
			projectContent.classList.add("truncate-text");
		}
	} else {
		console.error("projectContent is null. Check your HTML structure.");
	}
}

function CheckHeight(element) {
	const rootStyle = getComputedStyle(document.documentElement);
	const lineHeight =
		parseFloat(rootStyle.getPropertyValue("--lineHeight")) || 1.5;
	const maxLines =
		parseFloat(rootStyle.getPropertyValue("--linesShown")) || 2;
	const maxHeight =
		lineHeight *
		maxLines *
		parseFloat(getComputedStyle(document.body).fontSize);
	const paragraph = element.querySelector("p");

	if (paragraph.offsetHeight > maxHeight) {
		return true;
	} else {
		return false;
	}
}

function CheckOverflow(element) {
	return (
		element.scrollHeight > element.clientHeight ||
		element.scrollWidth > element.clientWidth
	);
}

function ImgZoom(img) {
	// Check if the image is already zoomed
	if (img.classList.contains("img-zoom")) {
		img.classList.remove("img-zoom");
		document.body.style.overflow = "";

		const placeholder = document.getElementById("img-placeholder");
		if (placeholder) {
			img.style.position = "";
			img.style.zIndex = "";
			img.style.animation = "";
			placeholder.parentNode.insertBefore(img, placeholder);
			placeholder.parentNode.removeChild(placeholder);
		}

		const overlay = document.getElementById("zoom-overlay");
		if (overlay) {
			document.body.removeChild(overlay);
		}
	} else {
		const currentZoomed = document.querySelector(".img-zoom");
		if (currentZoomed) {
			currentZoomed.classList.remove("img-zoom");
			const oldPlaceholder = document.getElementById("img-placeholder");
			if (oldPlaceholder) {
				currentZoomed.style.position = "";
				currentZoomed.style.zIndex = "";
				currentZoomed.style.animation = "";
				oldPlaceholder.parentNode.insertBefore(
					currentZoomed,
					oldPlaceholder
				);
				oldPlaceholder.parentNode.removeChild(oldPlaceholder);
			}

			const existingOverlay = document.getElementById("zoom-overlay");
			if (existingOverlay) {
				document.body.removeChild(existingOverlay);
			}
		}

		const placeholder = document.createElement("div");
		placeholder.id = "img-placeholder";
		placeholder.style.width = img.offsetWidth + "px";
		placeholder.style.height = img.offsetHeight + "px";
		placeholder.style.display = "inline-block";
		placeholder.style.backgroundColor = "white";
		placeholder.style.borderRadius = "0.5rem";
		placeholder.style.boxShadow = "inset 0 0 10px rgba(0, 0, 0, 0.2)";

		img.parentNode.insertBefore(placeholder, img);

		const overlay = document.createElement("div");
		overlay.id = "zoom-overlay";
		overlay.style.position = "fixed";
		overlay.style.top = "0";
		overlay.style.left = "0";
		overlay.style.width = "100%";
		overlay.style.height = "100%";
		overlay.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
		overlay.style.zIndex = "999";

		overlay.addEventListener("click", () => {
			ImgZoom(img);
		});

		document.body.appendChild(overlay);

		img.classList.add("img-zoom");
		img.style.position = "fixed";
		img.style.zIndex = "1000";
		document.body.style.overflow = "hidden";

		document.body.appendChild(img);
		void img.offsetWidth;
	}
}

// IMAGE SLIDER
class Slider {
	constructor(sliderContainer) {
		this.sliderContainer = sliderContainer;
		this.slides = sliderContainer.querySelectorAll(".slides");
		this.navButtons = sliderContainer.querySelectorAll(".sliderDot");
		this.prevButton = sliderContainer.querySelector(".prev");
		this.nextButton = sliderContainer.querySelector(".next");
		this.slideIndex = 0;
		this.prevShown = 0;
		this.length = this.slides.length;

		this.CreateNavigationDots();
		this.InitializeSlider();

		this.prevButton.addEventListener("click", () => this.PrevSlide());
		this.nextButton.addEventListener("click", () => this.NextSlide());
		this.navButtons.forEach((button, index) => {
			button.addEventListener("click", () => this.ChangeSlide(index));
		});
	}

	InitializeSlider() {
		if (this.length > 0) {
			this.slides[this.slideIndex].classList.add("displaySlide");
			this.navButtons[this.slideIndex].classList.add("current");
		}
	}

	CreateNavigationDots() {
		this.navContainer = document.createElement("div");
		this.navContainer.classList.add("slider-nav");

		for (let i = 0; i < this.length; i++) {
			const dot = document.createElement("button");
			dot.classList.add("sliderDot");
			dot.dataset.slideIndex = i;
			this.navContainer.appendChild(dot);
		}

		this.sliderContainer.appendChild(this.navContainer);
		this.navButtons = this.navContainer.querySelectorAll(".sliderDot");
	}

	ShowSlide(index, direction) {
		this.sliderContainer.style.pointerEvents = "none";

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

		if (direction === "left") {
			newSlide.classList.add("move-right-in", "displaySlide", "z-offset");
			prevSlide.classList.add("move-right-out");
		} else if (direction === "right") {
			newSlide.classList.add("move-left-in", "displaySlide", "z-offset");
			prevSlide.classList.add("move-left-out");
		}

		this.navButtons.forEach((sliderDot) => {
			sliderDot.classList.remove("current");
		});
		this.navButtons[this.slideIndex].classList.add("current");

		setTimeout(() => {
			this.sliderContainer.style.pointerEvents = "auto";
			prevSlide.classList.remove("displaySlide");
			this.slides.forEach((slide) => {
				slide.classList.remove(
					"move-left-in",
					"move-right-in",
					"move-left-out",
					"move-right-out"
				);
			});
		}, 510);

		setTimeout(() => {
			this.slides.forEach((slide) => {
				slide.classList.remove("z-offset");
			});
		}, 510);
	}

	PrevSlide() {
		this.ShowSlide(this.slideIndex - 1, "left");
	}

	NextSlide() {
		this.ShowSlide(this.slideIndex + 1, "right");
	}

	ChangeSlide(index) {
		let direction = "left";
		if (index === this.slideIndex) {
			return;
		} else if (index > this.slideIndex) {
			direction = "right";
		}
		this.ShowSlide(index, direction);
	}
}
