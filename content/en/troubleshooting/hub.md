---
title: "Troubleshooting hub"
slug: hub
section: troubleshooting
summary: "Something is not working. Start here."
order: 1
segment: ["music-producer", "gift-recipient"]
deflection_target: 80
status: edited-2026-05
last_edited: 2026-05-26
emoji: 🔧
---

Pick the symptom that matches your situation. Each row points to the right page or the fastest fix.

| What you are seeing | Most likely cause | Where to go |
|---|---|---|
| Computer does not see the device at all | Wrong cable, wrong port, wrong browser | [Device will not connect](/troubleshooting/wont-connect/) |
| LED on, but no sound when I touch | MIDI permission, wrong browser, no grounding | [No sound or MIDI not detected](/troubleshooting/no-sound/) |
| Playtron specifically — plugged in but silent | Grounding | [Grounding — how and why](/sound/grounding/) |
| Random notes play with nothing touched | Calibration / electrical interference | "Spurious notes" below |
| USB port loose, device physically broken | Hardware fault | "Hardware damage" below |
| Some objects play, others do not | Conductivity | [Objects you can play](/sound/objects-you-can-play/) |
| Worked once, now broken | Firmware corruption | [Firmware reset (Nuke)](/troubleshooting/firmware-reset/) |

## Quick checklist — works for 80% of "not working" cases

Work through these in order. They resolve most issues without needing the deeper pages.

1. **Use Chrome.** Safari and Firefox do not support Web MIDI. This is the single most common reason a Playtronica device appears to not work.
2. **Plug in the device, then open the browser.** The browser scans for MIDI devices on page load. If the browser is already open, the device will not be detected.
3. **Click Allow on the MIDI permission popup.** If you clicked Block earlier, the browser remembers. See [No sound](/troubleshooting/no-sound/).
4. **For Playtron, confirm grounding.** Bare skin on the pointed corner of the device, or a ground cable to a metal radiator. Without grounding, Playtron is silent. See [Grounding](/sound/grounding/).
5. **Try a different USB cable.** It must be a data cable, not a charge-only cable. Charge-only cables look identical but carry no data.
6. **Use a USB port directly on the computer.** Not a USB hub.

If all six are confirmed and the device still does not work, go to the symptom-specific page above.

## LED status guide

| LED behaviour | What it means |
|---|---|
| Solid on when plugged in | The device is powered and connected. |
| Off when plugged in | USB power issue. Try another port or cable. (Playtron and TouchMe stay dark when you plug them in — that is normal; their LED blinks when you complete the circuit and a note plays.) |
| Flashing rapidly | The device is sending MIDI signals. This is correct. |
| All LEDs lit at once | Either calibration mode (Biotron, briefly) or a stuck state (Playtron — try a reset). |
| Solid on but no response to touch | Unplug and reconnect. If the problem continues, see the symptom rows above. |

## Spurious notes — device plays without anything touching it

This happens when the device cannot find a stable reference point.

- **Biotron** — the device did not calibrate. Unplug, plug back in, move at least 1 metre away from the plant for 30 seconds, wait for the steady green pulse.
- **Playtron** — the room has strong electromagnetic interference. Move the device away from your computer, phone charger, and Wi-Fi router. Try a different room as a quick test.
- **All devices** — confirm grounding (Playtron) or that the plant pads are at least 2 cm apart and not touching each other (Biotron).

## Hardware damage

If the device is physically damaged — USB port loose, alligator pin broken off, PCB cracked — do not try to repair it yourself. [Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Defective #[order number]` and a clear photo. The 1-year warranty covers manufacturing defects. See [Warranty and repairs](/orders/warranty-repair/) for the policy.

## Specific device pages

- [Playtron — common issues and fixes](/troubleshooting/playtron-faq/) — grounding, pin corrosion, intermittent triggers.
- [Firmware reset (Nuke)](/troubleshooting/firmware-reset/) — when the device is unresponsive after a failed update.
- [Device will not connect](/troubleshooting/wont-connect/) — Mac and Windows steps.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Troubleshooting #[order number]`. Tell us:

- Which device.
- Your operating system.
- The browser or app you are using.
- What the LED is doing.
- A 30-second video if you can record one.

We aim for 24 hours, but a reply may take up to 3 business days.
