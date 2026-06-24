---
title: "Biotron MIDI: CC mapping, iPad setup, and powering synths over TRS"
slug: biotron-midi-cc
section: software
summary: "How Biotron sends MIDI (note-on/off and CC90), how to configure it on a desktop browser, how to use it with iPad and GarageBand, and how to power it when connecting to a synth via TRS."
segment: ["music-producer", "creator"]
deflection_target: 25
status: new-2026-06
last_edited: 2026-06-20
emoji: 🎹
---

# Biotron MIDI: CC mapping, iPad setup, and powering synths over TRS

Biotron sends MIDI over USB. By default it sends note-on and note-off
messages when it detects a signal from your plant or cables. It also sends
**CC90** — a continuous controller message that reflects signal intensity.
This article covers what CC90 is, how to switch between note and CC output,
iPad + GarageBand setup, and how to power Biotron when you connect it to a
hardware synth over TRS.

---

## What CC90 means

When Biotron detects a signal, it sends two things at once:

- **Note-on / note-off** — a standard MIDI note (pitch + velocity) for
  triggering synths, samplers, and DAWs that respond to notes.
- **CC90** — a continuous controller on the same channel, ranging from 0 to
  127. It reflects how strong the detected signal is.

CC90 is not documented on the product page. That is a known gap — we get
questions about it regularly. The short answer: CC90 is useful when you want
smooth, continuous modulation (filter cutoff, reverb amount, expression)
instead of discrete note triggers.

> **Example in Ableton Live:** create a MIDI track, open the MIDI Map mode,
> click a macro knob, then touch your plant. Biotron's CC90 will be detected
> and mapped automatically.

---

## Switch between note output and CC output

By default Biotron sends both note-on/off and CC90 simultaneously. If your
DAW or synth only needs one of them, mute the other in the settings page.

**Steps:**

1. Connect Biotron to a laptop or desktop via USB.
2. Open **settings.playtronica.com/#/biotron** in Google Chrome or Edge.
3. Select your Biotron from the device dropdown.
4. In the channel settings, mute **Notes** if you only want CC output,
   or mute **CC** if you only want note-on/off.
5. Click **Send to Device**.

> The mute setting is stored on the device. It persists after you unplug.

---

## The settings page only works on desktop

If you open settings.playtronica.com on an iPad or iPhone, you will see a
message that it only works on a computer. This is a browser limitation — the
Web MIDI API that the settings page uses is not supported on mobile browsers
or Safari.

**The settings page requires:**
- A laptop or desktop computer (Windows or macOS)
- Google Chrome or Microsoft Edge (not Safari, not Firefox)
- A direct USB connection (avoid USB hubs if possible)

You cannot change Biotron's settings from an iPad. If an iPad is your only
device, ask someone with a laptop to connect Biotron once and apply the
settings — the configuration stays on the device.

---

## Using Biotron with iPad and GarageBand

You can play Biotron from an iPad even though you cannot change settings from
one. GarageBand on iPad receives MIDI over USB natively.

**What you need:**
- Apple Lightning-to-USB Camera Adapter (older iPads) or USB-C hub (newer iPads)
- The Biotron's USB cable

**Steps:**

1. Connect the USB adapter to your iPad.
2. Plug Biotron into the USB adapter.
3. Open GarageBand on your iPad.
4. Choose an instrument (e.g. keyboard, sampler).
5. Touch your plant or conductive object. Biotron will trigger notes inside
   GarageBand.

GarageBand does not display MIDI channels or CC values. It simply plays the
instrument assigned to the current track. If you hear nothing, check that
GarageBand's track is set to receive MIDI from external sources — tap the
track, tap the plug icon, and make sure **MIDI input** is enabled.

> If Biotron lights up but produces no sound, the notes channel may be muted.
> You will need to borrow a laptop to open settings.playtronica.com and
> re-enable notes.

---

## Powering Biotron when using TRS MIDI

Biotron connects to most DAWs and computers over USB, which provides both
data and power. When you connect Biotron to a hardware synthesizer using a
**TRS MIDI cable** (3.5 mm stereo jack to standard 5-pin DIN), the synth
receives MIDI data — but the TRS cable carries no power.

This means **Biotron will not turn on** using a TRS cable alone.

**Solution: power Biotron separately over USB while sending MIDI via TRS.**

You need a USB power source that does not also try to send MIDI data. Any of
these work:

- A USB wall adapter (5 V, any current rating)
- A USB battery pack
- A powered USB hub (use a separate port from the TRS adapter)

**Setup:**

1. Plug the TRS MIDI cable into Biotron's TRS port.
2. Plug the other end into your synth's MIDI In.
3. Plug a USB power cable into Biotron's USB port.
4. Connect the USB cable to a wall adapter or battery pack — **not** to your
   computer. Connecting to a computer at the same time will route MIDI over
   USB instead of TRS.
5. Power on everything. Biotron's LED will light. Touch your plant. Your
   synth should receive the note-on messages.

> If your synth still receives no MIDI, check whether it expects **TRS Type A**
> or **TRS Type B**. Biotron uses **Type A** (compatible with Arturia
> MiniLab, Teenage Engineering OP-1, most modern gear). If your synth uses
> Type B, you need a Type A–to–Type B adapter.

---

## Quick self-test

Press the fingerprint button on Biotron. The device sends a short burst of
MIDI notes on channel 2. If your DAW or MIDI monitor shows those notes, the
device is working and the problem is in your connection or DAW routing — not
the hardware.

---

## Still stuck?

Email **support@playtronica.com** with:
- A short video showing the full connection and what happens when you touch the plant
- Your operating system and DAW name
- Whether the self-test (fingerprint button) produces notes in your MIDI monitor

We aim for 24 hours, but a reply may take up to 3 business days.
