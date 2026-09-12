---
title: "Use Biotron Settings offline on Windows"
slug: biotron-offline-settings
section: software
summary: "Install the Biotron Settings beta once in Chrome or Edge, then reopen it without internet and hand the MIDI port to your DAW."
order: 8
segment: ["music-producer", "creator"]
deflection_target: 55
status: edited-2026-09
last_edited: 2026-09-11
emoji: 📴
---

<div class="task-grid" aria-label="Choose an offline Settings task">
  <a class="task-card" href="#prepare-offline-settings-once"><span class="task-card__icon">⬇</span><span><strong>Prepare once</strong><small>Use Chrome or Edge while online.</small></span></a>
  <a class="task-card" href="#check-it-with-the-network-off"><span class="task-card__icon">📴</span><span><strong>Check offline</strong><small>Restart the installed app with the network off.</small></span></a>
  <a class="task-card" href="#move-to-your-daw"><span class="task-card__icon">🎚</span><span><strong>Move to your DAW</strong><small>Release the MIDI port before Reaper or Ableton.</small></span></a>
  <a class="task-card" href="#stop-safely-if-the-device-disappears"><span class="task-card__icon">⏹</span><span><strong>Stop safely</strong><small>Check Windows before assuming a firmware fault.</small></span></a>
</div>

> 🧪 **Field-test beta — not yet approved for performance use.** It does not
> replace `settings.playtronica.com` or change the production site.

## Prepare offline Settings once

The computer needs internet for this one-time preparation and for firmware
downloads. It does not need internet each time you configure or play Biotron.

<ol class="steps">
  <li><strong>Close Reaper, MIDI-OX and other MIDI apps.</strong></li>
  <li><strong>Open the <a href="https://d4b98280.biotron-settings-beta.pages.dev/#/biotron/play">Biotron Settings beta</a> in current Chrome or Edge.</strong></li>
  <li><strong>Connect one Biotron and allow MIDI device access.</strong></li>
  <li><strong>Wait for the green “Offline mode is ready” message.</strong> Do not disconnect the network before it appears.</li>
  <li><strong>Install the page from the browser address bar.</strong> If no install icon appears, use Chrome's menu → <strong>Cast, save and share → Install page as app</strong>, or Edge's menu → <strong>Apps → Install this site as an app</strong>.</li>
</ol>

There is no separate `.exe` or administrator step. The installed copy uses the
same Chrome or Edge profile that prepared it.

## Check it with the network off

<ol class="steps">
  <li><strong>Close every beta and browser window.</strong></li>
  <li><strong>Turn off Wi-Fi or disconnect Ethernet.</strong></li>
  <li><strong>Launch the installed Biotron Settings app.</strong></li>
  <li><strong>Connect Biotron and change one reversible setting.</strong> Confirm the device responds before changing anything else.</li>
</ol>

Offline mode includes the Settings interface, saved presets and browser sound.
Firmware download and update still require internet; the offline page must not
start an update without first verifying the firmware file.

If the page says offline setup did not finish, reconnect the network, choose
**Retry**, wait for the green ready message and repeat the four-step check once.

## Move to your DAW

Windows may allow only one application to use a MIDI port at a time.

<ol class="steps">
  <li>In Settings choose <strong>Release device for DAW</strong>.</li>
  <li>Open Reaper or Ableton and enable a Biotron MIDI input or output.</li>
  <li>If Windows lists two Biotron ports, do not treat them as plant and light channels. Use the port the DAW opens; choose MIDI channel 1 for incoming plant-setting CC.</li>
  <li>Before returning to Settings, close the Biotron port in the DAW, then choose <strong>Reconnect settings</strong>.</li>
</ol>

This is a handoff, not simultaneous sharing. See the exact port and channel
explanation in [Biotron MIDI and CC](/software/biotron-midi-cc/).

MIDI Clock is not required for CC. In Reaper's Biotron output settings, leave
**Send clock to this device** off unless you deliberately want the DAW to set
Biotron's musical timing.

## Stop safely if the device disappears

Green LEDs prove power only. They do not prove that Windows can see USB MIDI.

1. Stop playback and rapid MIDI messages.
2. Close Settings, browsers, Reaper and MIDI-OX.
3. Disconnect Biotron once and open **Device Manager → Sound, video and game controllers**.
4. Reconnect with a known USB data cable.
5. If Biotron remains absent from both Device Manager and MIDI-OX, stop. Do not reflash firmware from this symptom alone.

If Windows becomes unstable or repeatedly restarts, leave Biotron disconnected
until Windows starts normally.

<details>
<summary>What this beta does not claim</summary>
<ul>
  <li>It does not update firmware without internet.</li>
  <li>It does not let Settings and a DAW share one exclusive MIDI port.</li>
  <li>It does not make rapid incoming CC automation release-ready.</li>
  <li>It has not completed physical acceptance on every Windows version and browser.</li>
</ul>
</details>

## Still stuck

Stop at the first failure. Email [support@playtronica.com](mailto:support@playtronica.com)
with the failed step and one screenshot; do not repeat the whole setup.

We aim for 24 hours, but a reply may take up to 3 business days.
