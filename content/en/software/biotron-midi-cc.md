---
title: "Biotron MIDI: CC mapping, iPad setup, and powering synths over TRS"
slug: biotron-midi-cc
section: software
summary: "How Biotron sends CC90, accepts MIDI CC from a DAW or fader box, avoids Windows MIDI-port conflicts, and works without the settings website."
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
This article covers what CC90 is, how to control Biotron from a DAW or fader
box, how to avoid Windows MIDI-port conflicts, and how to use Biotron without
keeping the settings website open.

---

## What CC90 means

When Biotron detects a signal, it sends two things at once:

- **Note-on / note-off** — a standard MIDI note (pitch + velocity) for
  triggering synths, samplers, and DAWs that respond to notes.
- **CC90** — a continuous controller on the same channel, ranging from 0 to
  127. It reflects how strong the detected signal is.

CC90 is not documented on the product page. That is a known gap — we get
questions about it regularly. The short answer: CC90 is useful when you want
smooth, continuous modulation (filter cutoff, reverb amount, expression)
instead of discrete note triggers.

> **Example in Ableton Live:** create a MIDI track, open the MIDI Map mode,
> click a macro knob, then touch your plant. Biotron's CC90 will be detected
> and mapped automatically.

---

## Important: Biotron sends and receives CC

Biotron's **output CC90** is sensor data going from Biotron to your DAW.
Biotron also accepts a separate set of **incoming CC messages** that change
its musical settings. These are two different directions.

**Steps:**

The firmware recognises the incoming CC map below, but continuous live control
is currently **experimental**. Current firmware may save settings too often
during a fast fader sweep. Until the next firmware update is verified, use the
map only for occasional parameter changes — not automation, LFOs, or rapid
fader performance.

### Incoming CC map (current firmware)

| CC | Parameter |
|---:|---|
| 3 | Sensor smoothing / delay |
| 9 | Maximum note velocity |
| 14 | Tempo / light-note ratio |
| 15 | Ultra sensitivity |
| 20 | Note repeat |
| 21 | Note hold |
| 22 | Step size |
| 23 | Wake-up threshold |
| 24 | Scale |
| 25 | Minimum note velocity |
| 26 | Humanize velocity |
| 27 | Light pitch-bend mode |
| 28 | Light-note range |
| 30 | Manual-control mode |
| 31 | Mute |
| 85 | Home note |
| 86 | Swing |
| 87 | Button mute state |

Send on **MIDI channel 1** to control the plant sensor and **MIDI channel 2**
to control the light sensor. For switches such as Mute, values 0–63 mean off
and 64–127 mean on.

### Reaper setup (experimental incoming control)

1. Close `settings.playtronica.com`, or click **Release device for DAW** on
   the settings page.
2. In Reaper, open **Options → Preferences → Audio → MIDI Devices**.
3. Right-click **Biotron** under MIDI outputs and choose **Enable output**.
4. Create a track for your fader box. Set its input to the fader box and its
   **MIDI hardware output** to Biotron.
5. Set the fader box or track to channel 1 (plant) or channel 2 (light), and
   assign a CC number from the table above.

If Reaper says **Failed to open device**, another application still owns the
port. Close Chrome completely, disconnect and reconnect Biotron, then enable
the device in Reaper again.

## Offline use

Biotron stores settings on the device and plays without the website. The
settings web app is cached for offline use after one successful online visit.
For a live set, configure and save the preset before going offline. Do not use
rapid incoming CC automation until the firmware update described above has
been released and verified.

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
