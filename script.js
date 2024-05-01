document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();  // Prevent default jumping behavior
      const targetSection = this.getAttribute('href');
      const targetElement = document.querySelector(targetSection);
      smoothScroll(targetElement);
    });
  });
  
  function smoothScroll(target) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    let startTime = null;
  
    const animation = window.requestAnimationFrame || function(callback) {
      startTime = !startTime ? performance.now() : startTime;
      const time = performance.now() - startTime;
      const ease = Math.easeOutCubic(time, startPosition, targetPosition - startPosition, 750);
      window.scrollTo(0, ease);
      if (time < 750) {
        window.requestAnimationFrame(callback);
      }
    };
  
    animation(animation);
  }
  
  // This defines the ease-out-cubic function for smooth scrolling animation
  Math.easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c * (Math.pow(t, 3)) + b;
  };
  