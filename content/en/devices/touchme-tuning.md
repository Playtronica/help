---
title: "TouchMe — tuning"
slug: touchme-tuning
section: devices
summary: "Pick a scale, pick a key, save it to the device. Settings sync over the browser."
order: 14
segment: ["music-producer"]
deflection_target: 15
status: edited-2026-05
last_edited: 2026-05-26
emoji: 🎼
parent: touchme
hide_from_nav: true
---

> **Parent page:** [TouchMe — complete guide](/devices/touchme/). Start there if you have not done the first-time setup.

TouchMe ships with a chromatic scale that starts at MIDI note 48. A chromatic scale is flexible but unforgiving — every touch plays a different note, and many combinations sound harsh. The web settings page lets you pick a scale that is easier to play.

## Open the tuning page

1. Plug TouchMe into your computer.
2. Open [settings.playtronica.com/#/touchme](https://settings.playtronica.com/#/touchme) in Brave or Chrome.
3. Click **Allow** on the MIDI permission prompt.

If your device does not appear in the device dropdown, close the tab, plug in the device, and open a new tab. The browser scans for MIDI devices when the page loads.

## Pick a scale

A scale is a set of notes that work together. The settings page has these presets:

- **Major** — bright, predictable, classic. Good for tutorials and demos.
- **Natural minor** — moodier, still familiar.
- **Pentatonic (major)** — only 5 notes per octave. Every touch sounds intentional. **Best choice for first-time players.**
- **Pentatonic (minor)** — same forgiveness, darker mood.
- **Phrygian, Dorian, Mixolydian** — modal scales for specific musical contexts. Phrygian fits flamenco. Dorian fits jazz. Mixolydian fits blues.
- **Whole tone** — every step is a major second. Eerie and dreamlike.
- **Chromatic** — every semitone. The default. Maximum flexibility, hardest to play.
- **Custom** — set each of the eight pads independently.

## Pick a key

Within a scale, you can shift the root note. C major and G major use different notes but have the same melodic feel. The key dropdown shifts everything up or down without changing the scale.

A reasonable starting point: **C pentatonic major**. Easy on the ear and fits most synths in our online library.

## Save the choice

Click **Send** to push the mapping to TouchMe. The choice is stored on the device. When you plug TouchMe into a different computer tomorrow, the scale is still there. You do not need to set it again.

## Per-pad mapping (advanced)

In Custom mode, you can set each of the eight pads to any MIDI note (0–127) and any MIDI channel (1–16). Useful for:

- **Drum pads** — map each pad to a different drum sample.
- **Multi-instrument setups** — odd-numbered pads to a synth, even-numbered pads to a sampler.
- **Velocity behaviour** — set pads to fixed velocity or pressure-derived velocity. Fixed velocity is predictable for live performance. Pressure-derived velocity is more expressive.

For deep-dive options like CC routing and performance setups, see [TouchMe deep dive](/devices/touchme-advanced/).

## If the page does not see the device

- **Use the right browser.** Brave or Chrome only. Safari and Firefox do not support Web MIDI.
- **Plug in the device first, then open the page.** Not the other way around.
- **Check MIDI permission.** If you clicked Block on the MIDI prompt earlier, the browser remembers. Open browser settings → Site Settings → MIDI → find `settings.playtronica.com` → set to **Allow**.
- **If nothing works**, see the [firmware reset guide](/troubleshooting/firmware-reset/). The Nuke recovery brings the device back to a known state.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `TouchMe tuning` and a screenshot of the settings page. We aim for 24 hours, but a reply may take up to 3 business days.
