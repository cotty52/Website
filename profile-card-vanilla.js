// profile-card-vanilla.js
// Enhanced Vanilla JS implementation of the Profile Card
// Advanced tilt effects, animations, and mobile support

// Animation configuration constants
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20
};

// Utility functions
const clench = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Create a simple coding icon pattern as inline SVG
const createCodingIconSVG = () => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <g fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.05)" stroke-width="0.5">
        <text x="20" y="30" font-family="monospace" font-size="24" fill="rgba(255,255,255,0.08)">&lt;/&gt;</text>
        <text x="10" y="60" font-family="monospace" font-size="16" fill="rgba(255,255,255,0.06)">{ }</text>
        <text x="60" y="70" font-family="monospace" font-size="14" fill="rgba(255,255,255,0.05)">()</text>
        <text x="45" y="85" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.04)">;</text>
      </g>
    </svg>
  `)}`; 
};

function createProfileCard(options) {
  const {
    avatarUrl = '',
    miniAvatarUrl = '',
    name = '',
    title = '',
    email = '',
    linkedin = '',
    github = '',
    enableTilt = true,
    enableMobileTilt = false,
    mobileTiltSensitivity = 5,
    iconUrl = '',
    grainUrl = ''
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'pc-card-wrapper';
  
  // Set CSS custom properties including the coding icon pattern
  const codingIconSVG = iconUrl || createCodingIconSVG();
  wrapper.style.setProperty('--icon', `url(${codingIconSVG})`);
  if (grainUrl) wrapper.style.setProperty('--grain', `url(${grainUrl})`);
  
  wrapper.innerHTML = `
    <section class="pc-card">
      <div class="pc-inside">
        <div class="pc-shine"></div>
        <div class="pc-glare"></div>
        <div class="pc-content pc-avatar-content">
          <img class="avatar" src="${avatarUrl}" alt="${name} avatar" loading="lazy" />
          <div class="pc-user-info">
            <div class="pc-user-details">
              <div class="pc-mini-avatar">
                <img src="${miniAvatarUrl || avatarUrl}" alt="${name} mini avatar" loading="lazy" />
              </div>
              <div class="pc-user-text">
                <div class="pc-contact-links">
                  ${email ? `<div class="pc-contact-link email-link" data-email="${email}" title="Click to copy email">christianjotty@gmail.com</div>` : ''}
                  ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener" class="pc-contact-link" title="Visit LinkedIn">www.linkedin.com/in/christian-otty/</a>` : ''}
                  ${github ? `<a href="${github}" target="_blank" rel="noopener" class="pc-contact-link" title="Visit GitHub">github.com/cotty52</a>` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pc-content">
          <div class="pc-details">
            <h3>${name}</h3>
            <p>${title}</p>
          </div>
        </div>
      </div>
    </section>
  `;

  if (!enableTilt) return wrapper;

  const card = wrapper.querySelector('.pc-card');
  let rafId = null;

  // Advanced card transform function
  const updateCardTransform = (offsetX, offsetY) => {
    const width = card.clientWidth;
    const height = card.clientHeight;

    const percentX = clench((100 / width) * offsetX);
    const percentY = clench((100 / height) * offsetY);

    const centerX = percentX - 50;
    const centerY = percentY - 50;

    // Update all CSS custom properties like the React version
    const properties = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
      '--pointer-from-center': `${clench(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      '--pointer-from-top': `${percentY / 100}`,
      '--pointer-from-left': `${percentX / 100}`,
      '--rotate-x': `${round(-(centerX / 5))}deg`,
      '--rotate-y': `${round(centerY / 4)}deg`
    };

    Object.entries(properties).forEach(([property, value]) => {
      wrapper.style.setProperty(property, value);
    });
  };

  // Smooth animation function
  const createSmoothAnimation = (duration, startX, startY) => {
    const startTime = performance.now();
    const targetX = wrapper.clientWidth / 2;
    const targetY = wrapper.clientHeight / 2;

    const animationLoop = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = clench(elapsed / duration);
      const easedProgress = easeInOutCubic(progress);

      const currentX = adjust(easedProgress, 0, 1, startX, targetX);
      const currentY = adjust(easedProgress, 0, 1, startY, targetY);

      updateCardTransform(currentX, currentY);

      if (progress < 1) {
        rafId = requestAnimationFrame(animationLoop);
      }
    };

    rafId = requestAnimationFrame(animationLoop);
  };

  const cancelAnimation = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  // Enhanced mouse event handlers
  const handlePointerMove = (event) => {
    const rect = card.getBoundingClientRect();
    updateCardTransform(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handlePointerEnter = () => {
    cancelAnimation();
    wrapper.classList.add('active');
    card.classList.add('active');
  };

  const handlePointerLeave = (event) => {
    createSmoothAnimation(
      ANIMATION_CONFIG.SMOOTH_DURATION,
      event.offsetX,
      event.offsetY
    );
    wrapper.classList.remove('active');
    card.classList.remove('active');
  };

  // Device orientation for mobile
  const handleDeviceOrientation = (event) => {
    const { beta, gamma } = event;
    if (!beta || !gamma) return;

    updateCardTransform(
      card.clientHeight / 2 + gamma * mobileTiltSensitivity,
      card.clientWidth / 2 + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity
    );
  };

  // Mobile tilt click handler
  const handleMobileClick = () => {
    if (!enableMobileTilt || location.protocol !== 'https:') return;
    
    if (typeof window.DeviceMotionEvent !== 'undefined' && 
        typeof window.DeviceMotionEvent.requestPermission === 'function') {
      window.DeviceMotionEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        })
        .catch(err => console.error('Device orientation permission denied:', err));
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  };

  // Add event listeners
  card.addEventListener('pointerenter', handlePointerEnter);
  card.addEventListener('pointermove', handlePointerMove);
  card.addEventListener('pointerleave', handlePointerLeave);
  card.addEventListener('click', handleMobileClick);

  // Initial animation
  const initialX = wrapper.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
  const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
  
  updateCardTransform(initialX, initialY);
  createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY);

  // Error handling for images
  const avatar = wrapper.querySelector('.avatar');
  const miniAvatar = wrapper.querySelector('.pc-mini-avatar img');
  
  if (avatar) {
    avatar.addEventListener('error', (e) => {
      e.target.style.display = 'none';
    });
  }
  
  if (miniAvatar) {
    miniAvatar.addEventListener('error', (e) => {
      e.target.style.opacity = '0.5';
      e.target.src = avatarUrl;
    });
  }

  // Copy to clipboard functionality for email
  const emailLink = wrapper.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = emailLink.getAttribute('data-email');
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        
        // Show feedback
        const originalText = emailLink.textContent;
        emailLink.textContent = 'Email copied!';
        emailLink.style.color = 'rgba(100, 255, 100, 0.9)';
        
        setTimeout(() => {
          emailLink.textContent = originalText;
          emailLink.style.color = '';
        }, 2000);
        
      } catch (err) {
        console.error('Failed to copy email:', err);
        // Fallback: open email client
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Cleanup function
  wrapper._cleanup = () => {
    cancelAnimation();
    card.removeEventListener('pointerenter', handlePointerEnter);
    card.removeEventListener('pointermove', handlePointerMove);
    card.removeEventListener('pointerleave', handlePointerLeave);
    card.removeEventListener('click', handleMobileClick);
    window.removeEventListener('deviceorientation', handleDeviceOrientation);
  };

  return wrapper;
}

// Expose a function to insert the card when needed
function insertProfileCard() {
  const container = document.getElementById('profile-card-container');
  if (!container) {
    console.error('[ProfileCard] #profile-card-container not found');
    return;
  }
  
  // Remove any existing card to avoid duplicates
  if (container._currentCard && container._currentCard._cleanup) {
    container._currentCard._cleanup();
  }
  container.innerHTML = '';
  
  const card = createProfileCard({
    avatarUrl: 'Images/Portrait-no-bg.png',
    miniAvatarUrl: 'Images/Portrait-no-bg.png',
    name: 'Christian Otty',
    title: 'Computer Engineer',
    email: 'christianjotty@gmail.com',
    linkedin: 'https://www.linkedin.com/in/christian-otty/',
    github: 'https://github.com/cotty52',
    enableTilt: true,
    enableMobileTilt: true,
    mobileTiltSensitivity: 5
  });
  
  container.appendChild(card);
  container._currentCard = card;
  console.log('[ProfileCard] Enhanced card inserted with advanced tilt effects');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertProfileCard);
} else {
  // DOM is already loaded
  insertProfileCard();
}
