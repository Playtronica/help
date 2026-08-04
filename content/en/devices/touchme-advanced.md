---
title: "TouchMe — deep dive"
slug: touchme-advanced
section: devices
summary: "MIDI output, scale presets, hardware tuning, and performance tips."
order: 11
segment: ["music-producer", "b2b"]
deflection_target: 10
status: edited-2026-08
last_edited: 2026-08-04
emoji: 👐
parent: touchme
hide_from_nav: true
---

> **Parent page:** [TouchMe — complete guide](/devices/touchme/). Start there if you have not set up the device.

> ⚠️ **Handle only the parts shown in the [main TouchMe guide](/devices/touchme/).** Touching solder joints, exposed chips, or the underside of the PCB can damage the device permanently — even when the device is unplugged.

This page is for musicians and developers who already have TouchMe playing and want more control over the device.

## Scales and tunings

TouchMe ships tuned to C major, playing notes from C3 to C6. You can change the scale in two ways: with the **SCALE** and **KEY** touch rings on the back of the device, or at [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme) (open in Chrome).

There are 12 scale presets: major, natural minor, chromatic, Dorian, Mixolydian, Lydian, whole tone, minor and major blues, minor and major pentatonic, and diminished. The full preset table — with the notes each scale plays — is on the [tuning page](/devices/touchme-tuning/).

After picking a preset, click **Send** to push the mapping to the device. The choice is stored on the device. You do not need to set it again on another computer.

## MIDI output

TouchMe sends on MIDI channel 1 by default. You can change the channel (1–16) on the settings page. A touch produces:

- **Note On / Note Off** — the note depends on the scale, the key, and how much skin touches the pads. Light contact plays low notes. More contact plays higher notes.
- **Velocity** — fixed at 127 by default. Set a minimum and a maximum and turn on **Humanize** to get a random velocity inside that range for each note.
- **CC 90** — touch intensity (0–127), sent with each new note. Map it to filter cutoff or effect depth for expressive control.

To play notes outside the built-in scales, set a custom note range (lowest and highest note, 0–127) on the settings page, or remap incoming notes in your DAW.

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
