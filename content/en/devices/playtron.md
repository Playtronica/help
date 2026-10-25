---
title: "Playtron — the clip-anything MIDI instrument"
slug: playtron
section: devices
summary: "Clip the wires, ground yourself, touch anything that conducts. Setup, the grounding fix, the no-sound checklist, and firmware updates."
order: 2
segment: ["music-producer", "gift-recipient", "creator"]
deflection_target: 90
status: edited-2026-08
last_edited: 2026-10-25
emoji: 🍉
---

<img src="/illustrations/playtron/playtron-top.svg" alt="Playtron top view, labelled — USB-C connector and BOOT pins on the top peak, the microcontroller below them, 16 gold note pins each labelled with a note name, and two pointed gold ground corners at the bottom" style="display:block;margin:8px 0 20px;max-width:100%;height:auto;background:transparent" />

Playtron turns any conductive object into a piano key. Clip alligator wires to fruit, plants, metal, or water. Hold a gold corner of the device — that is the ground — and touch the object, and the note plays. Up to **16 objects** can be mapped to 16 notes. If the object conducts electricity, Playtron can play it.

> ⚠️ **Handle only the parts shown in this guide.** Touch the 16 alligator-clip pins, the two gold ground corners, and the USB-C connector. Even when nothing is plugged in, do not touch solder joints, exposed chips, or the back of the PCB. Playtron is durable, but those areas can be damaged permanently. Treat the rest of the board the way you would treat the back of a phone screen.

> 🛠️ **Want to go deeper?** When you are past the basics, see the [Playtron deep dive](/devices/playtron-advanced/) for custom scales, per-pin mapping, and performance routing.

