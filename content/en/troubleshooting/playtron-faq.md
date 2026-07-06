---
title: "Playtron — common issues and fixes"
slug: playtron-faq
section: troubleshooting
summary: "Common Playtron problems — pin corrosion, USB, missing MIDI signal, weak grounding."
order: 4
segment: ["music-producer"]
deflection_target: 40
status: edited-2026-05
last_edited: 2026-07-06
emoji: 🍉
---

## The pins are corroded

Pin corrosion is the most common physical issue with Playtron. Acidic or wet objects — especially citrus — cause the metal pins to oxidise.

- **Light corrosion** — clean the pins with a dry cotton swab. For stubborn spots, gently rub with very fine (1000-grit) sandpaper. Wipe off any residue.
- **Heavy corrosion** — [email support@playtronica.com](mailto:support@playtronica.com) with the subject `Playtron pin corrosion #[order number]` and a clear photo. We will advise on cleaning or arrange a replacement.

**Prevention:** wipe the pins and the clip ends dry after every session with acidic or wet objects. Store the device in the pouch if you have one.

## The LED stays on but nothing plays

This is almost always a grounding problem. Two things to check:

- Your bare skin is touching the **pointed corner** of the device — that sharp corner is the ground. There must be no clothing or material between your skin and the corner.
- Or a ground cable is clipped to a real ground — a metal radiator, a metal sink, or your laptop's metal body.

If grounding is correct, unplug the USB cable and reconnect it.

## MIDI is not detected in my DAW

Playtron is a class-compliant MIDI device. Check the following:

1. The device appears in your operating system's MIDI list — Audio MIDI Setup on macOS, Device Manager on Windows.
2. Your DAW's MIDI preferences have Playtron enabled as an input.
3. A track in the DAW is armed to receive MIDI.

See the full DAW guides: [FL Studio and other DAWs](/software/fl-studio-and-other-daws/), [Ableton Live](/software/ableton/), [Logic Pro and GarageBand](/software/logic-garageband/).

## Old Playtron not detected at all on a new Mac

If your Micro-USB Playtron powers on and blinks on touch, but a recent Apple-silicon Mac shows **nothing** in Audio MIDI Setup even with a good data cable, it usually needs a **real USB hub** between the device and the Mac (not a passive adapter).

Full steps, hub models and the decision table: **[Device will not connect → Old Micro-USB device on a new Mac](/troubleshooting/wont-connect/)**.

## Objects barely trigger, or the response is inconsistent

The cause is one of three:

- **Grounding is too weak.** Your bare skin is not touching the pointed corner of the device, or your ground cable is not on a real ground (metal radiator, sink, or laptop body). See [Grounding — how and why](/sound/grounding/).
- **The object is too dry.** Dry fruit and dead plants give weak signals. Add moisture, or use a different object.
- **The clip contact is poor.** Reposition the alligator clip so the metal teeth grip the object firmly.

## How do I reset Playtron to factory settings?

1. Unplug the USB cable.
2. Hold the small side button on the device.
3. With the button held, plug the USB cable back in.
4. Keep holding the button for 3 seconds.

The LED flashes to confirm the reset. For a full firmware wipe, see [Firmware reset (Nuke)](/troubleshooting/firmware-reset/).

## Sensitivity is low for the first 30 seconds

Some users notice reduced sensitivity immediately after plugging in. The signal improves after **30 to 60 seconds**. This is normal — the circuit reaches stable operating temperature quickly.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Playtron issue #[order number]`. We aim for 24 hours, but a reply may take up to 3 business days.
