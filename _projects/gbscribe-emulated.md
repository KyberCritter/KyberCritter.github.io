---
layout: project
title: "GBScribe Emulated"
description: "Interactive browser demo of GBScribe, the Game Boy Advance word processor and pixel-art tool, connected to an emulated Game Boy Printer"
categories: [Software, Web]
cover_image: /assets/images/GBScribe_gba.jpg
date: 2026-10-22
featured: false
---

## Overview

GBScribe Emulated is a browser demo of [GBScribe](/blog/2026/10/15/gbscribe/), my word processor and pixel-art drawing tool for the Game Boy Advance, connected to an emulated Game Boy Printer. It runs the unmodified GBScribe ROM in a WebAssembly build of mGBA, so you can type, draw, print, tear off the paper, and export the result without owning any of the hardware.

<div class="flex flex-wrap justify-center gap-3 my-6">
<a href="/gbscribe-emulator/"
   class="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-primary transition"
   style="color: #fff; text-decoration: none;">
    <i class="fas fa-external-link-alt"></i> Try Now
</a>
<a href="https://github.com/KyberCritter/GBScribe-Emulated" target="_blank" rel="noopener"
   class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
   style="color: #fff; text-decoration: none;">
    <i class="fab fa-github"></i> View on GitHub
</a>
</div>

## How It Works

GBScribe bit-bangs the original Game Boy Printer protocol over the GBA link port in general-purpose GPIO mode. Most browser GBA emulators do not implement that mode, and none ship a Game Boy Printer. This project fills both gaps:

- **mGBA in WebAssembly** runs the unmodified GBScribe ROM.
- **GPIO link-port channel** clocks the printer from `RCNT` GPIO mode and passes its replies back to the emulator core.
- **Serial-level Game Boy Printer** parses the real `0x88 0x33` packet protocol, buffers the 2bpp tile data, runs the motor, and physically advances paper.
- **Interactive shell** wraps the emulator in a clickable GBA, plugs a Link Cable into the printer, and lets you tear the output off and export it.

The printer is not a mock of GBScribe's output. The ROM detects it with its normal INQUIRY probe, streams its normal DATA chunks, and polls the normal PRINTING status bit. Powering the printer off makes GBScribe report `Printer: disconnected` through the same code path as real hardware.

## Features

- Unmodified GBScribe ROM with the full word processor and drawing tools
- Clickable and touch-friendly GBA controls, plus remappable keyboard bindings
- Guided first-run tour and a **Try a test print** button
- Emulated Game Boy Printer with power, feed, paper rolls, jams, and tearing
- PNG, BMP, and multi-page PDF export, plus printing through the browser
- Saves, control bindings, and printed pages kept locally with permission
- No data sent to a server at runtime

## Technical Stack

- **Emulator**: mGBA compiled to WebAssembly, with a custom GPIO link-port channel
- **Front end**: JavaScript custom element with a Shadow DOM, Web Audio, and Web Workers
- **Printer**: Serial protocol, 2bpp tile decoder, 281-dot thermal paper model
- **Export**: Canvas and PDF generation in the browser
- **Hosting**: Static files served by Jekyll on GitHub Pages

## Links

- [Play GBScribe in your browser](/gbscribe-emulator/)
- [Source code on GitHub](https://github.com/KyberCritter/GBScribe-Emulated)
- [GBScribe on GitHub](https://github.com/KyberCritter/GBScribe)
