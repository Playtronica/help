---
title: "Biotron Advanced — MIDI CC and SysEx"
slug: biotron-advanced
section: devices
summary: "Deep MIDI mapping for Biotron — CC, SysEx, per-channel routing."
order: 4
status: edited-2026-05
emoji: 🧬
parent: biotron
hide_from_nav: true
---

> **Parent page:** [Biotron — your plant as a MIDI instrument](/devices/biotron/). Start there if you have not done the first-time setup.

> 🛠️ **For musicians and developers.** The web settings panel at [settings.playtronica.com](https://settings.playtronica.com) is the entry level. MIDI CC and SysEx turn Biotron into a fully programmable instrument with real-time control, preset management, and deep firmware access.

> ⚠️ **Handle only the parts shown in this guide.** Touch the leaf-pad cables, the light sensor face, and the USB-C connector. Do not touch the solder joints, the exposed chips, or the underside of the PCB — even when the device is unplugged. Biotron is durable, but those areas can be damaged permanently.

## Why use MIDI CC?

A MIDI controller with knobs and faders turns Biotron into a physical, expressive instrument. Instead of clicking in a web app, you move several parameters at once and shape the plant's behaviour as you perform. MIDI CC works with DAWs, hardware controllers, foot pedals, and sequencers.

| Tool | Best for | When to use |
|---|---|---|
| **Web settings panel** | Configuration before a session | Set a baseline scale, sensitivity, and channel routing |
| **MIDI CC** | Real-time performance | Move knobs and faders while the plant plays |

## Performance workflows

### Music engine — map knobs to musical parameters

- **Scale and key** — shift mood and harmony live.
- **Note length** — short for percussive, long for droning textures.
- **Probability** — from sparse to busy note density.
- **Velocity** — from quiet to intense dynamics.

Turning these knobs while the plant plays is conducting the plant. The music shifts under your hands.

### Sensor shaping — map faders to sensor logic

- **Sensitivity** — low: only deliberate touches trigger notes. High: micro-movements become music.
- **Threshold** — how much change is required to trigger a note.
- **Smoothing** — more smoothing produces slow, meditative shifts. Less smoothing produces fast, glitchy detail.

You are shaping the interpretation of the plant's biological signals in real time.

### DAW automation — automate Biotron from your timeline

In Ableton, Bitwig, or Logic, automate every parameter from automation lanes:

- Automate **Scale** for harmonic transitions across a track.
- Automate **Probability** for build-ups and drops.
- Automate **Note Length** for texture evolution.
- Automate **Velocity** to mix Biotron in and out of the arrangement.

Biotron becomes a MIDI-generating module driven by your timeline.

### Installations — adapt to the room over time

For galleries, museums, and interactive spaces:

- Lower **Sensitivity** during busy hours to ignore crowd interference.
- Raise **Probability** at night for generative ambience.
- Change **Scale** through the day for mood shifts.
- Load specific presets with SysEx at scheduled times.

Biotron adapts to the environment without anyone touching the device.

## CC parameter map

| CC number | Parameter | Effect |
|---|---|---|
| 20 | Scale / Key | Changes the musical scale and harmonic mode |
| 21 | Note Length | Short (percussive) to long (droning) |
| 22 | Probability | Note density and trigger chance |
| 23 | Velocity | Output intensity |
| 24 | Sensitivity | Sensor reactivity |
| 25 | Threshold | Minimum change required to trigger a note |
| 26 | Smoothing | More stable to more jittery |
| 27 | Channel Mode | Plant and light channel options |
| 28 | Note Range | Octave and pitch range |

Full firmware reference: [github.com/Playtronica/biotron-firmware](https://github.com/Playtronica/biotron-firmware/tree/main/src/midi).

## SysEx — the deep configuration layer

SysEx (System Exclusive) is Biotron's device-specific command language. CC controls performance. SysEx controls structure — saving and loading presets, remote control in installations, developer access, and firmware operations.

Message format: `F0 7D [command] [data] F7`. Full specification in the firmware source: [SysexService.cpp](https://github.com/Playtronica/biotron-firmware/blob/main/src/midi/SysexService.cpp).

## SysEx command reference

| Command | Function | Use case |
|---|---|---|
| `0x01` | Request device info | Diagnostics, firmware version check |
| `0x02` | Dump settings | Save current configuration as a preset or backup |
| `0x03` | Load settings | Load a saved preset |
| `0x04` | Factory reset | Reset configuration to defaults |
| `0x05` | Firmware update handshake | Prepare the WebMIDI updater |
| `0x06` | Enter bootloader | Manual UF2 flashing |

## CC compared to SysEx

| | MIDI CC | SysEx |
|---|---|---|
| Purpose | Performance control | Structural control |
| Signal type | Continuous | Discrete |
| Typical use | Knobs and faders | Preset and device state |
| Audience | Musicians | Power users and developers |

## Example — plant profiles via SysEx

Create several configurations for different contexts — "Calm Ambient", "High Energy", "Kids Mode", "Night Ambience" — and switch between them instantly with a SysEx load command. For installations, schedule auto-resets and preset loads at specific times so Biotron adapts through the day without manual control.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Biotron Advanced #[order number]`. For firmware-level questions, the source is open on GitHub: [Playtronica/biotron-firmware](https://github.com/Playtronica/biotron-firmware).
