// LUSSO MARCO - Hero Banner Slider & Interactions
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const sliderContainer = document.querySelector('.slider-container');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

  function updateSlider(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update navigation dots
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Control video playback for active slide
    slides.forEach((slide, idx) => {
      const video = slide.querySelector('video');
      if (video) {
        if (idx === currentIndex) {
          video.play().catch(() => {
            // Autoplay policy fallback
          });
        }
      }
    });
  }

  function nextSlide() {
    updateSlider(currentIndex + 1);
  }

  function prevSlide() {
    updateSlider(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Dot click navigation
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      updateSlider(index);
      startAutoplay();
    });
  });

  // Arrow button navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  // Pause autoplay on user hover
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Touch Swipe Support for Mobile & Tablet
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: true }
  );

  track.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Initialize first slide and start autoplay
  updateSlider(0);
  startAutoplay();
});
