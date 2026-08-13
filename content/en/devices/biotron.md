---
title: "Biotron — your plant as a MIDI instrument"
slug: biotron
section: devices
summary: "Clip the leaf-pads to a houseplant and let it play itself. Setup, wiring, firmware updates, and the fix for when there's no sound."
order: 3
segment: ["music-producer", "creator"]
deflection_target: 70
status: edited-2026-08
last_edited: 2026-08-05
emoji: 🌿
---

<img src="/illustrations/biotron/biotron-top.svg" alt="Biotron top view, labelled — USB-C connector on the left edge, LED arcs around the centre, the microcontroller in the nucleus, a light sensor beside it, two leaf-pad clip points, the BOOT contacts, and the fingerprint button" style="display:block;margin:8px 0 20px;max-width:100%;height:auto;background:transparent" />

Biotron measures changes in the electrical path between its contacts and maps the sensor readings to MIDI. Plants and other conductive objects can be part of that path. Touch, contact placement, nearby electrical noise, light, and firmware settings can all affect the musical output; it is not a calibrated measurement of plant physiology.

Biotron sends on two MIDI channels:

- **Channel 1** — the plant sensor.
- **Channel 2** — the light sensor.

> ⚠️ **Handle only the parts shown in this guide.** Touch the leaf-pad cables, the light sensor face, and the USB-C connector. Do not touch the solder joints, the exposed chips on top, or the underside of the PCB — even when the device is unplugged. Biotron is durable, but those areas can be damaged permanently. Treat the rest of the board the way you would treat the back of a phone screen.

> 🛠️ **Firmware update requested by support?** Follow the recovery sequence below. Update time and behaviour vary by computer and hardware revision; do not interrupt a file copy in progress.

> 🧬 **Testing firmware features?** See [Biotron Advanced — experimental MIDI control](/devices/biotron-advanced/) for current limits and evidence to record.

> 🛒 **Don't have one yet?** [Buy Biotron on shop.playtronica.com](https://shop.playtronica.com/products/biotron). Biotron ships without a USB cable — see [Accessories](/getting-started/accessories/) for the matching part, or grab the [Biotron Starter Kit](https://shop.playtronica.com/products/biotron-starter-kit) which includes it.

{{ youtube: EArNOal-ba0 title="Introducing the Biotron from Playtronica" }}

## Step 1 — Update the firmware (first time only)

1. **Confirm that your board matches the pictured revision.** On the pictured board, marker **8 · BOOT CONTACTS** points to two small metal contacts beside the fingerprint button. If your connector or contact layout differs, stop and ask support for the correct revision image; do not probe other pads. If it matches, bridge the two contacts, plug in USB-C, then **release the bridge when the `RPI-RP2` drive appears**. Do not leave the contacts bridged while copying firmware.
2. **Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) in Chrome.** Click the blue "Update firmware" button. A file downloads to your computer.
3. **Drag the downloaded file onto the `RPI-RP2` drive.** The drive disappears. Done. When the device reconnects, it appears as a MIDI device called "Biotron" instead of a drive.

## Step 2 — Set up and play

