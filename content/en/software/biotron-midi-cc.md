---
title: "Biotron MIDI and CC"
slug: biotron-midi-cc
section: software
summary: "Receive plant MIDI, test experimental incoming CC, connect Reaper or iPad, and power a hardware-synth setup."
segment: ["music-producer", "creator"]
deflection_target: 25
status: edited-2026-08
last_edited: 2026-08-26
emoji: 🎹
---

<div class="task-grid" aria-label="Choose a Biotron MIDI task">
  <a class="task-card" href="#biotron-to-your-daw"><span class="task-card__icon">🌿</span><span><strong>Biotron → DAW</strong><small>Receive notes and plant CC90.</small></span></a>
  <a class="task-card" href="#your-daw-to-biotron"><span class="task-card__icon">🎚</span><span><strong>DAW → Biotron</strong><small>Test incoming settings commands carefully.</small></span></a>
  <a class="task-card" href="#use-an-ipad"><span class="task-card__icon">📱</span><span><strong>Use an iPad</strong><small>Play instruments without opening Settings.</small></span></a>
  <a class="task-card" href="#use-a-hardware-synth"><span class="task-card__icon">🎛</span><span><strong>Use a hardware synth</strong><small>Send TRS MIDI and power Biotron separately.</small></span></a>
</div>

## Biotron to your DAW

Biotron sends standard MIDI over USB:

- **Note on/off** triggers instruments and samplers.
- **CC90** follows plant-sensor intensity in the MIDI range 0–127.
- **Channel 1** carries plant data.
- **Channel 2** carries light-sensor notes or the configured light behaviour.

Enable Biotron as a MIDI input, arm an instrument track, and choose all
channels for the first test. MIDI carries control data, not sound; the track
still needs a synth or sampler.

> 💡 CC90 is useful for filter, expression, or effect modulation. Check the
> range in a MIDI monitor. It is musical sensor data, not calibrated biological
> data.

## Your DAW to Biotron

Biotron also recognises incoming CC messages that change its stored musical
settings.

> ⚠️ **Incoming control is experimental.** Use occasional values while testing.
> Do not send automation, LFOs, or rapid fader sweeps until a firmware release
> passes physical burst and persistence testing.

### Incoming CC map

| CC | Setting | Scope |
|---:|---|---|
| 3 | Input filter percentage | Global |
| 9 | Maximum note velocity | Channel-specific |
| 14 | Plant tempo / light tempo division | Channel-specific |
| 15 | Random-note mode | Global |
| 20 | Minimum repeated-note distance | Channel-specific |
| 21 | Note-off fraction | Global |
| 22 | Sequence exponent | Global |
| 23 | Sequence first value | Global |
| 24 | Scale index | Global |
| 25 | Minimum note velocity | Channel-specific |
| 26 | Random-velocity mode | Channel-specific |
| 27 | Light pitch-bend mode | Global |
| 28 | Light-note range | Global |
| 30 | Performance mode | Global |
| 31 | Mute note output | Channel-specific |
| 85 | Centre plant note | Global |
| 86 | First-note swing percentage | Global |
| 87 | Button mute mode | Global |

For channel-specific commands, MIDI channel 1 selects the plant setting and
channel 2 selects the light setting. Global commands ignore the channel.
Value mappings differ by command; this source-derived table is a test map, not
a finished live-control specification.

### Test one command in Reaper

<ol class="steps">
  <li><strong>Close Settings.</strong> On Windows, another app may still own the Biotron MIDI port.</li>
  <li><strong>Enable Biotron under MIDI outputs</strong> in <strong>Options → Preferences → Audio → MIDI Devices</strong>.</li>
  <li><strong>Route one track to Biotron</strong> under <strong>MIDI Hardware Output</strong>.</li>
  <li><strong>Send one reversible value.</strong> Start with CC31 mute/unmute, then stop and confirm normal notes return.</li>
</ol>

If Reaper says **Failed to open device**, close every Chrome, Edge, and
Playtronica Settings window. Reconnect Biotron, then enable the output again.

If Biotron disappears from both Reaper and MIDI-OX, stop sending CC immediately.
Close every MIDI app, disconnect USB, and check **Device Manager → Sound, video
and game controllers** before reconnecting once with a known data cable. Green
LEDs prove power only. Do not reflash firmware from this symptom alone.

<details>
<summary>MIDI Clock changes Biotron's timing</summary>
<p>Biotron listens for MIDI Start, Stop, and Clock. Turn off <strong>Send clock to this device</strong> in Reaper if you want Biotron to keep its own timing. MIDI Clock is not required for CC.</p>
</details>

<details>
<summary>A synth holds a note</summary>
<p>Use <strong>Panic</strong> or <strong>All Notes Off</strong> first. If the problem returns, save a short raw MIDI log with the synth name and version. Do not assume the synth is at fault while dense-message firmware testing remains open.</p>
</details>

## Use an iPad

You can play Biotron from an iPad, but mobile Safari cannot open the Web MIDI
Settings page. Configure Biotron once on a desktop computer; the configuration
stays on the device.

<ol class="steps">
  <li>Connect an Apple USB adapter or a compatible USB-C hub.</li>
  <li>Plug Biotron into the adapter with its USB data cable.</li>
  <li>Open GarageBand and choose an instrument.</li>
  <li>Touch the plant. GarageBand should receive Biotron's notes.</li>
</ol>

If Biotron lights up but GarageBand is silent, check the external MIDI input
for the track. If notes were muted in Settings, reconnect Biotron to a desktop
computer and restore them there.

## Use a hardware synth

The TRS MIDI cable carries MIDI data but does not power Biotron.

<ol class="steps">
  <li>Connect Biotron's TRS output to the synth's MIDI input.</li>
  <li>Power Biotron from a standard 5 V USB adapter or battery pack.</li>
  <li>Power on the synth, then touch the plant.</li>
</ol>

Biotron uses **TRS MIDI Type A**. If the synth expects Type B, use a Type A to
Type B adapter.

## Quick self-test

Press the fingerprint button and watch a MIDI monitor. If the monitor receives
the preset-change note burst, the USB route works and the remaining issue is
likely routing, mute state, or the instrument track.

Need Settings without internet? The [offline Windows guide](/software/biotron-offline-settings/)
links to one downloadable field-test file. Firmware downloads remain online-only.

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with:

- a short video of the complete connection;
- your operating system and DAW;
- the MIDI input and output names;
- whether the fingerprint self-test appears in a MIDI monitor.

We aim for 24 hours, but a reply may take up to 3 business days.
