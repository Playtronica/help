---
title: "Orbita — rotating MIDI sequencer"
slug: orbita
section: devices
summary: "Orbita is a rotating MIDI sequencer with coloured magnets and four tracks."
order: 5
status: edited-2026-05
emoji: 🌀
---

> ⚠️ **Orbita does not produce sound on its own.** Orbita is a MIDI sequencer. It sends MIDI signals to a sound source — a synth, a DAW, or a music app. Without a sound source you will not hear anything.

> ⚠️ **Handle only the parts shown in this guide.** Touch the orbit ring, the central encoder, the side buttons, and the USB-C connector. Do not touch the underside of the PCB, the solder joints, or the exposed chips — even when the device is unplugged. The board is durable, but those areas can be damaged permanently. Treat the rest of the device the way you would treat the back of a phone screen.

> 🛠️ **Want to go deeper?** See the [Orbita deep dive](/devices/orbita-advanced/) for note-mapping JSON, encoder and button MIDI CC, sync, and firmware tricks.

<img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/1c0b6a18-c429-4d7b-a503-b11d0de0bd9f/untitled/w=1920,quality=90,fit=scale-down" alt="Orbita rotating MIDI sequencer — top view of the round device with coloured magnets on its tracks" style="width:100%;border-radius:10px;margin:16px 0;display:block">

Each colour magnet triggers a different MIDI note as the disc spins. Place and move the magnets on the four tracks to build rhythms and melodies you can see, touch, and hear — once connected to your sound source.

## What you need to make sound

Orbita needs a sound source. Three options:

- **Mobile app** — Koala Sampler, Dawnbeat, or King of FM on an iPhone, iPad, or Android phone with a USB adapter.
- **Computer** — any DAW (Ableton, Logic, FL Studio) or MIDI-compatible software, over USB.
- **Hardware synth** — any MIDI-compatible synthesizer or sound module, over USB or a 5-pin MIDI cable.

## Quick start

<img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/5d278695-a9f1-4ca7-80c0-ea538951c7b4/image/w=1920,quality=90,fit=scale-down" alt="Orbita labelled diagram — the four magnetic tracks, the R/B/I/T buttons, the A button, and the central O button" style="width:100%;border-radius:10px;margin:16px 0;display:block">

1. **Plug Orbita into your sound source** with the USB cable from the box, or with a MIDI cable to a hardware synth.
2. **Place coloured magnets on the four tracks.** Each colour triggers a different MIDI note. Each track is a different octave by default.
3. **Press Start.** Rotate the encoder to change the speed.
4. **Press the R, B, I, T buttons to mute and unmute tracks.**
5. **Long-press the A button to record your mute states and speed changes.** Press A again to play the recording. Press A a third time to reset.

{{ youtube: kk6ud9xuAy0 title="Getting started with Orbita Color Sequencer" }}

## Note mapping

Orbita has **four magnetic tracks** (the four circles) and magnets in **seven primary colours**. Each colour can be mapped to a MIDI note. Each track can have a different colour mapping.

By default, Orbita plays in **C major across 4 octaves**. The same colour on a different track plays the same note in a different octave. If you are using a sampler app like Koala, you can switch to Chromatic mode or set the MIDI note numbers manually.

## Track parameters

For each track you can set:

- **Note length** — short for percussive, long for sustained.
- **Velocity** — how hard each note plays.
- **Probability** — at 100%, every note plays. At 50%, half the notes play, chosen at random and different on each revolution. Use probability to avoid repetitive sequences.

Each track can be remotely muted and unmuted from the buttons or from the web settings page.

## Motor controls

You can turn the motor on and off, and change its speed. Both controls can be operated remotely with MIDI CC.

## Web settings page

Open [playtronica.github.io/WebMidiOrbita](https://playtronica.github.io/WebMidiOrbita/) in Brave or Chrome to configure Orbita: colour-to-note mapping, track parameters, MIDI channels, and saved presets.

<img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/5a4c994a-0425-4372-a849-5728aa91c32d/image/w=1920,quality=90,fit=scale-down" alt="Orbita web settings page — colour-to-note mapping and per-track parameters" style="width:100%;border-radius:10px;margin:16px 0;display:block">

Settings can be saved to the device. The next time you turn Orbita on, the saved settings load automatically, even without the web remote.

## Looper mode

The Looper lets you record when each track turns on and off, so you are not stuck with the same short loop repeating. You can build longer sequences that change over time.

1. **Press the A button** to enter Looper mode and start recording mute and unmute gestures.
2. **Press A again** to stop recording. The loop plays back.
3. **Press A a third time** to cancel the Looper mode.

## Select the global MIDI channel

Touch the **O button** for more than 3 seconds. All MIDI channels reset to channel 1. You can then enter the channel you want Orbita to send notes on. You can also set an individual channel for each track.

<img src="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/b103933b-c20f-4668-8f34-bdaa67a216e9/image/w=1920,quality=90,fit=scale-down" alt="Orbita MIDI channel reference — table of button combinations and the channel each combination selects" style="width:100%;border-radius:10px;margin:16px 0;display:block">

## Experimental — colour to MIDI CC

Orbita can translate colours into MIDI CC values instead of MIDI notes. CC values let you control effects or instrument parameters such as echo amount or volume. In CC mode, the selected channel sends a CC value based on the scanned colour's hue (red = 0 to purple = 127 on the colour wheel).

You can build a colour sequence on paper, in a collage, in 3D print, or with sticky notes on Orbita's turntable. In CC mode, the values are transmitted continuously even when there are no magnets and Orbita is stationary.

A second experimental feature is **velocity by chance** — velocity changes randomly on each revolution.

## I have no MIDI out

Orbita may have switched to MIDI CC mode by accident.

1. **Press and hold any of the R, B, I, or T buttons for more than 3 seconds.** The O light blinks rapidly.
2. **Check the R, B, I, or T light.** If the light is on, the device is in MIDI CC mode. If the light is off, the device is in MIDI Note mode.
3. **Switch back to MIDI Note mode** if you want notes again.

## Firmware update

[Download the latest firmware from this Google Drive folder](https://drive.google.com/drive/folders/1QQiIqX-KBK7CpjOTCoDgI7TUjMP48XjU?usp=drive_link).

### Step 1 — clean the device

1. Plug Orbita into your computer with the USB cable from the box.
2. While plugging in, **press and hold the button behind the USB-C port** on the bottom PCB.
3. Keep holding the button until your computer detects Orbita as a removable drive.
4. Drag the `flash_nuke` file onto the Orbita drive.
5. Wait for the device to reset and reappear as a drive.

### Step 2 — install the new firmware

6. Drag the new firmware file onto the Orbita drive.
7. Once the transfer finishes, Orbita reboots automatically with the updated firmware.

## Recommended apps and synths

- **[Koala Sampler](https://www.koalasampler.com/)** — iPad and iPhone sampler. Strong with Orbita.
- **[Dawnbeat](https://www.dawnbeat.com/)** — iPad and iPhone DAW.
- **[King of FM](https://apps.apple.com/us/app/king-of-fm-dx-synth-e-piano/id1672644102)** — DX-style FM synth on iOS.
- **[Elastic OSC](https://mominstruments.com/elasticosc/)** — paid, made by friends of Playtronica, very good sound.
- **[Dots Piano](https://dotpiano.com/)** — web piano in Brave or Chrome.
- **[synth.playtronica.com](https://synth.playtronica.com)** — our curated library of web synths.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Orbita issue #[order number]`. We aim for 24 hours, but a reply may take up to 3 business days.
