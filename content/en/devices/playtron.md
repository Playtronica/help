---
title: "Playtron — the clip-anything MIDI instrument"
slug: playtron
section: devices
summary: "Clip the wires, ground yourself, touch anything that conducts."
order: 2
segment: ["music-producer", "gift-recipient", "creator"]
status: edited-2026-05
last_edited: 2026-05-26
emoji: 🍉
---

Playtron turns any conductive object into a piano key. Clip alligator wires to fruit, plants, metal, or water. Hold the ground pin and touch the object — the note plays. Up to **16 objects** can be mapped to 16 notes. If the object conducts electricity, Playtron can play it.

> ⚠️ **Handle only the parts shown in this guide.** Touch the 16 alligator-clip pins, the gold ground pin, and the USB-C connector. Even when nothing is plugged in, do not touch solder joints, exposed chips, or the back of the PCB. Playtron is durable, but those areas can be damaged permanently. Treat the rest of the board the way you would treat the back of a phone screen.

> 🛠️ **Want to go deeper?** When you are past the basics, see the [Playtron deep dive](/devices/playtron-advanced/) for custom scales, per-pin mapping, and performance routing.

{{ youtube: ibQuzjFUJd4 title="How to connect Playtron — Playtronica tutorial" }}

## Grounding — the one thing to understand first

**Without grounding, Playtron does not play.** This is the single most common reason new users think Playtron is broken. Grounding is not optional; it is how Playtron works.

Playtron measures tiny electrical changes between the alligator-clip pins and a **reference point** called ground. The reference point completes the circuit. No reference point, no measurement, no note.

You have four ways to ground yourself. Use whichever is easiest in your setup:

1. **Hold the gold ground pin with bare skin.** The simplest method. Your body is the ground reference. Use your dominant hand to touch a note object; use the other hand to hold the gold pin.
2. **Clip a wire to a ground pin, attach the other end to a metal radiator, a metal sink, or your laptop's metal body.** Use this when you cannot touch the device directly — for performances or installations.
3. **Two-person ground.** Hand the ground pin to a friend. They hold it. You touch them. The circuit completes through both bodies.
4. **Audience as ground.** At workshops, the audience holds the ground while one person touches the object. The circuit completes through the audience.

**What does not work as ground:** dry rubber, dry wood, painted metal, anodised aluminium, plastic. Skin needs to be bare; no clothing between you and the metal.

For the full physics, see [Grounding — how and why](/sound/grounding/).

## Quick start

You have read about grounding. Now plug in.

1. **Clip an alligator wire to a note pin on Playtron.** Clip the other end to a conductive object — fruit, plants, metal, or water. Repeat for each note, up to 16 objects.
2. **Plug Playtron into your computer with the USB cable from the box.** Then open [synth.playtronica.com](https://synth.playtronica.com) in Brave or Chrome. Plug in the device first, then open the browser.
3. **Ground yourself.** Hold the gold ground pin with one hand, or use one of the four methods above.
4. **Touch a note object with your other hand.** A note plays. The LED on Playtron does **not** light up when you plug it in. This is normal and not a fault.

## If Playtron is not playing — 5-step checklist

Go through every step before you conclude the device is faulty. This resolves 98% of cases.

1. **Confirm you are grounded.** See the grounding section above. This is the cause 70% of the time.
2. **Use Brave or Chrome.** Safari and Firefox do not support Web MIDI.
3. **Plug in Playtron first, then open the browser.** The browser scans for MIDI devices on page load. If the browser is already open, the device will not be detected.
4. **Check the MIDI dropdown in the synth.** Most synths at synth.playtronica.com have a MIDI dropdown in the top right. Confirm Playtron is listed and selected.
5. **Wet your hands slightly.** Wash your hands and dry them only partially, or apply hand cream. Playtron measures skin conductivity. Dry skin produces a weak signal.

## Update the firmware

Only **USB-C Playtron** devices (2026 and later) can update firmware via the web tool. Older Micro-USB devices do not support this process.

1. **Open [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron) in Brave or Chrome.**
2. **Click "Update Firmware".** If a drive called `RPI-RP2` appears on your computer, skip to step 4.
3. **Follow the on-screen instructions** to put Playtron into update mode (short the BOOT pins, plug in USB-C, release the pins after the drive appears).
4. **Upload the latest firmware.** The device reboots automatically.

For a full reset / Nuke recovery, see [Firmware reset (Nuke)](/troubleshooting/firmware-reset/).

## Test the MIDI signal with a monitor

A MIDI monitor shows whether Playtron is sending any signal. Use it when you cannot tell whether the device or the synth is the problem.

Compatible monitors:

- [MorningStar MIDI Monitor](https://www.morningstar.io/midi-monitor) — online, runs in Brave or Chrome on any operating system.
- [MIDI Monitor by Snoize](https://www.snoize.com/MIDIMonitor/) — macOS only.
- Pocket MIDI — Mac, Windows, or iOS.

Steps:

1. **Plug in Playtron first, then open MorningStar in Brave or Chrome.**
2. **Touch a note object while holding the ground.** You should see message type **Note On** and **Note Off**, MIDI channel 1, and velocity **127**. If messages appear, Playtron is working. The problem is in your synth or browser.
3. **If Playtron does not appear in the device list**, close the browser, wait 5 seconds, reopen the browser, and reload MorningStar. Click the "Devices" button in the top right.
4. **If the device is listed but no messages appear**, open MorningStar Settings and confirm "Note On" messages are enabled. MorningStar shows all 16 notes at once even if only one is active.

## Reset Playtron (factory wipe)

Use the reset only if the firmware update will not start, or after a hardware fault.

1. **Short the BOOT pins with tweezers or a paper clip.**
2. **Plug in USB-C with the BOOT pins still shorted.**
3. **Wait for the `RPI-RP2` drive to appear on your computer, then release the pins.** The window is brief. If the drive does not appear, try again.
4. **Drag `flash_nuke.uf2` onto the `RPI-RP2` drive.** Wait for the device to reboot.
5. **Open [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron) and upload the latest firmware.**

## Related pages

- [Compare all Playtronica devices](/devices/compare/) — side-by-side spec matrix, what is in each box, software compatibility, prices.
- [Accessories and add-ons](/getting-started/accessories/) — extra alligator clips, copper tape, patches, cables, bundles.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Playtron issue #[order number]`. Attach two short videos:

- **Video 1** — the full setup: device, cables, the objects you are touching, and your computer screen with the synth open.
- **Video 2** — a MIDI monitor (MorningStar) open while you interact. We need to see whether the device is sending MIDI messages.

If the device is faulty, we will send a replacement or issue a refund. We aim for 24 hours, but a reply may take up to 3 business days.
