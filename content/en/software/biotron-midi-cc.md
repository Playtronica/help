---
title: "Biotron MIDI: CC mapping, iPad setup, and powering synths over TRS"
slug: biotron-midi-cc
section: software
summary: "What current firmware source says about Biotron CC90 and experimental incoming MIDI CC, plus a cautious Reaper test route."
segment: ["music-producer", "creator"]
deflection_target: 25
status: new-2026-06
last_edited: 2026-06-20
emoji: 🎹
---

# Biotron MIDI: CC mapping, iPad setup, and powering synths over TRS

Biotron sends MIDI over USB. By default it sends note-on and note-off
messages when it detects a signal from your plant or cables. It also sends
**CC90** — a continuous controller message that reflects signal intensity.
This article covers CC90 and how to test incoming commands found in the current
firmware source. Incoming control has not completed hardware burst and
persistence testing, so it is not a supported live-control workflow.

---

## What CC90 means

When Biotron detects a signal, it sends two things at once:

- **Note-on / note-off** — a standard MIDI note (pitch + velocity) for
  triggering synths, samplers, and DAWs that respond to notes.
- **CC90** — a continuous controller on the configured plant channel. Current
  firmware source emits values in the MIDI range 0–127.

CC90 is not documented on the product page. That is a known gap — we get
questions about it regularly. The short answer: CC90 is useful when you want
smooth, continuous modulation (filter cutoff, reverb amount, expression)
instead of discrete note triggers.

> Check the exact response with a MIDI monitor and your installed firmware. Do
> not treat CC90 as calibrated biological data.

---

## Important: Biotron sends and receives CC

Biotron's **output CC90** is sensor data going from Biotron to your DAW.
Biotron also accepts a separate set of **incoming CC messages** that change
its musical settings. These are two different directions.

The firmware recognises the incoming CC map below, but continuous live control
is currently **experimental**. Current firmware may save settings too often
during a fast fader sweep. Until the next firmware update is verified, use the
map only for occasional parameter changes — not automation, LFOs, or rapid
fader performance.

### Incoming CC map (current firmware)

| CC | Firmware setting | Scope |
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

The parser receives zero-based channels: **MIDI channel 1** selects the plant
setting and **MIDI channel 2** selects the light setting only where the table
says **Channel-specific**. Global commands ignore the incoming channel.
Boolean thresholds and value mappings differ by command; these source-derived
labels are not yet a final public control specification.

### Reaper setup (experimental incoming control)

1. Close `settings.playtronica.com`. A future build may show **Release device
   for DAW**; do not expect that control unless it is visible.
2. In Reaper, open **Options → Preferences → Audio → MIDI Devices**.
3. Right-click **Biotron** under MIDI outputs and choose **Enable output**.
4. Create a track for your fader box. Set its input to the fader box and its
   **MIDI hardware output** to Biotron.
5. For a channel-specific command, use channel 1 (plant) or channel 2 (light).
   For a global command, either channel reaches the same setting in current
   source.

If Reaper says **Failed to open device**, another application still owns the
port. Close Chrome completely, disconnect and reconnect Biotron, then enable
the device in Reaper again.

## Offline use

Biotron can play from its stored configuration without keeping the settings
website open. Do not assume the website itself reloads offline: offline caching
is being tested in a separate unreleased change. Configure while online, close
the page, and verify the complete setup before travelling. Do not use rapid
incoming CC automation until a release passes physical burst and persistence
tests.

---

## The settings page only works on desktop

If you open settings.playtronica.com on an iPad or iPhone, you will see a
message that it only works on a computer. This is a browser limitation — the
Web MIDI API that the settings page uses is not supported on mobile browsers
or Safari.

**The settings page requires:**
- A laptop or desktop computer (Windows or macOS)
- Google Chrome or Microsoft Edge (not Safari, not Firefox)
- A direct USB connection (avoid USB hubs if possible)

You cannot change Biotron's settings from an iPad. If an iPad is your only
device, ask someone with a laptop to connect Biotron once and apply the
settings — the configuration stays on the device.

---

## Using Biotron with iPad and GarageBand

You can play Biotron from an iPad even though you cannot change settings from
one. GarageBand on iPad receives MIDI over USB natively.

**What you need:**
- Apple Lightning-to-USB Camera Adapter (older iPads) or USB-C hub (newer iPads)
- The Biotron's USB cable

**Steps:**

1. Connect the USB adapter to your iPad.
2. Plug Biotron into the USB adapter.
3. Open GarageBand on your iPad.
4. Choose an instrument (e.g. keyboard, sampler).
5. Touch your plant or conductive object. Biotron will trigger notes inside
   GarageBand.

GarageBand does not display MIDI channels or CC values. It simply plays the
instrument assigned to the current track. If you hear nothing, check that
GarageBand's track is set to receive MIDI from external sources — tap the
track, tap the plug icon, and make sure **MIDI input** is enabled.

> If Biotron lights up but produces no sound, the notes channel may be muted.
> You will need to borrow a laptop to open settings.playtronica.com and
> re-enable notes.

---

## Powering Biotron when using TRS MIDI

Biotron connects to most DAWs and computers over USB, which provides both
data and power. When you connect Biotron to a hardware synthesizer using a
**TRS MIDI cable** (3.5 mm stereo jack to standard 5-pin DIN), the synth
receives MIDI data — but the TRS cable carries no power.

This means **Biotron will not turn on** using a TRS cable alone.

**Solution: power Biotron separately over USB while sending MIDI via TRS.**

You need a USB power source that does not also try to send MIDI data. Any of
these work:

- A USB wall adapter (5 V, any current rating)
- A USB battery pack
- A powered USB hub (use a separate port from the TRS adapter)

**Setup:**

1. Plug the TRS MIDI cable into Biotron's TRS port.
2. Plug the other end into your synth's MIDI In.
3. Plug a USB power cable into Biotron's USB port.
4. Connect the USB cable to a wall adapter or battery pack — **not** to your
   computer. Connecting to a computer at the same time will route MIDI over
   USB instead of TRS.
5. Power on everything. Biotron's LED will light. Touch your plant. Your
   synth should receive the note-on messages.

> If your synth still receives no MIDI, check whether it expects **TRS Type A**
> or **TRS Type B**. Biotron uses **Type A** (compatible with Arturia
> MiniLab, Teenage Engineering OP-1, most modern gear). If your synth uses
> Type B, you need a Type A–to–Type B adapter.

---

## Quick self-test

Press the fingerprint button on Biotron. The device sends a short burst of
MIDI notes on channel 2. If your DAW or MIDI monitor shows those notes, the
device is working and the problem is in your connection or DAW routing — not
the hardware.

---

## Still stuck?

Email **support@playtronica.com** with:
- A short video showing the full connection and what happens when you touch the plant
- Your operating system and DAW name
- Whether the self-test (fingerprint button) produces notes in your MIDI monitor

We aim for 24 hours, but a reply may take up to 3 business days.