> 🎛️ **Playtron plays through Play.** [Play](https://play.playtronica.com) is Playtronica's online sampler made for Playtron: choose a sound pack, plug in Playtron, touch to play. No installation. No Playtron yet? Try the sounds with your keyboard or touch screen.

> 🛒 **Don't have one yet?** [Buy Playtron on shop.playtronica.com](https://shop.playtronica.com/products/playtron) — White or Black (Limited). The box ships with the USB cable and 8 alligator-clip cables.

{{ youtube: ibQuzjFUJd4 title="How to connect Playtron — Playtronica tutorial" }}

## Grounding — the one thing to understand first

**Without grounding, Playtron does not play.** This is the single most common reason new users think Playtron is broken. Grounding is not optional; it is how Playtron works.

Playtron is an electrical circuit with two ends. The **16 alligator-clip pins** are one end, and the **two gold ground corners** are the other. Your body closes the loop between them: one hand on ground, the other hand on the object. No closed loop, no note.

**The ground has to reach your skin.** Ground clipped to a radiator, a pipe, or your laptop leaves you outside the circuit, and nothing plays.

You have five ways to ground yourself. Use whichever is easiest in your setup:

1. **Hold a gold corner with bare skin.** The simplest method. Both gold corners are Ground, so either one works. Touch a note object with your other hand.
2. **Hold a ground cable.** For more freedom, clip a wire to a gold corner and keep the metal end in your hand. Use this when the device sits out of reach.
3. **Wear the ground.** Clip the wire to a metal ring, a metal wristband, or the edge of your clothing where it touches skin. The cable stays hidden — the pattern for live performance.
4. **Hold a second object.** Clip the wire to another conductive object — an orange, a spoon, a glass of water — and hold that object while you play the rest.
5. **Another person.** A friend holds the ground and touches your skin. At workshops the whole group holds hands while one person plays.

**What does not work as ground:** your laptop's metal body (it is already the same ground through the USB cable), a radiator or a pipe (the circuit goes to the wall instead of to you), dry rubber, dry wood, painted metal, anodised aluminium, plastic. Skin needs to be bare; no clothing between you and the metal.

For installation patterns and the full explanation, see [Grounding — how and why](/sound/grounding/).

{{ youtube: ixZ_ac3A47Q title="How to ground Playtron — Playtronica tutorial" }}

## Quick start

You have read about grounding. Three steps to your first sound:

1. **Plug Playtron in by USB.** Use the USB cable from the box. Playtron's LED stays dark when you plug it in — that is normal and not a fault. You can plug Playtron in before or after opening Play.
2. **Open [play.playtronica.com](https://play.playtronica.com) in Chrome (Brave and Edge work too).** Choose a sound pack and click **Allow** when the browser asks about MIDI devices. The Device menu in Play shows **Playtron** when it is connected.
3. **Hold a gold corner (Ground) with one hand and touch an object with the other.** First clip an alligator wire to a note pin on Playtron, and clip the other end to a conductive object — fruit, plants, metal, or water. Touch the object and a note plays. The LED blinks each time you complete the circuit and a note plays, which is how you know the circuit is working.

For more freedom, clip a cable to Ground and hold its metal end. Repeat the clip step for each note, up to 16 objects. On a phone or tablet, Play plays with the touch screen. For more instruments, see the web synths at [synth.playtronica.com](https://synth.playtronica.com).

## If Playtron is not playing

Go through every step before you conclude the device is faulty. This resolves 98% of cases.

1. **Check Play.** The Device menu in Play shows **Playtron**. If it does not, choose Playtron from the menu. Then press **No sound? Check & report** at the bottom of Play (or **Options** ⚙ → **Check sound**). If it still fails, choose **Report a problem** and email us the report. Play checks your volume and Playtron separately.
2. **Use Chrome (Brave and Edge work too).** Safari and Firefox cannot receive Playtron. In those browsers, Play still plays with your keyboard and screen.
3. **Allow MIDI.** If you clicked Block by mistake, open the browser's Site Settings → MIDI, set `play.playtronica.com` to **Allow**, and reload the page.
4. **Confirm you are grounded.** See the grounding section above. This is the cause 70% of the time.
5. **Wet your hands slightly.** Wash your hands and dry them only partially, or apply hand cream. Playtron measures skin conductivity. Dry skin produces a weak signal.

Using a web synth instead of Play? Plug Playtron in first, then open the browser, because web synths scan for MIDI devices on page load. Check the MIDI dropdown in the top right of the synth at [synth.playtronica.com](https://synth.playtronica.com) and confirm Playtron is listed and selected.

## Update the firmware

Only **USB-C Playtron** devices (2026 and later) can update firmware via the web tool. Older Micro-USB devices do not support this process.

1. **Open [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron) in Chrome.**
2. **Click "Update Firmware".** If a drive called `RPI-RP2` appears on your computer, skip to step 4.
3. **Follow the on-screen instructions** to put Playtron into update mode (short the BOOT pins, plug in USB-C, release the pins after the drive appears).
4. **Upload the latest firmware.** The device reboots automatically.

For a full reset / Nuke recovery, see [Firmware reset (Nuke)](/troubleshooting/firmware-reset/).

## Test the MIDI signal with a monitor

A MIDI monitor shows whether Playtron is sending any signal. Use it when you cannot tell whether the device or the synth is the problem.

Compatible monitors:

- [MorningStar MIDI Monitor](https://www.morningstar.io/midi-monitor) — online, runs in Chrome on any operating system.
- [MIDI Monitor by Snoize](https://www.snoize.com/MIDIMonitor/) — macOS only.
- Pocket MIDI — Mac, Windows, or iOS.

Steps:

1. **Plug in Playtron first, then open MorningStar in Chrome.**
2. **Touch a note object while holding the ground.** You should see message type **Note On** and **Note Off**, MIDI channel 1, and velocity **127**. If messages appear, Playtron is working. The problem is in Play, your synth, or your browser.
3. **If Playtron does not appear in the device list**, close the browser, wait 5 seconds, reopen the browser, and reload MorningStar. Click the "Devices" button in the top right.
4. **If the device is listed but no messages appear**, open MorningStar Settings and confirm "Note On" messages are enabled. MorningStar shows all 16 notes at once even if only one is active.

## Reset Playtron (factory wipe)

Use the reset only if the firmware update will not start, or after a hardware fault.

1. **Short the BOOT pins with tweezers or a paper clip.**
2. **Plug in USB-C with the BOOT pins still shorted.**
3. **Wait for the `RPI-RP2` drive to appear on your computer, then release the pins.** The window is brief. If the drive does not appear, try again.
4. **Drag `flash_nuke.uf2` onto the `RPI-RP2` drive.** Wait for the device to reboot.
5. **Open [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron) and upload the latest firmware.**

## Works great with Playtron

Playtron ships with a USB cable and eight alligator clips. To map all 16 notes and play more surfaces, add these.

- **[10 extra alligator clips](https://shop.playtronica.com/products/10-extra-alligator-clips)** — Playtron maps up to 16 objects, but the box includes 8 clips. This set covers the rest. €9.
- **[Patches for skin and plants](https://shop.playtronica.com/products/patches-for-skin-and-plants)** — stick-on electrodes for playing skin, leaves, and awkward surfaces without clipping. From €16.
- **[Copper tape](https://shop.playtronica.com/products/copper-tape)** — turn any flat surface into a key. Stick it down, clip to it, play it. €9.
- **[Playtron + TouchMe bundle](https://shop.playtronica.com/products/playtron-touchme-bundle)** — pair Playtron with TouchMe for clip-play and touch-play together. €163.

## Related pages

- [Compare all Playtronica devices](/devices/compare/) — side-by-side spec matrix, what is in each box, software compatibility, prices.
- [Accessories and add-ons](/getting-started/accessories/) — extra alligator clips, copper tape, patches, cables, bundles.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Playtron issue #[order number]`. Attach two short videos:

- **Video 1** — the full setup: device, cables, the objects you are touching, and your computer screen with Play or the synth open.
- **Video 2** — a MIDI monitor (MorningStar) open while you interact. We need to see whether the device is sending MIDI messages.

If the device is faulty, we will send a replacement or issue a refund. We aim for 24 hours, but a reply may take up to 3 business days.
