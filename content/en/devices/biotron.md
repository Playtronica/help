---
title: "Biotron — your plant as a MIDI instrument"
slug: biotron
section: devices
summary: "Connect a plant, hear the first notes, then choose Settings, offline use, DAW routing, or recovery."
order: 3
segment: ["music-producer", "creator"]
deflection_target: 70
status: edited-2026-08
last_edited: 2026-08-21
emoji: 🌿
---

<div class="task-grid" aria-label="Choose a Biotron task">
  <a class="task-card" href="#quick-start"><span class="task-card__icon">▶</span><span><strong>Play the first notes</strong><small>Connect one plant and hear Biotron in about five minutes.</small></span></a>
  <a class="task-card" href="/software/biotron-offline-settings/"><span class="task-card__icon">📴</span><span><strong>Use Settings offline</strong><small>Install once, then configure without internet.</small></span></a>
  <a class="task-card" href="/software/biotron-midi-cc/"><span class="task-card__icon">🎛</span><span><strong>Connect a DAW</strong><small>Receive plant MIDI or test outgoing CC.</small></span></a>
  <a class="task-card" href="#fix-a-problem"><span class="task-card__icon">🛟</span><span><strong>Fix a problem</strong><small>Start with the cable, signal, or safe recovery path.</small></span></a>
</div>

## Quick start

<ol class="steps">
  <li><strong>Clip both leaf-pads to the plant.</strong> Use two separate leaves or branches. Keep the metal contacts apart.</li>
  <li><strong>Connect Biotron with a USB data cable.</strong> Biotron ships without a cable. A charge-only cable powers the LEDs but carries no MIDI.</li>
  <li><strong>Open <a href="https://synth.playtronica.com">synth.playtronica.com</a> in Chrome.</strong> Allow MIDI access and choose Biotron.</li>
  <li><strong>Leave the setup untouched during startup, then play.</strong> Touch the plant or cover the light sensor. You should see MIDI activity and hear notes.</li>
</ol>

> 💡 **Two sources, two channels.** Plant activity uses MIDI channel 1. The
> light sensor uses MIDI channel 2. MIDI itself is not audio, so choose a synth
> or instrument track to hear it.

## Know the board

<a href="/illustrations/biotron/biotron-top.svg" target="_blank" rel="noopener"><img src="/illustrations/biotron/biotron-top.svg" alt="Biotron top view labelled with the USB-C connector, leaf-pad contacts, light sensor, buttons, LEDs, and electronics" style="display:block;margin:8px 0 8px;max-width:100%;height:auto;background:transparent" /></a>

[Open the labelled board image at full size](/illustrations/biotron/biotron-top.svg).

> ⚠️ **Handle the connectors and sensor surfaces only.** Do not press exposed
> chips, solder joints, or the underside. The BOOT label in the overview is for
> orientation, not permission to bridge contacts.

## Configure, save, then close Settings

Use [Biotron Settings](https://settings.playtronica.com/#/biotron) to change
sensitivity, scale, note range, buttons, and MIDI behaviour.

<ol class="steps">
  <li>Close your DAW and other MIDI apps.</li>
  <li>Open Settings in desktop Chrome or Edge and select one Biotron.</li>
  <li>Change a setting and send it to the device.</li>
  <li>Close Settings before opening the same MIDI port in a DAW.</li>
</ol>

Need it at a venue without internet? Follow the
[offline Windows guide](/software/biotron-offline-settings/). The isolated beta
can be installed once and opened later without a connection. Firmware downloads
remain online-only.

## Use Biotron with a DAW

- **Biotron → DAW:** enable Biotron as a MIDI input. Plant data arrives on
  channel 1; light data arrives on channel 2.
- **DAW → Biotron:** enable the MIDI output only when you need to send settings
  or clock back to Biotron.
- **Windows port busy:** release and close Settings before opening the device
  in Reaper or Ableton.

The [Biotron MIDI guide](/software/biotron-midi-cc/) has the Reaper route, CC90
output, and the experimental incoming CC map.

> ⚠️ **Fast incoming CC automation is still experimental.** Occasional test
> commands are documented. Do not depend on rapid fader sweeps until a tested
> firmware release is linked from the MIDI guide.

## Improve a weak or unstable signal

1. Check that both contacts are secure and do not touch.
2. Try another leaf, branch, contact position, or conductive object.
3. Move chargers and power supplies away, then compare the MIDI output.
4. Reconnect Biotron and leave the setup untouched during startup.

Contact, moisture, geometry, nearby electrical noise, light, and stored settings
all affect the musical result. Biotron is a musical controller, not a calibrated
measurement of plant physiology.

## Buttons and useful accessories

| Control | What it does |
|---|---|
| Fingerprint button | Cycles through stored presets. Save your custom preset before cycling. |
| Mute button | Mutes or restores the configured tracks. Change its mode in Settings. |

- [Patches for skin and plants](https://shop.playtronica.com/products/patches-for-skin-and-plants) — for narrow or waxy leaves and body contact.
- [USB-C data cable](https://shop.playtronica.com/products/usb-c-cable-1m) — Biotron needs data, not power only.
- [Biotron Starter Kit](https://shop.playtronica.com/products/biotron-starter-kit) — Biotron, cable, and accessories.

## Fix a problem

<details>
<summary>Biotron lights up but does not appear on the computer</summary>
<p>Try another USB data cable and a direct computer port. Close other MIDI apps. If it still does not appear, use the safe recovery route below.</p>
</details>

<details>
<summary>The same notes repeat or the signal is unstable</summary>
<p>Reconnect Biotron, leave the setup untouched during startup, then check both contacts in a MIDI monitor. Compare the signal before changing firmware.</p>
</details>

<details>
<summary>Settings says “Denied access to MIDI”</summary>
<p>Open the browser site settings, allow MIDI device control for Playtronica Settings, then reload. Close your DAW before reconnecting.</p>
</details>

<details>
<summary>Firmware update or recovery is needed</summary>
<p>Try the normal Update Firmware button first. If the <code>RPI-RP2</code> drive does not appear, do not probe contacts. Open the <a href="/troubleshooting/firmware-reset/">revision-safe recovery guide</a> and send support a clear photo of both sides of your board.</p>
</details>

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with:

- a photo of the full setup;
- your operating system and music app;
- what the LEDs do;
- the exact step that failed.

Use the subject `Biotron issue #[order number]`.

We aim for 24 hours, but a reply may take up to 3 business days.
