---
title: "Hardware — use Playtronica with synths and sound modules"
slug: hardware
section: software
summary: "Every Playtronica device speaks class-compliant MIDI. This page covers connecting to hardware synths, drum machines, and sound modules."
order: 7
status: edited-2026-05
emoji: 📻
---

You do not need a laptop. Every Playtronica device is a standard USB MIDI controller. Anything that accepts USB MIDI input — desktop synths, sound modules, drum machines, Eurorack interfaces, OP-1, OP-Z — can be played by a Playtronica device.

> ⚠️ **Power off first.** Plug everything together before switching the power on. See the [safety page](/professionals/safety/) for general handling rules.

## The simplest path — USB host

Many modern hardware synths have a USB host port. The port is often labelled **USB A** to distinguish it from the USB B port that connects to a computer. Plug your Playtronica device into the USB host port. The synth treats the device as a MIDI input.

**Devices with USB host built in:** Korg Volca Sample 2, Roland JD-Xi, Elektron Digitakt II, Elektron Digitone II, OP-1 Field, OP-Z (with an adapter), Nord Stage 3, most Behringer Deepmind variants, and many MPC standalone units.

**Devices without USB host:** older Volcas, classic Eurorack modules, and hardware MIDI keyboards from before approximately 2018. For these, use a USB-host adapter (see below).

## USB-host adapter — when the synth has only DIN MIDI

If your synth has only a 5-pin DIN MIDI input, use a USB-host-to-DIN converter. Two reliable options:

- **Doremidi UMH-10** or similar — small, USB-powered, around €40. Plug the Playtronica device into the USB side. Plug a MIDI cable from the DIN side into your synth's MIDI input.
- **Kenton USB MIDI Host** — slightly more expensive, more flexible. Handles multiple Playtronica devices in series.

The signal path is: Playtronica device → USB-host adapter → MIDI cable → synth's MIDI input. The synth sees a regular MIDI keyboard.

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

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Hardware setup` and a description of your gear. If your setup is a common one, we will write it up as its own guide.
