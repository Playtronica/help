---
title: "Biotron — your plant as a MIDI instrument"
slug: biotron
section: devices
summary: "Clip the leaf-pads to a houseplant and let it play itself."
order: 3
status: edited-2026-05
emoji: 🌿
---

Biotron reads the bio-electrical signals inside a living plant and converts them to MIDI. The plant plays music on its own. You can change the music by touching a leaf, changing the light, or moving your hand close to the plant.

Biotron sends on two MIDI channels:

- **Channel 1** — the plant sensor.
- **Channel 2** — the light sensor.

> ⚠️ **Handle only the parts shown in this guide.** Touch the leaf-pad cables, the light sensor face, and the USB-C connector. Do not touch the solder joints, the exposed chips on top, or the underside of the PCB — even when the device is unplugged. Biotron is durable, but those areas can be damaged permanently. Treat the rest of the board the way you would treat the back of a phone screen.

> 🛠️ **New user?** Update the firmware before your first session. The device ships ready to use, but the latest firmware has major improvements. This takes about 3 minutes.

> 🧬 **Want to go deeper?** See [Biotron Advanced — MIDI CC and SysEx](/devices/biotron-advanced/) for real-time MIDI control, presets, and firmware-level customisation.

## Step 1 — Update the firmware (first time only)

1. **Activate boot mode.** Short the two small BOOT contacts on the PCB with a paper clip or jumper wire. Connect the pins first, then plug in USB-C, then release the pins. The device appears on your computer as a drive called `RPI-RP2`.
2. **Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) in Brave or Chrome.** Click the blue "Update firmware" button. A file downloads to your computer.
3. **Drag the downloaded file onto the `RPI-RP2` drive.** The drive disappears. Done. When the device reconnects, it appears as a MIDI device called "Biotron" instead of a drive.

## Step 2 — Set up and play

1. **Clip the leaf-pads to your plant.** Clip one pad to a leaf or branch. Clip the other pad to a different leaf or branch. The pads must be **at least 2 cm apart**. The pads must never touch each other.
2. **Plug Biotron into your computer with the USB-C cable from the box.** Then open [synth.playtronica.com](https://synth.playtronica.com) in Brave or Chrome.
3. **Move away from the device for 30 seconds.** The green LED blinks and you hear two short calibration tones. Wait until the LED pulses slowly and steadily. Calibration is required for the full musical range.
4. **The plant plays on its own.** Touch a leaf for a strong change. Move your hand close to the plant without touching it for a softer change. Turn a light on or off — the light sensor on Channel 2 responds.

## Best plants for Biotron

**Recommended:** aloe vera, succulents, cacti, monstera, pothos, rubber plant — plants with moisture inside and long branches. Water the plant before a session for a stronger signal.

**Avoid:** grass, dry or dead plants, very small plants. Keep Biotron away from your computer and phone. Electromagnetic interference affects the signal.

## MIDI channels

| Source | MIDI channel | What it sends |
|---|---|---|
| 🌿 Plant sensor | Channel 1 | Note and CC data from plant conductivity (touch or proximity) |
| 💡 Light sensor | Channel 2 | Note and CC data from light intensity changes |

Biotron works with any DAW, online synth, or iOS music app that supports MIDI. For web synths, use Brave or Chrome at [synth.playtronica.com](https://synth.playtronica.com).

## Web settings and presets

At [settings.playtronica.com](https://settings.playtronica.com) you can change sensitivity, MIDI mapping, scales, and more. After changing settings, click the blue "Send" button to push the changes to the device. Preset files are also available to download and load.

## What the buttons do

Biotron has two buttons.

- **Fingerprint button** — cycles through the default presets. Your custom preset does **not** return after cycling. Save your custom preset first.
- **Mute button** (top of the device, near USB-C) — ON mutes all tracks. OFF restores the previously active tracks. Change the behaviour at [settings.playtronica.com](https://settings.playtronica.com) under Settings → Buttons Mode → Mute button state.

## Four ways to use Biotron

- **Leave the plant alone.** Connect, calibrate, walk away. Come back in 30 minutes — the plant has been playing the room.
- **Move your hands close to the plant.** No touching required. Proximity changes the signal.
- **Change the light.** Turn a lamp on and off, or cover the light sensor with your hand.
- **Use Biotron on your body.** Clip the two pads to different points of skin. Your body becomes the instrument.

## Troubleshooting

> **The same notes repeat when nothing is touching the plant.** The device did not calibrate. Unplug, plug back in, move away for the full 30 seconds, and wait for the steady green pulse.

> **The device does not appear on the computer.** Make sure the firmware is updated. Un-updated devices are sometimes not recognised. Try a different USB cable — it must be a data cable, not a charge-only cable.

> **Reset the device.** Short the BOOT pins, plug in USB-C, release the pins. The device appears as `RPI-RP2`. Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) and reflash the firmware.

## Frequently asked questions

### How does Biotron convert plant signals to MIDI? Is it chromatic?

Biotron measures the bio-electrical conductivity of the plant. Changes in moisture, touch, light, and proximity change the resistance, and the firmware maps these changes to MIDI note or CC values. The default scale is C major across 4 octaves. You can switch to Chromatic mode at [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron).

### Can I use multiple Biotrons together?

Yes. Each Biotron appears as a separate MIDI device on your computer. Connect several, assign each to a different MIDI channel or instrument in your DAW, and each plant controls its own voice.

### Can the plant play on its own, without my hands?

Yes. After calibration, leave the plant completely alone. The bio-electrical signals inside the plant continue to change from internal water movement, photosynthesis, and environmental factors. The plant plays the room. Leave it running for 30 minutes or more.

### Does it really work? What is being measured?

Yes. Biotron measures small changes in electrical conductivity across two points of contact on the plant. Living plants have real, measurable bio-electrical activity. This is the same principle used in plant electrophysiology research. The firmware maps the changes to MIDI, so you hear what is happening inside the plant.

### Can I control Biotron with MIDI CC?

Yes. Biotron sends and receives MIDI CC. Incoming CC controls sensitivity, scale, note length, and probability in real time from a hardware controller or DAW automation. See [Biotron Advanced](/devices/biotron-advanced/) for the full CC map.

### What USB cable should I use?

Use a data cable, not a charge-only cable. Most cables that ship with phones are data cables. Charge-only cables carry power but no data, and the device will not appear on your computer.

### I see "Denied access to MIDI" in the browser.

The browser blocked MIDI access. To fix this:

1. Open the browser settings.
2. Go to **Privacy and Security → Site Settings → MIDI**.
3. Find `settings.playtronica.com` or `synth.playtronica.com` and change the setting to **Allow**.
4. Reload the page.

### Can I make a Biotron myself?

Yes. The firmware is open source on GitHub, and the hardware schematics are published. If you are comfortable with PCB design and RP2040 firmware, you can build your own. See the [Biotron firmware on GitHub](https://github.com/Playtronica/biotron-firmware).

### The device suddenly stopped working.

Try these steps in order:

1. Unplug and reconnect the USB cable.
2. Use a different USB port directly on the computer, not a hub.
3. Use a different USB data cable.
4. If the device still does not appear, do a firmware reset: short the BOOT pins, plug in USB-C, release the pins. The device appears as `RPI-RP2`. Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) and reflash the firmware. See [Firmware reset (Nuke)](/troubleshooting/firmware-reset/).

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there, what to email instead, and where to find the WhatsApp regional groups.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Biotron issue #[order number]`. We aim for 24 hours, but a reply may take up to 3 business days.
