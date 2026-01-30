// Cache for loaded pages
const pageCache = new Map();
let currentPage = "";
let particlesInitialized = false;

// Waits for all resources to load before executing
window.onload = () => {
	// Load the home page FIRST, then initialize particles
	LoadPage("home.html", "HomeBtn").then(() => {
		// Wait a bit for the page to render, then initialize particles
		setTimeout(() => {
			InitializeParticles();
		}, 200);
	});
};

// Initialize routing when DOM is loaded
document.addEventListener('DOMContentLoaded', InitializeRouting);

// Debounce variable
let resizeTimer;
let resized = false;
window.addEventListener("resize", () => {
	if (resized === false) {
		// console.log("Resized");
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
		// console.log("Resized");
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
		const pageContainer = document.getElementById("page-container");
		pageContainer.innerHTML = content;

		// If loading contact.html, insert the profile card
		if (pageName === 'contact.html' && typeof insertProfileCard === 'function') {
			insertProfileCard();
		}
		// If navigating away from contact.html, remove the card if present
		if (pageName !== 'contact.html') {
			const cardContainer = document.getElementById('profile-card-container');
			if (cardContainer) cardContainer.innerHTML = '';
		}
		// Update active button and pill
		const activeButton = document.querySelector(".button.active, .dropdown-item.active");
		const clickedButton = document.getElementById(btnName);
		const moreButton = document.getElementById('moreBtn');
		
		// Remove active class from all buttons and dropdown items
		if (activeButton) {
			activeButton.classList.remove("active");
		}
		document.querySelectorAll('.button.active, .dropdown-item.active').forEach(btn => {
			btn.classList.remove('active');
		});
				// Add active class to clicked button
		clickedButton.classList.add("active");
		
		// If clicking a dropdown item, also add active class to More button and close dropdown
		if (clickedButton.classList.contains('dropdown-item')) {
			moreButton.classList.add("active");
			const dropdownMenu = document.querySelector('.dropdown-menu');
			if (dropdownMenu) {
				dropdownMenu.classList.remove('show');
			}
			// Position pill over More button since dropdown is now closed
			UpdatePillPosition(moreButton);
		} else {
			// For main navigation buttons, position pill normally
			UpdatePillPosition(clickedButton);
		}
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
		document.getElementById("page-container").innerHTML =
			"<p>Error loading page content.</p>";
		return Promise.reject(error);
	}
}

// DOMContent loaded event to initialize routing
// Add hash-based routing
function InitializeRouting() {
    // Handle initial page load
    HandleRoute();
    
    // Listen for hash changes
    window.addEventListener('hashchange', HandleRoute);
}

function HandleRoute() {
    const hash = window.location.hash.slice(1) || 'Home';
    
    switch(hash) {
        case 'Home':
            LoadPage('home.html', 'HomeBtn');
            break;
        case 'Projects':
            LoadPage('projects.html', 'ProjectsBtn');
            break;
        case 'Contact':
            LoadPage('contact.html', 'ContactBtn');
            break;
        case 'Formula':
            LoadPage('formula.html', 'FormulaBtn');
            break;
        case 'Senior-Project':
            LoadPage('senior-project.html', 'Senior-ProjectBtn');
            break;
        // Legacy redirects for old URLs
        case 'Designs':
        case 'Coding':
            LoadPage('projects.html', 'ProjectsBtn');
            break;
        default:
            LoadPage('home.html', 'HomeBtn');
    }
}

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
	// console.log("Initializing particles...");

	particlesJS.load("particles-js", "particlesjs-config.json", function () {
		// console.log("particles.js config loaded");

		// Set particlesInitialized to true only AFTER particles are fully loaded
		particlesInitialized = true;

		// Adjust particles container after initialization
		AdjustParticlesContainer();
	});
}

