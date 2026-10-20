---
layout: post
title: "PixelPoach: Transferring Photos from Game Boy Camera to PC"
date: 2026-10-20
categories: [blog, software]
tags: [website, gba, game, homebrew, camera]
gallery:
  - image: /assets/images/PixelPoach_museum.png
    alt: A pixelated Game Boy Camera photo of the exterior of the Smithsonian Museum of the American Latino
    caption: The exterior of the Smithsonian Museum of the American Latino
  - image: /assets/images/PixelPoach_Washington_monument.png
    alt: A pixelated Game Boy Camera photo of the DC skyline in silhouette, with the Washington Monument visible on the right
    caption: The Washington Monument on the right of the DC skyline
  - image: /assets/images/PixelPoach_metro_tunnel.png
    alt: A pixelated Game Boy Camera photo of a Washington, DC metro tunnel
    caption: A Washington, DC metro tunnel
---

<div class="image-row">
<figure class="video-embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/QWG0_xVgre8?si=6LmJt_yDzR2sb2NE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<figcaption>PixelPoach video demonstration on my YouTube channel</figcaption>
</figure>
</div>

I'm back with another strange piece of custom software for the Game Big Advance. This time, it's PixelPoach, a program to fetch photos from a real Game Boy Camera by tricking the camera into thinking it's communicating with another copy of the same program. This allows me to fetch the images from the Game Boy Camera, save them to my GBA flash cartridge's MicroSD card, and view them on my computer.

<div class="text-center my-6">
<a href="https://github.com/KyberCritter/PixelPoach" target="_blank" rel="noopener"
   class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
   style="color: #fff; text-decoration: none;">
    <i class="fab fa-github"></i> View on GitHub
</a>
</div>

<figure>
<img src="/assets/images/PixelPoach_metro_tunnel.png" alt="A low-resolution photo of a metro tunnel">
<figcaption>A photo of a Washington, DC metro tunnel extracted from my Game Boy Camera save file</figcaption>
</figure>

## Background

Released in 1998, the Game Boy Camera was once the world's [smallest consumer digital camera](https://petapixel.com/2016/03/17/game-boy-camera-worlds-smallest-digital-camera/). To trade photos, players would physically connect their Game Boys with cameras plugged in, press a few buttons, and send photos.

<figure>
<img src="/assets/images/PixelPoach_camera_taking_photo_of_gba.jpg" alt="A green Game Boy Camera in a purple Game Boy Color previewing a photo of a translucent crimson Game Boy Advance">
<figcaption>A Game Boy Camera in a Game Boy Color taking a photo of a Game Boy Advance</figcaption>
</figure>

In the distant future year of 2026, anyone can buy a device to read Game Boy cartridges and their save files. But I don't have one of those, so what can I do?

## The Problem

As we discussed in [my last write-up on GBScribe](https://scottratchford.com/blog/2026/10/15/gbscribe/), I have some unique hardware constraints. I have a Game Boy Advance, a Game Boy Color, a Game Boy Camera, a link cable, and a flash cartridge that doesn't allow me to directly run Game Boy (Color) games.

<figure>
<img src="/assets/images/PixelPoach_hardware.jpg" alt="A colorful link cable, a flash cartridge, a gray Game Boy Camera, a translucent crimson Game Boy Advance, and a purple Game Boy Color laid out on a white surface">
<figcaption>The hardware used for PixelPoach</figcaption>
</figure>

## The Solution

I'll trick my Game Boy into thinking it's transferring photos to another copy of the camera program. Thankfully, the transfer protocols are well-documented. We actually have a few options. Instead of using the transfer protocol, we could trick the camera into thinking it's sending photos to a Game Boy Printer. I'll stick with the transfer method for now.

<figure>
<img src="/assets/images/PixelPoach_hardware_plugged_in.png" alt="A translucent crimson Game Boy Advance running PixelPoach connected by a colorful link cable to a purple Game Boy Color with a green Game Boy Camera showing the Game Boy Camera title screen">
<figcaption>PixelPoach on a Game Boy Advance connected to a Game Boy Color with a Game Boy Camera</figcaption>
</figure>

The Game Boy Camera and Game Boy link cable protocols are well-documented. Thank you to all of the researchers [linked below](#acknowledgements-and-references) for their hard work and willingness to share their findings.

## PixelPoach Features

### Receive Photos

Once an image is received, it's displayed on the screen.
This is the same image you can export from the save file.

### Send Photos

The program can also send photos back to a real Game Boy Camera.
You could use this to load custom images onto the cartridge even if they weren't taken with a Game Boy Camera.

### View Photos

You can also view all the photos on the save file.

<figure>
<img src="/assets/images/PixelPoach_metro_tunnel_screenshot.png" alt="A low-resolution photo of a metro tunnel, seen within the PixelPoach view menu">
<figcaption>A photo of the Washington, DC metro, as seen from the PixelPoach view menu</figcaption>
</figure>

### Export to PNG

Using the save extraction script on your PC, you can convert the saved images to PNG files.

## Photo Gallery

After I had a working prototype, I spent an afternoon walking around Washington, DC's beautiful National Mall.
Here are some of my favorite shots!

{% include carousel.html id="photo-gallery" label="Photo gallery" images=page.gallery %}

## Future Considerations

The Game Boy Camera deletes saved images after transferring them to another camera.
To avoid this, we could instead emulate a Game Boy Printer and "print" to our flash cartridge.
This would work similarly to the existing solution without deleting the photo from our camera.

While developing the program, I lost or corrupted several of my favorite photos in the transfer process.
I recommend testing any changes to the program with placeholder images.

## Acknowledgements and References

PixelPoach is copyright © 2026 Scott Ratchford.
PixelPoach's original code and documentation are available under the MIT License.
See [LICENSE.md](https://github.com/KyberCritter/PixelPoach/blob/main/LICENSE).

Not affiliated with, endorsed by, or sponsored by Nintendo. The use of brand names and trademarks in this document are for informational purposes only.

I relied on the following documentation and open-source projects while developing PixelPoach:

1. [Camera Transfer Protocol — Game Boy Camera Wiki](https://funtography.online/wiki/Camera_Transfer_Protocol)
2. [Structure of the Game Boy Camera Save Data — Game Boy Camera Wiki](https://funtography.online/wiki/Structure_of_the_Game_Boy_Camera_Save_Data)
3. [Exporting images from the Game Boy Camera — Game Boy Camera Wiki](https://funtography.online/wiki/Exporting_images_from_the_Game_Boy_Camera)
4. [Inject pictures in your Game Boy Camera saves](https://github.com/Raphael-Boichot/Inject-pictures-in-your-Game-Boy-Camera-saves) by Raphael Boichot
5. [gameboycameralib](https://github.com/KodeMunkie/gameboycameralib) by KodeMunkie
6. [flipper-gblink](https://github.com/kbembedded/flipper-gblink) by kbembedded
7. [Serial Data Transfer (Link Cable) — Pan Docs](https://gbdev.io/pandocs/Serial_Data_Transfer_(Link_Cable).html)
8. [Game Boy Printer — Pan Docs](https://gbdev.io/pandocs/Game_Boy_Printer.html)
9. [GBATEK](https://problemkaputt.de/gbatek.htm) by Martin Korth
10. [GBScribe](https://github.com/KyberCritter/GBScribe) by me
11. [AdvancePrint](https://github.com/KyberCritter/AdvancePrint) by me
