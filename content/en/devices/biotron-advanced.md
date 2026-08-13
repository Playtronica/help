---
title: "Biotron Advanced — experimental MIDI control"
slug: biotron-advanced
section: devices
summary: "Firmware-derived limits for experimental Biotron MIDI CC and SysEx testing."
order: 4
segment: ["music-producer", "b2b"]
deflection_target: 10
status: edited-2026-08
last_edited: 2026-08-13
emoji: 🧬
parent: biotron
hide_from_nav: true
---

> **Parent page:** [Biotron — your plant as a MIDI instrument](/devices/biotron/). Start there for normal setup.

## Experimental status

Current firmware source contains incoming MIDI CC and SysEx handlers, but this
is not yet a supported live-performance interface. Rapid CC bursts, deferred
settings persistence, exact value semantics, and behavior on released hardware
still require physical validation. Do not build a performance or installation
around incoming automation until a tested firmware release documents it.

The former version of this page listed CC numbers, SysEx bytes, file paths, and
real-time workflows that did not match the current firmware source. Those
claims have been removed rather than presented as a specification.

## What can be tested now

- Biotron sends plant sensor CC90 on its configured plant channel in current
  source.
- Current source registers incoming CC 3, 9, 14, 15, 20–28, 30, 31, and 85–87.
- Only some incoming commands use the channel to select plant or light; other
  commands are global and ignore it.
- The current source includes device-specific SysEx handling, but users should
  not construct messages from undocumented examples.

See [Biotron MIDI CC](/software/biotron-midi-cc/) for the source-derived CC
test map, scope labels, Reaper routing, and current limitations.

## Before a firmware-level test

Record the Biotron hardware revision, firmware filename and hash, operating
system, DAW version, MIDI channel, CC number/value, and the observed result.
Keep the settings website closed while the DAW owns the MIDI port. A result on
one unit is not evidence that multiple identical units can be selected reliably.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject
`Biotron Advanced #[order number]` and include the test details above. Firmware
source: [Playtronica/biotron-firmware](https://github.com/Playtronica/biotron-firmware).
We aim for 24 hours, but a reply may take up to 3 business days.
