---
layout: post
title: "PixelPoach: Transferring Photos from Game Boy Camera to PC"
date: 2026-10-19
categories: [blog, software]
tags: [website, gba, game, homebrew, camera]
---

I'm back with another strange piece of custom software for the Game Big Advance. This time, it's PixelPoach, a program to fetch photos from a real Game Boy Camera by tricking the camera into thinking it's communicating with another copy of the same program. This allows me to fetch the images from the Game Boy Camera, save them to my GBA flash cartridge's MicroSD card, and view them on my computer.

<!--
<figure>
<img src="/assets/images/pixelpoach_camera_in_gbc.jpg" alt="A Game Boy Camera in a Game Boy Color taking a photo">
<figcaption>A Game Boy Camera in a Game Boy Color taking a photo</figcaption>
</figure>
-->

## Background

Released in 1998, the Game Boy Camera was once the world's [smallest consumer digital camera](https://petapixel.com/2016/03/17/game-boy-camera-worlds-smallest-digital-camera/). To trade photos, players would physically connect their Game Boys with cameras plugged in, press a few buttons, and send photos.

<!--
<figure>
<img src="/assets/images/pixelpoach_trading_cameras.jpg" alt="Two Game Boys with Game Boy Cameras connected by a link cable to trade photos">
<figcaption>Two Game Boy Cameras connected by a link cable to trade photos</figcaption>
</figure>
-->

In the distant future year of 2026, anyone can buy a device to read Game Boy cartridges and their save files. But I don't have one of those, so what can I do?

## The Problem

As we discussed in [my last write-up on GBScribe](https://scottratchford.com/blog/2026/10/15/gbscribe/), I have some unique hardware constraints. I have a Game Boy Advance, a Game Boy Color, a Game Boy Camera, a link cable, and a flash cartridge that doesn't allow me to directly run Game Boy (Color) games.

<!--
<figure>
<img src="/assets/images/pixelpoach_hardware.jpg" alt="A Game Boy Advance, Game Boy Color, Game Boy Camera, link cable, and EZ-Flash Omega flash cartridge">
<figcaption>The hardware used for PixelPoach</figcaption>
</figure>
-->

## The Solution

I'll trick my Game Boy into thinking it's transferring photos to another copy of the camera program. Thankfully, the transfer protocols are well-documented. We actually have a few options. Instead of using the transfer protocol, we could trick the camera into thinking it's sending photos to a Game Boy Printer. I'll stick with the transfer method for now.

The Game Boy Camera and Game Boy link cable protocols are well-documented. Thank you to all of the researchers [linked below](#acknowledgements-and-references) for their hard work and willingness to share their findings.

## PixelPoach Features

### Receive Photos

Once an image is received, it's displayed on the screen. The image you see here is the same one you can export from the save file.

<!--
<figure>
<img src="/assets/images/pixelpoach_transfer_process.jpg" alt="PixelPoach receiving a photo from a Game Boy Camera over the link cable">
<figcaption>Receiving a photo from the Game Boy Camera</figcaption>
</figure>
-->

### Send Photos

The program can also send photos back to a real Game Boy Camera. You could use this to load custom images onto the cartridge even if they weren't taken with a Game Boy Camera.

<!--
<figure>
<img src="/assets/images/pixelpoach_send_process.jpg" alt="PixelPoach sending a stored photo back to a Game Boy Camera">
<figcaption>Sending a stored photo back to the Game Boy Camera</figcaption>
</figure>
-->

### View Photos

You can also view all the photos on the save file.

<!--
<figure>
<img src="/assets/images/pixelpoach_photo_viewer.png" alt="PixelPoach photo viewer running in the mGBA emulator">
<figcaption>Browsing stored photos in PixelPoach</figcaption>
</figure>
-->

### Export to PNG

Using the save extraction script on your PC, you can convert the saved images to PNG files.

## Photo Gallery

After I had a working prototype, I spent an afternoon walking around Washington, DC's beautiful National Mall. Here are some of my favorite shots!

<!--
<div class="image-row">
<figure>
<img src="/assets/images/pixelpoach_gallery_01.png" alt="A Game Boy Camera photo taken on the National Mall in Washington, DC">
<figcaption>A photo from the National Mall</figcaption>
</figure>
</div>
-->

## Future Considerations

The Game Boy Camera deletes saved images after transferring them to another camera. To avoid this, we could instead emulate a Game Boy Printer and "print" to our flash cartridge. This would work similarly to the existing solution without deleting the photo from our camera.

## Acknowledgements and References

PixelPoach is free software, licensed under the MIT License — see [LICENSE.md](https://github.com/KyberCritter/PixelPoach/blob/main/LICENSE.md).

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
