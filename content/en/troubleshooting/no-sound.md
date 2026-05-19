---
title: "No sound or MIDI not detected"
slug: no-sound
section: troubleshooting
summary: "The device is plugged in but you do not hear anything. Work through this checklist."
order: 3
status: edited-2026-05
emoji: 🔇
---

The device is connected but you cannot hear anything. Work through this checklist in order.

## First — is the LED on the device lit?

- **No LED.** Go to [Device will not connect](/troubleshooting/wont-connect/).
- **LED is on.** Continue below.

> ℹ️ **Note for Playtron.** The LED on Playtron does **not** light up when you plug it in. This is normal. Use the checklist below.

## Using the online synth at synth.playtronica.com

1. **Use Brave or Chrome.** Safari and Firefox do not support Web MIDI. This is the most common cause of no sound.
2. **Confirm MIDI permission.** If you clicked Block on the MIDI popup, the browser remembers. Open the browser settings → Site Settings → MIDI → find `synth.playtronica.com` → set to **Allow**.
3. **Confirm your computer audio works.** Play any YouTube video. If you hear audio, the issue is MIDI routing, not audio output.
4. **Unplug and reconnect the device, then reload the page.**

## Using a DAW (Ableton, Logic, FL Studio, GarageBand)

1. **Open the DAW's MIDI preferences and enable your Playtronica device as a MIDI input.** See the specific DAW guides:
   - [Ableton Live](/software/ableton/)
   - [Logic Pro and GarageBand](/software/logic-garageband/)
   - [FL Studio and other DAWs](/software/fl-studio-and-other-daws/)
2. **Arm a track to receive MIDI.** In most DAWs, you need a track selected and record-armed to hear incoming MIDI through a software instrument.
3. **Check the MIDI activity indicator.** Ableton has a MIDI indicator in the top bar. When you touch the device, the indicator should flash. If it flashes but you hear no sound, the issue is in the DAW's instrument routing.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there, what to email instead, and where to find the WhatsApp regional groups.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `No sound #[order number]`. Attach a screenshot of your synth or DAW and a short video of the device. We aim for 24 hours, but a reply may take up to 3 business days.