// Function to adjust particles height and trigger a refresh
function AdjustParticlesContainer() {
	// console.log("AdjustParticlesContainer called");

	if (!particlesInitialized) {
		// console.warn("Particles not initialized yet, skipping adjustment");
		return;
	}

	if (window.pJSDom && window.pJSDom.length > 0) {
		const pJSInstance = window.pJSDom[0].pJS;

		if (pJSInstance) {
			// console.log("Triggering particles.js resize event");

			// Trigger the built-in resize handler
			if (pJSInstance.fn.vendors.resize) {
				pJSInstance.fn.vendors.resize();
			}

			// Force a refresh - remove the checkOverlap call
			pJSInstance.fn.particlesDraw();
			// pJSInstance.fn.vendors.checkOverlap(); // Remove this line

			// console.log(`Particles refreshed. Canvas dimensions: ${pJSInstance.canvas.w}x${pJSInstance.canvas.h}`);
		} else {
			// console.error("Particles instance not found");
		}
	} else {
		// console.error("pJSDom not available");
	}
}

function UpdatePillPosition(activeButton) {
	const isDropdownItem = activeButton.classList.contains('dropdown-item');
	const isMoreButton = activeButton.id === 'moreBtn';
	
	if (isDropdownItem) {
		updateDropdownPill(activeButton);
	} else if (isMoreButton) {
		updateMoreButtonPill();
	} else {
		updateMainNavPill(activeButton);
	}
}

function updateMainNavPill(activeButton) {
	const mainPill = document.querySelector('.main-nav .button-selector');
	const dropdownPill = document.querySelector('.dropdown .button-selector');
	const dropdownMenuPill = document.querySelector('.dropdown-menu .button-selector');
	const moreButton = document.getElementById('moreBtn');
	
	// Check if we're transitioning from a dropdown state
	const wasDropdownActive = dropdownPill && dropdownPill.style.opacity === '1';
	
	// Hide dropdown pills and show main pill
	if (dropdownPill) {
		dropdownPill.style.opacity = '0';
	}
	if (dropdownMenuPill) {
		dropdownMenuPill.style.opacity = '0';
	}
	
	// Remove active class from More button when switching to main nav
	if (moreButton) {
		moreButton.classList.remove('active');
	}
	
	if (mainPill) {
		mainPill.style.opacity = '1';
		
		const buttonContainer = activeButton.parentNode;
		const buttons = Array.from(buttonContainer.querySelectorAll(".button"));
		const currentIndex = buttons.findIndex((button) => button === activeButton);
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

		if (currentIndex !== -1) {
			const translateX = currentIndex * (activeButton.offsetWidth + buttonGap);
			
			// If transitioning from dropdown state, temporarily disable transition to snap to position
			if (wasDropdownActive) {
				const originalTransition = mainPill.style.transition;
				mainPill.style.transition = 'none';
				mainPill.style.width = `${activeButton.offsetWidth}px`;
				mainPill.style.transform = `translateX(${translateX}px)`;
				
				// Force a reflow to apply the position immediately
				mainPill.offsetHeight;
				
				// Re-enable transitions
				mainPill.style.transition = originalTransition;
			} else {
				mainPill.style.width = `${activeButton.offsetWidth}px`;
				mainPill.style.transform = `translateX(${translateX}px)`;
			}
		}
	}
}

// Dropdown functionality
function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const moreButton = document.getElementById('moreBtn');
    const isDropdownOpen = dropdownMenu.classList.contains('show');
    
    dropdownMenu.classList.toggle('show');
    
    // Handle pill positioning based on current active item
    const activeDropdownItem = document.querySelector('.dropdown-item.active');
    
    if (!isDropdownOpen && activeDropdownItem) {
        // Dropdown is opening and there's an active dropdown item
        setTimeout(() => {
            UpdatePillPosition(activeDropdownItem);
        }, 100); // Small delay to allow dropdown animation
    } else if (isDropdownOpen && activeDropdownItem) {
        // Dropdown is closing and there's an active dropdown item
        // Move pill to More button and ensure it has active class
        moreButton.classList.add("active");
        UpdatePillPosition(moreButton);
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!dropdown.contains(event.target) && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
          // Handle pill positioning when dropdown closes
        const activeDropdownItem = document.querySelector('.dropdown-item.active');
        const moreButton = document.getElementById('moreBtn');
        
        if (activeDropdownItem) {
            // Move pill to More button when dropdown closes and ensure it has active class
            moreButton.classList.add("active");
            UpdatePillPosition(moreButton);
        }
    }
});

