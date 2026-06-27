---
title: "TouchMe — deep dive"
slug: touchme-advanced
section: devices
summary: "MIDI mapping, custom scales, hardware tuning, and performance tips."
order: 11
segment: ["music-producer", "b2b"]
deflection_target: 10
status: edited-2026-05
last_edited: 2026-05-26
emoji: 👐
parent: touchme
hide_from_nav: true
---

> **Parent page:** [TouchMe — complete guide](/devices/touchme/). Start there if you have not set up the device.

> ⚠️ **Handle only the parts shown in the [main TouchMe guide](/devices/touchme/).** Touching solder joints, exposed chips, or the underside of the PCB can damage the device permanently — even when the device is unplugged.

This page is for musicians and developers who already have TouchMe playing and want more control over the device.

## Custom scales and tunings

TouchMe ships with a default chromatic-scale mapping. You can change the scale at [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme) (open in Chrome).

Common presets:

- **Major and minor** — for predictable melodic playing.
- **Pentatonic** — every touch sounds good. Useful for live demos.
- **Chromatic** — the full keyboard range. Requires more skill.
- **Custom** — pick the MIDI note for each gold pad.

After picking a preset, click **Send** to push the mapping to the device. The choice is stored on the device. You do not need to set it again on another computer.

## Per-pad MIDI mapping

Each TouchMe pad sends a Note On message on MIDI channel 1 by default. In the web settings you can change:

- **Channel** per pad (1–16). Useful for routing pads to different instruments in a DAW.
- **Note number** (0–127). Overrides the default scale.
- **Velocity** — a fixed value or derived from pressure. Pressure-derived velocity is the natural choice for expressive playing.

## Use TouchMe in a DAW

TouchMe is a class-compliant MIDI device. No drivers are needed. Select TouchMe as a MIDI input in your DAW, arm a track to record, and play.

See the DAW setup pages:

- [Ableton Live setup](/software/ableton/)
- [Logic Pro and GarageBand](/software/logic-garageband/)
- [FL Studio and other DAWs](/software/fl-studio-and-other-daws/)

## Performance tips

- **Two players, one TouchMe.** Each player holds one gold pad. Touch the other player on bare skin. The circuit completes through both bodies. This is the workshop demo that gets the loudest reaction.
- **Increase room humidity** if the pads feel less responsive. Dry skin and dry air both reduce the signal.
- **Clean the gold pads** with a dry cotton cloth after sessions. Skin oil dampens conductivity over weeks of use.

## Firmware

Update the firmware at [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme) in Chrome. The full firmware update flow and the Nuke recovery procedure are on the [main guide](/devices/touchme/) and the [Firmware reset page](/troubleshooting/firmware-reset/).

## Want more?

We expand this deep-dive page based on real questions. If you have a use case that is not covered, [email support@playtronica.com](mailto:support@playtronica.com) with the subject `TouchMe deep-dive suggestion`. We will add it.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com). We aim for 24 hours, but a reply may take up to 3 business days.
