---
title: "Hardware — use Playtronica with synths and sound modules"
slug: hardware
section: software
summary: "Every Playtronica device speaks class-compliant MIDI. This page covers connecting to hardware synths, drum machines, and sound modules."
order: 7
segment: ["music-producer"]
deflection_target: 20
status: edited-2026-06
last_edited: 2026-06-24
emoji: 📻
---

You do not need a laptop. Every Playtronica device is a standard USB MIDI controller. Anything that accepts USB MIDI input — desktop synths, sound modules, drum machines, Eurorack interfaces, OP-1, OP-Z — can be played by a Playtronica device.

> ⚠️ **Power off first.** Plug everything together before switching the power on. See the [safety page](/professionals/safety/) for general handling rules.

## The simplest path — USB host

Many modern hardware synths have a USB host port. The port is often labelled **USB A** to distinguish it from the USB B port that connects to a computer. Plug your Playtronica device into the USB host port. The synth treats the device as a MIDI input.

**Devices with USB host built in:** Korg Volca Sample 2, Roland JD-Xi, Elektron Digitakt II, Elektron Digitone II, OP-1 Field, OP-Z (with an adapter), Nord Stage 3, most Behringer Deepmind variants, and many MPC standalone units.

**Devices without USB host:** older Volcas, classic Eurorack modules, and hardware MIDI keyboards from before approximately 2018. For these, use a USB-host adapter (see below).

## USB-host adapter — when the synth has only DIN MIDI

If your synth has only a 5-pin DIN MIDI input, use a USB-host-to-DIN converter. Reliable options:

- **Doremidi UMH-10** or similar — small, USB-powered, around €40. Plug the Playtronica device into the USB side. Plug a MIDI cable from the DIN side into your synth's MIDI input.
- **Kenton USB MIDI Host** — slightly more expensive, more flexible. Handles multiple Playtronica devices in series.

The signal path is: Playtronica device → USB-host adapter → MIDI cable → synth's MIDI input. The synth sees a regular MIDI keyboard.

## No computer at all — the CME H4MIDI WC

The adapters above get a Playtronica device into a DIN synth. The **[CME H4MIDI WC](https://www.cme-pro.com/h4midi-wc-usb-host-midi-interface/)** (around $53 / €50) does the same job in one small standalone box, and adds routing, filtering and channel remapping. A Playtronica community member confirmed it works **device-to-device, with no computer or DAW**.

How it connects:

- **USB-A host port** — plug your Playtronica device in here. The port powers it (up to 1 A) *and* reads its MIDI, so no laptop is involved.
- **5-pin DIN out** — carries that MIDI straight to a hardware synth, drum machine or groovebox: a Digitakt, a classic Volca, or anything with a DIN MIDI input.
- **USB-C port** — only needed to configure the box or connect a computer or iPad with the free HxMIDI Tools app (4 presets, plus router, filter and mapper). Ignore it for pure device-to-device use.
- **Standalone power** — runs off any 5 V USB source or a 9 V DC adapter, so it works on a pedalboard with nothing else attached. Optional Bluetooth MIDI is available through the WIDI Core add-on.

**Worked example — TouchMe → Digitakt, no computer:**
TouchMe → USB-C-to-USB-A cable → H4MIDI WC (USB-A host port) → 5-pin MIDI cable → Digitakt's MIDI IN. Power the H4MIDI from any phone charger or USB battery, and set the Digitakt to receive on MIDI channel 1 (TouchMe's default). The same chain feeds an OP-Z or any other groovebox — for gear that uses TRS MIDI instead of DIN, such as the **Dirtywave M8**, add a DIN-to-TRS adapter on the output.

## TRS MIDI (the Scales path)

[Scales](/devices/scales/) has a TRS MIDI output (a 3.5 mm jack) in addition to USB-C. If your hardware uses TRS MIDI — most modern compact synths use the MIDI Manufacturers Association's **Type A** pinout (OP-Z, Korg's pocket range, most Eurorack MIDI-to-CV modules) — connect with a TRS-to-TRS or TRS-to-DIN cable.

If your hardware uses the older **Type B** pinout, you will need an adapter. Adapters exist. Check your synth's manual first.

## Eurorack and CV/Gate

Playtronica devices output MIDI, not CV. To play a Eurorack rig, use a MIDI-to-CV/Gate interface:

- **Befaco Voltio**, **Doepfer MCV4**, **Korg SQ-64**, **Polyend Poly 2** — all accept MIDI over USB host or DIN, and output CV plus gate.
- Plug the Playtronica device into the interface's USB host port, or use a USB-host adapter for DIN. Patch the CV and Gate outputs to your oscillator and envelope.
- Playtron's 16 alligator pins all send on MIDI channel 1 by default. To split them across multiple voices, set per-pin channels at [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron).

## Combinations we have seen work well

- **TouchMe + OP-1 Field** — a workshop classic. TouchMe's two-person play feeds the OP-1 sampler.
- **Playtron + Volca Sample** — fruit as drum pads. Map each alligator wire to a different sample.
- **Biotron + OP-Z** — the plant drives an arpeggio. The OP-Z sequences it with its built-in tracks for a generative piece.
- **Orbita + Eurorack** — Orbita as a melodic source feeding a quantizer, then into your modular voices.
- **Scales + any synth** — weight as pitch is a strong on-stage gesture. It works especially well with brass-like presets.

## Troubleshooting

> **The synth does not see the Playtronica device.** Check the synth's MIDI input settings. Some synths require you to enable USB-host MIDI explicitly. Confirm you are using the USB **host** port, not the USB device port.

> **The notes play in the wrong octave.** Playtronica devices default to MIDI note 48 (C3) and up. Your synth might be set to a different octave. Shift the octave on the synth, not on the Playtronica device.

> **Notes get stuck.** Send an "All Notes Off" message from the synth, or power-cycle the synth. Some hardware does not handle a class-compliant device disconnecting cleanly.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Hardware setup` and a description of your gear. If your setup is a common one, we will write it up as its own guide. We aim for 24 hours, but a reply may take up to 3 business days.
