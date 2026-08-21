---
title: "Firmware reset (Nuke) — TouchMe, Playtron, and Biotron"
slug: firmware-reset
section: troubleshooting
summary: "Wipe and reinstall the firmware when the device is unresponsive."
order: 5
segment: ["music-producer"]
deflection_target: 60
status: edited-2026-08
last_edited: 2026-08-05
emoji: ⚡
---

The Nuke reset completely wipes and reinstalls the firmware on your device. Use it when:

- The device is not recognised by your computer at all.
- The device appears as the `RPI-RP2` drive but not as a MIDI device.
- The device behaves unexpectedly after a failed firmware update.
- Support has asked you to do a full reset.

> ⚠️ **Hardware revision matters.** The contact locations linked below
> describe the pictured USB-C revisions only. A USB-C connector by itself does
> not prove that every pad location or recovery step is identical. If your
> board does not match its picture, stop and send support a clear photo of both
> sides; do not probe unlabelled pads.

## First — try the simple update

1. **Open the settings page for your device in Chrome.**
   - TouchMe: [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme)
   - Playtron: [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron)
   - Biotron: [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron)
2. **Plug in the device with USB-C and click "Update Firmware".** If the `RPI-RP2` drive appears automatically, skip to step 4. If the drive does not appear, use the manual Nuke below.
3. **Follow the on-screen instructions** to put the device into update mode.
4. **Upload the latest firmware.** The device reboots automatically. After the reboot, the device appears as a MIDI device, not a drive.

## Manual Nuke (if the simple update does not work)

You will need a paper clip, tweezers, or a short piece of wire, and your USB-C cable. **Biotron owners must pause here until support confirms the board revision from a clear photo of both sides.**

> **Biotron:** use the [large, readable revision-review close-up](/illustrations/biotron/biotron-boot-area.svg) only to identify the area in a photo. The older full-board label was too small to be a safe procedure. Do not bridge the pictured pads until support confirms that your exact board revision matches.

1. **Match the device to its pictured hardware revision.** The linked diagrams
   show two BOOT contacts on their pictured boards: [TouchMe](/devices/touchme/)
   (middle strip), [Playtron](/devices/playtron/) (top peak near USB-C), and
   [Biotron](/devices/biotron/) (revision-review image only). For Biotron,
   visual similarity is not sufficient: continue only after support explicitly
   confirms the pictured revision.
2. **Short the BOOT pins.** Touch both pins at the same time with a paper clip. Hold the connection.
3. **With the pins still shorted, plug in the USB-C cable.**
4. **Wait for the `RPI-RP2` drive to appear on your computer.** Only release the pins **after** the drive appears. The window is brief. If you miss it, unplug and try again.
5. **Release the pins.**
6. **Download `flash_nuke.uf2` and drag it onto the `RPI-RP2` drive.** The device disconnects and reboots. This wipes the firmware completely.
7. **Open [settings.playtronica.com/#/[your device]](https://settings.playtronica.com) in Chrome and click "Update Firmware".** Upload the latest firmware. The device reboots again and appears as a working MIDI device.

## Related pages

- [Troubleshooting hub](/troubleshooting/hub/) — start here if you do not know which troubleshooting path applies.
- [No sound](/troubleshooting/no-sound/) — most common follow-up after a firmware reset.
- [Won't connect](/troubleshooting/wont-connect/) — if the device still does not appear after a reset.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Firmware reset #[order number]`. Tell us your device, your operating system, and which step failed. We aim for 24 hours, but a reply may take up to 3 business days.
