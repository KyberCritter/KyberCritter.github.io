---
layout: post
title: "Tuna MP3 Player for Game Boy Advance"
date: 2026-10-20
categories: [blog, software]
tags: [website, gba, game, homebrew, music, wii]
---

<div class="image-row">
<figure class="video-embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/fnOsFR9EXU8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<figcaption>Tuna video demonstration on my YouTube channel</figcaption>
</figure>
</div>

Tuna is a Wii homebrew application that turns MP3 files into a playable Game Boy Advance music player.
It decodes a song on the Wii, squeezes it into a tiny custom format, and sends it over a GameCube–GBA link cable straight into the handheld's RAM.
Once the transfer finishes, you unplug the cable and the song keeps playing on the GBA with no cartridge involved.

<div class="text-center my-6">
<a href="https://github.com/KyberCritter/Tuna" target="_blank" rel="noopener"
   class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
   style="color: #fff; text-decoration: none;">
    <i class="fab fa-github"></i> View on GitHub
</a>
</div>

Tuna runs on an original RVL-001 Wii (the model with GameCube controller ports) through the Homebrew Channel.
It works with the original GBA and both GBA SP models, connected with a GameCube–GBA link cable.
There's also an untested GameCube build that works in the same way.

<figure>
<img src="/assets/images/Tuna_gba_in_hand_with_cable_and_wiimote.jpg" alt="A translucent crimson Game Boy Advance held in one hand, showing the Tuna player screen, next to a white Wii Remote and a GameCube-to-GBA link cable">
<figcaption>A transferred track on my custom GBA</figcaption>
</figure>

## Background

I've spent a lot of time this month writing homebrew for the Game Boy Advance, first [GBScribe](https://scottratchford.com/blog/2026/10/15/gbscribe/) and then [PixelPoach](https://scottratchford.com/blog/2026/10/20/pixelpoach/).
This time, instead of connecting the GBA to original Game Boy accessories, I decided to take advantage of its connection to the GameCube (or Wii).

The Game Boy Advance can connect to a GameCube using a special link cable.
This cable was used for features like trading Pokemon between third-generation Pokemon Games and Pokemon Coloseum.
It even worked as a controller with its own display in The Legend of Zelda: Four Swords Adventure.
Games like Animal Crossing sent the GBA minigames that worked even after disconnecting from the system.
This is where I decided to work.

## The Problem

The GBA has just **256 KiB of EWRAM** and 32 KiB of IWRAM.
A typical three-minute MP3 is three to five megabytes, more than ten times the memory of the entire console.
So a song has to be compressed far beyond usual levels, and it has to fit in memory beside the code for the player.
Don't even think about trying to fit *two* songs in there.

## The Solution

Tuna splits the work between the two machines.

The Wii does the heavy lifting. It reads the original MP3 from an SD card or USB drive, decodes it, downmixes to mono, resamples, and re-encodes it into a compact `.tuna` container.
Then it boots a tiny player image onto the GBA through the BIOS multiboot protocol. This allows us to start the program straight from the link cable, rather than using a traditional cartridge.
The player is only about 12 KiB. This gives us 192 KiB to fit the song.

Because the storage budget is so tight, Tuna picks the best quality profile that actually fits the decoded song:

- **4-bit IMA ADPCM at 8192 Hz** for short tracks, up to about 46 seconds
- **2-bit ADPCM at 8192 Hz or 4096 Hz** for longer material
- **1-bit adaptive delta at 4096 Hz** for five-minute tracks

These are deliberately low-quality formats. We have to trade fidelity for the ability to carry a complete song in a device with a quarter of a megabyte of RAM.

## Tuna Features

### Browse and Convert on the Wii

Tuna lists MP3 and `.tuna` files from `/music/` and `/tuna/` on the SD card or USB device, up to 127 files. There's also a 4-second test jingle built in.
Pressing `A` opens a preview showing the decoded duration and the profile Tuna selected.
Pressing `A` again sends it to the GBA. `B` cancels the transfer.

Conversions are cached on the SD card as `.tuna` files **before** the transfer is attempted.
That means a failed cable connection doesn't require another conversion, and a saved track shows up in the browser the next time you start the app.

### Play on the GBA

<figure>
<img src="/assets/images/Tuna_gba_closeup.jpg" alt="A close-up of the Game Boy Advance screen showing the Tuna player paused with the track title, artist, album, codec, sample rate, byte count and a SAFE TO UNPLUG message">
<figcaption>The GBA player paused after a completed transfer, with the link cable still attached</figcaption>
</figure>

The GBA screen shows the title, artist, and album pulled from the MP3's ID3 tags if they're present. It also displays the codec, sample rate, encoded size, a progress bar, and elapsed and total time.

`A` plays, pauses, and restarts a track after it ends.
`L` and `R` seek five seconds backward and forward.
`B` restarts the track.

<figure>
<img src="/assets/images/Tuna_gba_playing.png" alt="A close-up of the Game Boy Advance screen showing Tuna playing Animal by Pearl Jam at 1:34 of 2:49">
<figcaption>Tuna playing Animal at 1:34 of 2:49</figcaption>
</figure>

Wait until the Wii shows the message **SAFE TO UNPLUG**.
This means the GBA has validated the entire payload and its checksums, so the track is guaranteed to be playable.
Once it appears, you can disconnect the GBA from the cable and Wii.
Regardless, you can play the track until you turn off the GBA.

### A 30-Second Excerpt

Not every song fits.
Rather than silently cutting a track short, Tuna rejects anything over the limit unless you explicitly ask for a 30-second excerpt with `Y` on a GameCube controller or `−` on a Wii Remote.

## Future Considerations

The honest limitation is audio quality.
1-bit delta at 4096 Hz keeps the rhythm and melody of a song, but it sounds like a very old radio.
That's the cost of fitting five minutes of music into 172 kilobytes, and I think it's a fair trade for the novelty of a GBA MP3 player that lives in RAM.

There are a few other directions worth exploring:

- A native GameCube build already exists and uses an SD Gecko for storage
- Support for more link-cable ports is implemented, so multiple GBAs could be addressed in sequence
- Further experiments with compression to increase sound quality at this same file size

## Acknowledgements and References

Tuna is copyright © 2026 Scott Ratchford.
Tuna's original code and documentation are available under the MIT License.
See [LICENSE](https://github.com/KyberCritter/Tuna/blob/main/LICENSE).

Tuna incorporates third-party libraries and runtime components, including minimp3, libgba, and libogc.
See [THIRD-PARTY-NOTICES.md](https://github.com/KyberCritter/Tuna/blob/main/THIRD-PARTY-NOTICES.md) for the full list and licenses.

Not affiliated with, endorsed by, or sponsored by Nintendo.
The use of brand names and trademarks in this document is for informational purposes only.

1. [GBATEK](https://problemkaputt.de/gbatek.htm) by Martin Korth
2. [GBA memory layout](https://gbdev.net/gbadoc/memory.html)
3. [GBA multiboot — GBATEK](https://mgba-emu.github.io/gbatek/#gba-multiboot)
4. [FIX94 GBA Link Cable ROM Sender](https://github.com/FIX94/gba-link-cable-rom-sender) by FIX94
5. [gba-link-connection](https://github.com/afska/gba-link-connection) by afska
6. [libogc](https://github.com/devkitPro/libogc) and [devkitPro](https://devkitpro.org/)
7. [Dolphin Emulator](https://dolphin-emu.org/) and [mGBA](https://mgba.io/)
8. [minimp3](https://github.com/lieff/minimp3) by lieff