function updateMoreButtonPill() {
	const mainPill = document.querySelector('.main-nav .button-selector');
	const dropdownPill = document.querySelector('.dropdown .button-selector');
	const dropdownMenuPill = document.querySelector('.dropdown-menu .button-selector');
	const moreButton = document.getElementById('moreBtn');
	
	// Hide main pill and dropdown menu pill, show dropdown pill positioned over More button
	if (mainPill) {
		mainPill.style.opacity = '0';
	}
	if (dropdownMenuPill) {
		dropdownMenuPill.style.opacity = '0';
	}
	if (dropdownPill && moreButton) {
		dropdownPill.style.opacity = '1';
		
		// Get position of More button relative to dropdown container
		const dropdownContainer = dropdownPill.parentNode;
		const containerRect = dropdownContainer.getBoundingClientRect();
		const buttonRect = moreButton.getBoundingClientRect();
		
		// Calculate relative position
		const relativeX = buttonRect.left - containerRect.left;
		const relativeY = buttonRect.top - containerRect.top;
		
		dropdownPill.style.width = `${moreButton.offsetWidth}px`;
		dropdownPill.style.transform = `translateX(${relativeX}px) translateY(${relativeY}px)`;
	}
}

function updateDropdownPill(activeButton) {
	const mainPill = document.querySelector('.main-nav .button-selector');
	const dropdownPill = document.querySelector('.dropdown .button-selector');
	const dropdownMenuPill = document.querySelector('.dropdown-menu .button-selector');
	const dropdownMenu = document.querySelector('.dropdown-menu');
	const moreButton = document.getElementById('moreBtn');
	
	// Check if we're transitioning from a closed dropdown state (More button was active)
	const wasMoreButtonActive = dropdownPill && dropdownPill.style.opacity === '1';
	
	// Hide main pill and external dropdown pill
	if (mainPill) {
		mainPill.style.opacity = '0';
	}
	if (dropdownPill) {
		dropdownPill.style.opacity = '0';
	}
	
	// Remove active class from More button when dropdown pill is active
	if (moreButton) {
		moreButton.classList.remove('active');
	}
	
	// Show and position the internal dropdown menu pill
	if (dropdownMenuPill && dropdownMenu && activeButton) {
		dropdownMenuPill.style.opacity = '1';
		
		// Get the dropdown items (excluding the pill selector)
		const dropdownItems = Array.from(dropdownMenu.querySelectorAll('.dropdown-item'));
		const itemIndex = dropdownItems.findIndex((item) => item === activeButton);
		
		if (itemIndex !== -1) {
			// With flexbox gap, positioning is much simpler
			const itemHeight = activeButton.offsetHeight;
			const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--buttonContainerGap"));
			
			// Calculate position: (item height + gap) * index
			const itemTop = (itemHeight + gap) * itemIndex;
			
			// If transitioning from More button state, temporarily disable transition to snap to position
			if (wasMoreButtonActive) {
				const originalTransition = dropdownMenuPill.style.transition;
				dropdownMenuPill.style.transition = 'none';
				dropdownMenuPill.style.width = `${activeButton.offsetWidth}px`;
				dropdownMenuPill.style.transform = `translateX(0px) translateY(${itemTop}px)`;
				
				// Force a reflow to apply the position immediately
				dropdownMenuPill.offsetHeight;
				
				// Re-enable transitions
				dropdownMenuPill.style.transition = originalTransition;
			} else {
				dropdownMenuPill.style.width = `${activeButton.offsetWidth}px`;
				dropdownMenuPill.style.transform = `translateX(0px) translateY(${itemTop}px)`;
			}
		}
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