1. **Clip the leaf-pads to your plant.** Clip one pad to a leaf or branch. Clip the other pad to a different leaf or branch. The pads must be **at least 2 cm apart**. The pads must never touch each other.
2. **Plug Biotron into your computer with a USB cable** (not included — use any USB-C data cable). Then open [synth.playtronica.com](https://synth.playtronica.com) in Chrome.
3. **Leave the connected setup untouched during startup.** Current firmware performs automatic calibration, but the exact duration and completion cue still need confirmation for each released firmware/hardware revision.
4. **Check the output.** Touch a connected conductive surface and change the light over the board. Results vary with contact, environment, settings, and firmware.

## Picking the right plant

Contact quality, moisture, geometry, nearby electrical equipment, and settings can all change the result. We have not validated a species-by-species performance ranking, so treat plant choice as an experiment rather than a biological claim.

### Improve a weak or unstable result

1. Check that both contacts are secure and do not touch each other.
2. Try a different contact position or conductive object.
3. Move chargers, power supplies, and other possible noise sources away, then compare the MIDI output. No universal separation distance is verified.
4. Reconnect the device and leave the setup untouched while automatic calibration runs. The exact completion cue is pending revision testing.

### A small experiment to find your favourite plant

Set up Biotron on three different plants on three consecutive days. Same scale, same synth, same time of day. Listen to how each plant phrases. You will quickly find which plant in your room has the most musical voice. It is not always the obvious one.

## MIDI channels

| Source | MIDI channel | What it sends |
|---|---|---|
| 🌿 Plant sensor | Channel 1 | Note and CC data from plant conductivity (touch or proximity) |
| 💡 Light sensor | Channel 2 | Note data, or pitch-bend when that mode is enabled |

Biotron works with any DAW, online synth, or iOS music app that supports MIDI. For web synths, use Chrome at [synth.playtronica.com](https://synth.playtronica.com).

## Web settings and presets

At [settings.playtronica.com](https://settings.playtronica.com) you can change sensitivity, MIDI mapping, scales, and more. After changing settings, click the blue "Send" button to push the changes to the device. Preset files are also available to download and load.

> **Using a DAW on Windows?** The settings page and your DAW cannot always use the same MIDI port at once. The current supported configuration path is [settings.playtronica.com](https://settings.playtronica.com) in a compatible desktop browser. Close the settings tab before opening Biotron in Reaper, Ableton, or another DAW.

> **Incoming MIDI CC is experimental.** The firmware team is validating live
> parameter control, message bursts, and saved settings. Do not rely on rapid
> fader automation until a tested firmware release is published here.

## What the buttons do

Biotron has two buttons.

- **Fingerprint button** — cycles through the default presets. Your custom preset does **not** return after cycling. Save your custom preset first.
- **Mute button** (top of the device, near USB-C) — ON mutes all tracks. OFF restores the previously active tracks. Change the behaviour at [settings.playtronica.com](https://settings.playtronica.com) under Settings → Buttons Mode → Mute button state.

## Four ways to use Biotron

- **Leave the setup alone.** After startup, observe whether it continues producing MIDI without touch.
- **Move your hands close to the plant.** No touching required. Proximity changes the signal.
- **Change the light.** Turn a lamp on and off, or cover the light sensor with your hand.
- **Use Biotron on your body.** Clip the two pads to different points of skin. Your body becomes the instrument.

## Troubleshooting

> **The same notes repeat when nothing is touching the plant.** Reconnect the device and leave the setup untouched during automatic calibration. The exact duration and completion cue must still be confirmed for your firmware/hardware revision.

> **The setup produces little MIDI activity.** Check both contacts, try a different contact position or conductive object, reconnect, and leave the setup untouched during automatic calibration. Compare the result in a MIDI monitor before attributing it to a plant species or biological state.

> **The device does not appear on the computer.** Make sure the firmware is updated. Un-updated devices are sometimes not recognised. Try a different USB cable — it must be a data cable, not a charge-only cable.

> **Reset the device.** Short the BOOT pins, plug in USB-C, release the pins. The device appears as `RPI-RP2`. Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) and reflash the firmware.

## Frequently asked questions

<details>
<summary><strong>How does Biotron convert plant signals to MIDI? Is it chromatic?</strong></summary>

Biotron maps changes in its electrical sensor input to MIDI notes and plant CC90. Available scales and note range depend on the stored configuration and firmware; check the settings page rather than assuming a default scale or octave count.

</details>

<details>
<summary><strong>Can I use multiple Biotrons together?</strong></summary>

This is not yet a supported guarantee. Identical USB-MIDI devices may be hard to distinguish in some browser/Windows combinations, and the settings page has not completed a two-device selection test. Test your exact OS, browser, DAW, and firmware before relying on several units in a performance.

</details>

<details>
<summary><strong>Can the plant play on its own, without my hands?</strong></summary>

It may continue producing changing MIDI without touch, depending on the setup and settings. This output is not proof of a particular biological process. Monitor the MIDI result on your own unit before a performance.

</details>

<details>
<summary><strong>Does it really work? What is being measured?</strong></summary>

Biotron maps changes in its electrical sensor readings to MIDI. Contact, touch, environmental electrical noise, and settings can influence the readings. Biotron is a musical controller, not a calibrated scientific instrument, and its output should not be described as a direct account of a plant's internal state.

</details>

<details>
<summary><strong>Can I control Biotron with MIDI CC?</strong></summary>

Current firmware source sends plant CC90 and contains incoming CC handlers. Incoming control is experimental: command scope varies (some commands are global, others channel-specific), and rapid automation still requires physical burst and persistence testing. See [Biotron MIDI CC](/software/biotron-midi-cc/) for the source-derived test map and limitations.

</details>

<details>
<summary><strong>What USB cable should I use?</strong></summary>

Use a data cable, not a charge-only cable. Most cables that ship with phones are data cables. Charge-only cables carry power but no data, and the device will not appear on your computer.

</details>

<details>
<summary><strong>I see "Denied access to MIDI" in the browser.</strong></summary>

The browser blocked MIDI access. To fix this:

1. Open the browser settings.
2. Go to **Privacy and Security → Site Settings → MIDI**.
3. Find `settings.playtronica.com` or `synth.playtronica.com` and change the setting to **Allow**.
4. Reload the page.

</details>

<details>
<summary><strong>Can I make a Biotron myself?</strong></summary>

Yes. The firmware is open source on GitHub, and the hardware schematics are published. If you are comfortable with PCB design and RP2040 firmware, you can build your own. See the [Biotron firmware on GitHub](https://github.com/Playtronica/biotron-firmware).

</details>

<details>
<summary><strong>The device suddenly stopped working.</strong></summary>

Try these steps in order:

1. Unplug and reconnect the USB cable.
2. Use a different USB port directly on the computer, not a hub.
3. Use a different USB data cable.
4. If the device still does not appear, do a firmware reset: short the BOOT pins, plug in USB-C, release the pins. The device appears as `RPI-RP2`. Open [settings.playtronica.com/#/biotron](https://settings.playtronica.com/#/biotron) and reflash the firmware. See [Firmware reset (Nuke)](/troubleshooting/firmware-reset/).

</details>

## Works great with Biotron

Biotron ships without a USB-C cable. Once you have it running, these extend what it can do.

- **[Patches for skin and plants](https://shop.playtronica.com/products/patches-for-skin-and-plants)** — stick-on electrodes for leaves with waxy or narrow surfaces, or for running Biotron on skin instead of a plant. From €16.
- **[Orbita + Biotron Duo](https://shop.playtronica.com/products/next-gen-playtronica-duo-orbita-biotron)** — Orbita's turntable drives the rhythm while Biotron's plant drives the melody. Designed to play together out of the box. €520.
- **[USB-C to USB-A cable — 1 m](https://shop.playtronica.com/products/usb-c-cable-1m)** — the cable Playtronica devices are built for. Braided, data cable, not charge-only. €9.98.
- **[Biotron Starter Kit](https://shop.playtronica.com/products/biotron-starter-kit)** — Biotron + cable + accessories as a gift-ready bundle. €122.

## Related pages

- [Compare all Playtronica devices](/devices/compare/) — side-by-side spec matrix, what is in each box (note: Biotron ships without a cable), software compatibility, prices.
- [Accessories and add-ons](/getting-started/accessories/) — USB-C cables, patches, conductive materials.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Biotron issue #[order number]`. We aim for 24 hours, but a reply may take up to 3 business days.
