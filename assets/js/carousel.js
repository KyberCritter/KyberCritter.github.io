/* Reusable image carousel. */
(function () {
  'use strict';

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initCarousel(root) {
    var track = root.querySelector('[data-carousel-track]');
    if (!track) {
      return;
    }

    var slides = Array.prototype.slice.call(track.querySelectorAll('[data-carousel-slide]'));
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-carousel-dot]'));
    var status = root.querySelector('[data-carousel-status]');
    var index = 0;
    var frame = null;

    // A single image needs no controls; the mount just stays a plain figure.
    if (slides.length < 2) {
      root.setAttribute('data-ready', '');
      root.setAttribute('data-single', '');
      return;
    }

    function slideWidth() {
      return track.clientWidth || 1;
    }

    function goTo(target, animate) {
      index = Math.max(0, Math.min(slides.length - 1, target));
      var left = index * slideWidth();

      if (animate && !reduceMotionQuery.matches) {
        track.scrollTo({ left: left, behavior: 'smooth' });
      } else {
        // Force an instant jump even when a smooth-scroll behavior is inherited.
        var previous = track.style.scrollBehavior;
        track.style.scrollBehavior = 'auto';
        track.scrollTo({ left: left });
        track.style.scrollBehavior = previous;
      }

      render();
    }

    function render() {
      if (status) {
        status.textContent = (index + 1) + ' of ' + slides.length;
      }
      if (prev) {
        prev.disabled = index === 0;
      }
      if (next) {
        next.disabled = index === slides.length - 1;
      }

      dots.forEach(function (dot, i) {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });

      slides.forEach(function (slide, i) {
        if (i === index) {
          slide.removeAttribute('aria-hidden');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    }

    function syncFromScroll() {
      frame = null;
      var current = Math.round(track.scrollLeft / slideWidth());
      current = Math.max(0, Math.min(slides.length - 1, current));
      if (current !== index) {
        index = current;
        render();
      }
    }

    track.addEventListener('scroll', function () {
      if (frame === null) {
        frame = window.requestAnimationFrame(syncFromScroll);
      }
    }, { passive: true });

    if (prev) {
      prev.addEventListener('click', function () {
        goTo(index - 1, true);
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        goTo(index + 1, true);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i, true);
      });
    });

    track.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          goTo(index - 1, true);
          break;
        case 'ArrowRight':
          goTo(index + 1, true);
          break;
        case 'Home':
          goTo(0, true);
          break;
        case 'End':
          goTo(slides.length - 1, true);
          break;
        default:
          return;
      }
      event.preventDefault();
    });

    window.addEventListener('resize', function () {
      goTo(index, false);
    });

    root.setAttribute('data-ready', '');
    render();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
