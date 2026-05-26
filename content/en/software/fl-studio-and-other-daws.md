---
title: "FL Studio and other DAWs"
slug: fl-studio-and-other-daws
section: software
summary: "Setup steps for FL Studio, Reaper, Cubase, Studio One, Bitwig, and Reason."
order: 5
segment: ["music-producer"]
deflection_target: 25
status: edited-2026-05
last_edited: 2026-05-26
emoji: 🖥️
---

Any DAW that accepts MIDI input works with Playtronica devices. Look for "MIDI Input" or "MIDI Controller" settings and enable the Playtronica device there. The most common DAW setups are below.

## FL Studio

1. **Plug in the device and open FL Studio.**
2. **Open Options → MIDI Settings.** In the Input section, find your Playtronica device. Click the power icon next to it to enable it.
3. **Add a plugin instrument to the Channel Rack.** Right-click the Channel Rack → Add → choose any synth plugin.
4. **Touch the device.** The plugin receives MIDI from your device.

## Reaper

1. Open Options → Preferences → Audio → MIDI Devices.
2. Enable your Playtronica device as a MIDI input.
3. Add a track with a VST instrument. The track receives MIDI automatically.

## Bitwig

1. Open Settings → Controllers → Add Controller → Generic MIDI.
2. Bitwig auto-detects class-compliant MIDI devices. Your Playtronica device should appear immediately.

## Reason

1. Open Preferences → MIDI.
2. Add your Playtronica device as a Master Keyboard input.
3. Create a Combinator or instrument track to receive notes.

## Related pages

- [Ableton Live setup](/software/ableton/) — the most-asked-for DAW path.
- [Logic and GarageBand](/software/logic-garageband/) — for Mac users.
- [Won't connect](/troubleshooting/wont-connect/) — if the DAW does not see the device.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `DAW setup #[order number]`, the DAW name, and a screenshot of your MIDI settings. We aim for 24 hours, but a reply may take up to 3 business days.
