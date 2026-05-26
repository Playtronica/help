---
title: "Scales — the weight-to-MIDI instrument"
slug: scales
section: devices
summary: "Place objects on the plate. Heavier objects play higher notes. Five modes turn the same gesture into melodies, drones, and arpeggios."
order: 6
segment: ["music-producer", "creator"]
status: edited-2026-05
last_edited: 2026-05-26
emoji: ⚖️
---

Scales is a weight-to-MIDI device. Put an object on the plate. The heavier the object, the higher the note. Light objects play low pitches. Heavy objects play high pitches.

Five modes use the same gesture in different ways — a chord, an arpeggio, a drone, a tempo controller, or a tuning pad. Objects up to **3 kg** work on the plate.

> ⚠️ **Handle only the parts shown in this guide.** Touch the weight plate, the three buttons, the TRS MIDI output, and the USB-C connector. Do not touch the solder joints, the exposed chips, or the underside of the PCB — even when the device is unplugged. Scales is durable, but those areas can be damaged permanently. Treat the rest of the device the way you would treat the back of a phone screen.

> 🛠️ **Note for power users.** The full MIDI map, chaining details, and per-mode CC are below. Scales rewards exploration more than most instruments.

## Quick start

1. **Plug Scales into your laptop, tablet, or phone** with a USB cable (not included — use any USB-C data cable). Or connect Scales to a hardware synth with a TRS MIDI cable.
2. **Open a web synth or your DAW.** [synth.playtronica.com](https://synth.playtronica.com) works in Brave or Chrome. Ableton, Logic, and FL Studio see Scales as a MIDI input.
3. **Place an object on the plate.** Any object up to 3 kg works — a piece of fruit, a glass of water, a stone, a coin, a phone. The note number tracks the weight.
4. **Move, swap, or stack the objects.** Rearranging the objects changes the notes.

> ℹ️ **How Scales differs from TouchMe, Playtron, and Biotron.** TouchMe, Playtron, and Biotron read electrical conductivity. Scales reads physical weight on a load cell. The musical idea is the same; the sensing is completely different.

## The five modes

The current mode is shown by the row of five LEDs. The yellow LED is the active mode. Long-press the **+** button to cycle.

### Mode 1 — Hold 🟡⚪⚪⚪⚪

- Short-press **+** to add a note to the held chord. Up to 127 notes.
- Notes are saved when you switch modes. They play again when you return to Mode 1.

### Mode 2 — Arpeggio ⚪🟡⚪⚪⚪

- Short-press **+** to add a note to the sequence.
- The sequence must start with a note. Lift the object off the plate to add a rest.
- The sequence is shared with Mode 5 (BPM).

### Mode 3 — Pitch ⚪⚪🟡⚪⚪

- Notes are pitch-bent with MIDI Pitch Bend (BND).
- Use lightly. A single object on the plate gives the cleanest bend.

### Mode 4 — Sensitivity ⚪⚪⚪🟡⚪

- Short-press **+** to cycle the weight range: **250 g**, **500 g**, **1 kg**, **1.5 kg**, **2 kg**.
- A smaller range gives finer pitch resolution within that range.

### Mode 5 — BPM ⚪⚪⚪⚪🟡

- Weight controls the tempo of the Mode 2 arpeggio.
- Short-press **+** to lock the current BPM.

## Button reference

### O button

- **Long press** — calibrate the empty plate to zero. Do this with no object on the plate.
- **Short press** — reset the sequence in Mode 1 or Mode 2.

### + button

- **Long press** — switch mode.
- **Short press** — context-sensitive. See each mode above.

### II button (mute)

- **First press** — mute. Only CC90 messages are sent. The LED is on.
- **Second press** — unmute. The LED is off.

## Chain multiple devices with the magnetic ports

Scales has magnetic ports for connecting to other Playtronica devices.

Rules:

- **Connect on the right side only.** The arrows on the device show the flow direction.
- Up to **16 devices** can be chained.
- Each device uses its own MIDI channel.
- One power source can drive up to **4 devices**. For more than 4 devices in a chain, plug a second power source in partway along the chain.

## Web settings

Open [settings.playtronica.com/#/scales](https://settings.playtronica.com/#/scales) in Brave or Chrome. The web page lets you tune sensitivity curves, set custom scale mappings, and update the firmware.

## Technical specifications

| Item | Value |
|---|---|
| Power | 5 V over USB-C |
| MIDI output | USB-C and TRS (3.5 mm) |
| Magnetic port connector | 6-pin |
| Maximum load | 3 kg |
| Processor | RP2040 |

## Troubleshooting

> **No sound from the synth.** Confirm you are in Brave or Chrome. Confirm MIDI permission is allowed. Confirm the LED on Scales lights up when you plug in.

> **The pitch jumps wildly.** You are probably in Mode 4 (Sensitivity). Change the weight range to match the weight of the object on the plate.

> **No tempo response in Mode 5.** Confirm that Mode 2 has notes in its sequence. Mode 5 plays back the Mode 2 sequence. An empty sequence has nothing to drive.

> **Notes do not save.** Long-press the **O** button to zero the plate. Most stuck states clear after a calibration.

## Related pages

- [Compare all Playtronica devices](/devices/compare/) — side-by-side spec matrix, what Scales senses vs the other four devices.
- [Accessories and add-ons](/getting-started/accessories/) — USB-C cables (Scales ships without one), patches, copper tape.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Scales issue #[order number]` and a 30-second video of your setup. We aim for 24 hours, but a reply may take up to 3 business days.
