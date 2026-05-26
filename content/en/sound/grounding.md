---
title: "Grounding — how and why"
slug: grounding
section: sound
summary: "Why Playtron needs you to be grounded, and four ways to ground yourself. A short physics explanation for anyone curious."
order: 1
segment: ["music-producer"]
status: edited-2026-05
last_edited: 2026-05-26
emoji: 💡
---

This page is mainly for Playtron. Grounding matters daily for Playtron. TouchMe and Biotron handle grounding in their own way (see the notes at the end). Scales does not use grounding.

## What grounded means here

When you play Playtron, you become part of the circuit. A tiny current flows from the device, through the alligator clip, through the object you touch, through your body, and back to ground. The device measures whether the loop completed.

- **No completed loop** — no note.
- **Completed loop** — a note plays.

The loop needs to end at a stable reference point called "ground". Your body alone, floating in the air, is not enough. The device needs a clear zero point to recognise everything else.

> ⚠️ **Playtron uses low-voltage USB power.** The current is harmless. You will not feel anything beyond what you feel touching any USB-powered device.

## Four ways to ground yourself

Listed from most reliable to least. All four work.

### 1. Bare skin on the gold ground pin

The gold pin in the corner of Playtron is the ground reference. Touch it with bare skin — a finger, a palm, the side of your hand. This is the simplest and most reliable method. No accessories required.

### 2. Ground cable to a metal radiator, sink, or pipe

Clip one alligator cable to the ground pin on Playtron. Clip the other end to a real ground — a metal radiator, a metal sink, or a copper pipe. Real ground here means a metal object connected to the earth. This is the method used in installations where the player cannot touch the device.

### 3. Ground cable to your laptop's metal body

Most laptops have a USB ground that connects through the chassis. Clip the ground cable to a screw on the underside or to a port frame. This is less reliable than option 2 but useful when nothing else is nearby.

### 4. Two-person ground

Hand the ground pin to a friend. The friend holds it with bare skin. You touch the friend through a high-five, a hand-hold, or an elbow. The circuit completes through both bodies. This is the most common workshop demonstration.

## What does not work as ground

- **Painted metal.** Paint is an insulator.
- **Dry wood, dry plastic, or dry stone.**
- **Rubber, silicone, or anodised aluminium.**
- **A floor with rubber soles between you and it.**

If grounding is weak, the symptoms are: notes only fire on some objects, notes fire intermittently, or notes need very firm contact. Switch to a stronger ground (option 1 or 2 above) and the problem usually clears.

## TouchMe, Biotron, and Scales

- **TouchMe** uses its two gold pads as opposite ends of the circuit. You complete the loop by holding both pads at once. There is no separate ground pin — your hands do the work.
- **Biotron** measures the bio-electrical signal of the plant. The plant is the source. Your body is not in the circuit unless you touch a leaf to change the signal.
- **Scales** measures weight on a load cell. There is no conductive circuit involved.

## The physics (optional reading)

If you do not need the technical details, you can stop here. The four methods above are all you need.

Playtron uses **capacitive sensing**. Each alligator-clip input is monitored for tiny changes in the local electric field, called capacitance. Your body has a measurable capacitance to the surrounding environment — a few hundred picofarads on a normal day. When you touch a connected object, your capacitance becomes part of the circuit's total capacitance, and the device measures the change.

For the device to detect that change, it needs a stable reference — a ground against which to measure. If both you and the device are floating relative to ground, the measurement is noisy. If one of you is connected to a clean reference (the gold pin, or a real ground), the noise drops and the notes fire reliably.

This is the same physics behind touchscreens. Your phone detects a capacitance change at the spot you touch. The difference is that your phone has a built-in ground reference (its own enclosure), so it does not need you to do anything. Playtron is deliberately bare and exposed and asks you to be part of the circuit.

The current involved is **picoamps** — billionths of an amp. There is no risk from this current.

## Troubleshooting

> **Notes fire weakly or only sometimes.** Use bare skin on the gold pin instead of a ground cable.

> **Some objects play, others do not.** The objects that do not play are weak conductors. Try wetting them, or use more contact area. See [Objects you can play](/sound/objects-you-can-play/).

> **Nothing plays at all.** Confirm that USB is firmly connected, the LED is on, you are using Brave or Chrome, and MIDI permission is allowed. See [No sound or MIDI not detected](/troubleshooting/no-sound/).

> **Live performance setup.** See the [Playtron deep dive](/devices/playtron-advanced/) for stage-tested grounding patterns.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Grounding issue` and a short description of what you are doing and what is happening. We aim for 24 hours, but a reply may take up to 3 business days.
