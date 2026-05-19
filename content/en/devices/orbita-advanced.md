---
title: "Orbita — deep dive"
slug: orbita-advanced
section: devices
summary: "Note-mapping JSON, encoder and button MIDI CC, sync, and firmware tricks."
order: 13
status: edited-2026-05
emoji: 🌀
parent: orbita
hide_from_nav: true
---

> **Parent page:** [Orbita — rotating MIDI sequencer](/devices/orbita/). Start there if you have not set up the device.

> ⚠️ **Handle only the parts shown in the [main Orbita guide](/devices/orbita/).** Touching solder joints, exposed chips, or the underside of the PCB can damage the device permanently — even when the device is unplugged.

This page is for power users — DAW-heavy producers, installation artists, and custom-firmware developers.

## Note-mapping JSON

Orbita's mapping (which note plays at each step) is editable in the WebMidiOrbita configurator at [playtronica.github.io/WebMidiOrbita](https://playtronica.github.io/WebMidiOrbita/). The configurator lets you:

- Change the note for each step (each petal position).
- Set per-step velocity, length, and probability.
- Save and load presets as `.json` files.

Open the file in any text editor to see the underlying structure. You can use it to script preset changes.

## Encoder and button MIDI CC

The central rotary encoder and the side buttons send their own MIDI CC messages separately from the sequencer. Map them in a DAW to control synth parameters, transport (play and pause), or scene changes. The default mapping is documented in the configurator.

## Sync to an external clock

Orbita can sync to incoming MIDI clock. Set the source clock to your DAW's transport. The motor speed follows tempo changes within reason. Tempo jumps larger than 10 BPM may need a manual restart.

## Firmware

The firmware update flow is the same as for TouchMe, Playtron, and Biotron. The web settings page is at [settings.playtronica.com](https://settings.playtronica.com).

If the device is unresponsive, follow the [Firmware reset guide](/troubleshooting/firmware-reset/). The BOOT-pin and `flash_nuke.uf2` flow applies.

## Performance tips

- **Two Orbitas, one DAW.** Sync both to the same MIDI clock. Use different mappings on each device to layer patterns.
- **Motor speed as expression.** Map a foot pedal to the motor-speed CC for live tempo bending.
- **Quieter rotation.** The motor is audible at close range. For installations, place Orbita on a soft material (felt or a rubber mat) to dampen the sound.

## Still want more?

This deep-dive page is a starting point. If your use case is not covered — installations, custom sync, multi-Orbita setups — [email support@playtronica.com](mailto:support@playtronica.com) with the subject `Orbita deep-dive suggestion`. We will add it.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there, what to email instead, and where to find the WhatsApp regional groups.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com). We aim for 24 hours, but a reply may take up to 3 business days.
