---
title: "Windows: the browser freezes when I unplug the device"
slug: windows-browser-freeze
section: troubleshooting
summary: "Chrome, Edge or Opera on Windows stops responding when you unplug Playtron, TouchMe, Biotron or Scales. Your device is fine. Here is what to do."
order: 6
segment: ["music-producer", "gift-recipient"]
status: edited-2026-11
last_edited: 2026-11-12
emoji: 🧊
---

On Windows 11, Chrome, Edge and Opera can stop responding when you unplug a
Playtronica device while a MIDI page is open, for example
play.playtronica.com, touchme.playtronica.com or settings.playtronica.com.

Your device is not broken. This is a known bug in the Chromium browser
engine on Windows, which started with browser versions released in late
October 2026. We are preparing a firmware update that avoids it.

Ableton Live and other music apps are not affected. Only the browser freezes.

## Before you unplug

**Close the tab** with the Playtronica page first, then unplug the device.

## If the browser has already frozen

1. Press **Ctrl + Shift + Esc** to open Task Manager.
2. Select your browser and click **End task**.
3. Plug the device back in and open the page again.

## Updating firmware on Windows

The device restarts during a firmware update, and the browser may freeze at
that moment. If you have a Mac, update there.

If the browser freezes during an update on Windows:

1. Close the browser in Task Manager, as above.
2. If a drive named `RPI-RP2` is visible, finish the update as described in
   [If RPI-RP2 is already visible](/troubleshooting/firmware-reset/#if-rpi-rp2-is-already-visible).
3. If there is no `RPI-RP2` drive, unplug the device, plug it back in and
   try the update again.
