---
title: "Playtron — deep dive"
slug: playtron-advanced
section: devices
summary: "Per-pin mapping, custom scales, performance routing, and a conductive material guide."
order: 12
segment: ["music-producer", "b2b"]
status: edited-2026-05
last_edited: 2026-05-26
emoji: 🍉
parent: playtron
hide_from_nav: true
---

> **Parent page:** [Playtron — complete guide](/devices/playtron/). Start there if you have not set up the device.

> ⚠️ **Handle only the parts shown in the [main Playtron guide](/devices/playtron/).** Touching solder joints, exposed chips, or the underside of the PCB can damage the device permanently — even when the device is unplugged.

This page is for makers and musicians who already have Playtron playing and want more control over the device.

## Custom scales and per-pin mapping

Open [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron) in Brave or Chrome. Each of the 16 alligator pins can be mapped to:

- A specific MIDI note (0–127).
- A specific MIDI channel (1–16). Useful for routing pins to different instruments in a DAW.
- A specific velocity profile — fixed value or derived from contact area.

Common presets ship in the web tool: major, minor, pentatonic, and octatonic. Custom mappings are stored on the device. You do not need to set them again on another computer.

## What materials work best

Conductivity matters more than mass. Reliable choices:

- **Wet fruit** — citrus, grapes, watermelon, banana stem. Strong signal.
- **Living plants** — succulents, monstera leaves, soft branches.
- **Water** — a glass of water is a strong key, especially with a metal clip near the surface.
- **Aluminium foil** — predictable, very conductive. Useful for installations.
- **Skin** — a friend's hand, a forearm, or a foot all work.
- **Damp paper or cloth** — wet a strip, clip it, draw on it.

Materials to avoid: dry wood, dry plastic, dry stones, paint, and painted ceramics. They look conductive but do not work.

## Three ways to ground Playtron

The ground pin is the most-misunderstood part of Playtron. Three patterns that work:

- **You are the ground.** Place bare skin on the gold ground pin. Your body completes the circuit. This is the most reliable method for solo play.
- **The room is the ground.** Clip a ground cable to a metal radiator, a metal sink, or your laptop's metal body. Useful for performances where you cannot touch the device directly.
- **The audience is the ground.** At workshops, the audience holds the ground while one person touches the object. The circuit completes through the audience.

Methods that do not work: ground clipped to dry rubber, dry wood, or painted metal.

## Route Playtron in a DAW

Playtron is a class-compliant MIDI device. In any DAW, select Playtron as a MIDI input. To split pins across different instruments:

1. In [settings.playtronica.com/#/playtron](https://settings.playtronica.com/#/playtron), set each pin to a different MIDI channel.
2. In the DAW, filter each track by the corresponding MIDI channel.

See the DAW setup pages:

- [Ableton Live](/software/ableton/)
- [Logic Pro and GarageBand](/software/logic-garageband/)
- [FL Studio and other DAWs](/software/fl-studio-and-other-daws/)

## Care for the alligator pins

Wet objects oxidise the metal over weeks of sessions. After each session, wipe the pins dry.

- **Light corrosion** — clean with a dry cotton swab.
- **Heavy corrosion** — gently rub with 1000-grit sandpaper.

See the [Playtron FAQ](/troubleshooting/playtron-faq/) for replacement guidance.

## Still want more?

If your use case is not covered here, [email support@playtronica.com](mailto:support@playtronica.com) with the subject `Playtron deep-dive suggestion`. We will add it.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com). We aim for 24 hours, but a reply may take up to 3 business days.
