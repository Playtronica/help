---
title: "Firmware reset (Nuke) — TouchMe, Playtron, and Biotron"
slug: firmware-reset
section: troubleshooting
summary: "Wipe and reinstall the firmware when the device is unresponsive."
order: 5
status: edited-2026-05
emoji: ⚡
---

The Nuke reset completely wipes and reinstalls the firmware on your device. Use it when:

- The device is not recognised by your computer at all.
- The device appears as the `RPI-RP2` drive but not as a MIDI device.
- The device behaves unexpectedly after a failed firmware update.
- Support has asked you to do a full reset.

> ⚠️ **USB-C devices only (2026 models and later).** This reset method requires a USB-C port. Older Micro-USB models do not support this process. Check your device — if the port is USB-C, you can use this guide.

## First — try the simple update

1. **Open the settings page for your device in Brave or Chrome.**
   - TouchMe: [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme)
   - Playtron: [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron)
   - Biotron: [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron)
2. **Plug in the device with USB-C and click "Update Firmware".** If the `RPI-RP2` drive appears automatically, skip to step 4. If the drive does not appear, use the manual Nuke below.
3. **Follow the on-screen instructions** to put the device into update mode.
4. **Upload the latest firmware.** The device reboots automatically. After the reboot, the device appears as a MIDI device, not a drive.

## Manual Nuke (if the simple update does not work)

You will need a paper clip, tweezers, or a short piece of wire, and your USB-C cable.

1. **Find the BOOT pins on your device.** The BOOT pins are two small metal contacts on the PCB, usually near the USB port. Check the silkscreen label on the device or the diagram at [settings.playtronica.com](https://settings.playtronica.com).
2. **Short the BOOT pins.** Touch both pins at the same time with a paper clip. Hold the connection.
3. **With the pins still shorted, plug in the USB-C cable.**
4. **Wait for the `RPI-RP2` drive to appear on your computer.** Only release the pins **after** the drive appears. The window is brief. If you miss it, unplug and try again.
5. **Release the pins.**
6. **Download `flash_nuke.uf2` and drag it onto the `RPI-RP2` drive.** The device disconnects and reboots. This wipes the firmware completely.
7. **Open [settings.playtronica.com/#/[your device]](https://settings.playtronica.com) in Brave or Chrome and click "Update Firmware".** Upload the latest firmware. The device reboots again and appears as a working MIDI device.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there, what to email instead, and where to find the WhatsApp regional groups.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Firmware reset #[order number]`. Tell us your device, your operating system, and which step failed. We aim for 24 hours, but a reply may take up to 3 business days.
