---
layout: project
title: "3D Printing & CAD"
description: "Functional parts, prototypes, and engineering projects using CAD modeling and 3D printing"
categories: [3D Printing, CAD]
cover_image: /assets/images/laptop_typing.jpg
date: 2026-02-14
featured: true
---

## Overview

With {{ 'now' | date: "%Y" | minus: 2016 }}+ years of 3D printing experience, I design and manufacture functional parts, prototypes, and custom solutions using CAD modeling and 3D printing technology.

## Skills & Expertise

- **CAD Modeling**: SolidWorks for precision engineering design
- **3D Printing**: Maintenance, repair, and operation of FDM printers, SLA printers, binder jetting printers, and chemical baths
- **G-code/Cura Scripting**: Custom print profiles and automation
- **Materials**: PLA, PETG, ABS, resin, Kevlar, nylon, carbon fiber, powder, and chemical supports

## Project Highlights

### Functional Parts

- Custom parts for manufacturing applications
- Precision-designed components using SolidWorks

### Professional Experience

#### Technical Support for University of Alabama College of Engineering (2021-2023)

- Assisted students and faculty with 3D printing projects
- Maintained FDM, SLA, and binder jetting printers
- Designed custom solutions
- 3D scanning with industrial-grade equipment
- Quoted custom orders
- Assisted academic design work

#### 3D Design Intern at NGE Equipment (2022)

- Repaired and rebuilt FDM and SLA printers
- Design 3D models
- Scripted Cura plugins
- Directed programmed with G-Code

## Gallery

<div class="relative max-w-4xl mx-auto">
  <!-- Carousel Container -->
  <div class="relative overflow-hidden rounded-xl shadow-2xl bg-gray-900" role="region" aria-label="3D Printing Gallery">
    <!-- Slides -->
    <div id="carousel" class="flex transition-transform duration-500 ease-in-out" role="group" aria-roledescription="carousel">
      <div class="min-w-full">
        <img src="/assets/images/grappling_hook_stairwell.jpg" alt="Batman-inspired grappling hook demonstration in stairwell" class="w-full h-96 md:h-[500px] object-contain bg-gray-900">
        <div class="p-4 bg-gray-800 text-white text-center">
          <p class="text-lg font-semibold">Batman-inspired grappling hook demonstration in stairwell</p>
        </div>
      </div>
      <div class="min-w-full">
        <img src="/assets/images/batarang.jpg" alt="3D printed batarang" class="w-full h-96 md:h-[500px] object-contain bg-gray-900">
        <div class="p-4 bg-gray-800 text-white text-center">
          <p class="text-lg font-semibold">3D printed batarang</p>
        </div>
      </div>
      <div class="min-w-full">
        <img src="/assets/images/grappling_hook_newly_printer.jpg" alt="Grappling hook fresh off the printer" class="w-full h-96 md:h-[500px] object-contain bg-gray-900">
        <div class="p-4 bg-gray-800 text-white text-center">
          <p class="text-lg font-semibold">Grappling hook fresh off the printer</p>
        </div>
      </div>
      <div class="min-w-full">
        <img src="/assets/images/scott_3d_print.jpg" alt="60% scale model of Scott's head" class="w-full h-96 md:h-[500px] object-contain bg-gray-900">
        <div class="p-4 bg-gray-800 text-white text-center">
          <p class="text-lg font-semibold">60% scale model of Scott's head</p>
        </div>
      </div>
    </div>

    <!-- Previous Button -->
    <button id="prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all hover:scale-110" aria-label="Previous image">
      <i class="fas fa-chevron-left text-xl" aria-hidden="true"></i>
    </button>

    <!-- Next Button -->
    <button id="next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all hover:scale-110" aria-label="Next image">
      <i class="fas fa-chevron-right text-xl" aria-hidden="true"></i>
    </button>
  </div>

  <!-- Dots Indicator -->
  <div class="flex justify-center gap-2 mt-6" role="group" aria-label="Image navigation">
    <button class="dot w-3 h-3 rounded-full bg-accent transition-all" data-index="0" aria-label="Go to image 1"></button>
    <button class="dot w-3 h-3 rounded-full bg-gray-300 transition-all" data-index="1" aria-label="Go to image 2"></button>
    <button class="dot w-3 h-3 rounded-full bg-gray-300 transition-all" data-index="2" aria-label="Go to image 3"></button>
    <button class="dot w-3 h-3 rounded-full bg-gray-300 transition-all" data-index="3" aria-label="Go to image 4"></button>
  </div>
</div>

<script>
  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  const totalSlides = 4;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-accent', index === currentIndex);
      dot.classList.toggle('bg-gray-300', index !== currentIndex);
      dot.classList.toggle('scale-125', index === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }
  });
</script>
