---
title: "Use Biotron Settings offline on Windows"
slug: biotron-offline-settings
section: software
summary: "Install once, open without internet, then release Biotron before starting your DAW."
order: 8
segment: ["music-producer", "creator"]
deflection_target: 55
status: edited-2026-08
last_edited: 2026-08-21
emoji: 📴
---

<div class="task-grid" aria-label="Choose an offline Settings task">
  <a class="task-card" href="#install-once"><span class="task-card__icon">⬇</span><span><strong>Install once</strong><small>Prepare Settings while you still have internet.</small></span></a>
  <a class="task-card" href="#open-without-internet"><span class="task-card__icon">📴</span><span><strong>Open offline</strong><small>Configure Biotron from the Windows Start menu.</small></span></a>
  <a class="task-card" href="#move-to-your-daw"><span class="task-card__icon">🎚</span><span><strong>Move to your DAW</strong><small>Release the MIDI port before Reaper or Ableton.</small></span></a>
  <a class="task-card" href="#fix-only-if-needed"><span class="task-card__icon">🛟</span><span><strong>Fix a problem</strong><small>Permission, install, clock, or held-note help.</small></span></a>
</div>

> 🧪 **Isolated beta.** Open
> [Biotron Settings beta](https://offline-integrated.biotron-midi-preview.pages.dev/#/biotron).
> It does not replace `settings.playtronica.com` or update production. It uses
> Chrome or Edge internally, but after installation the interface works
> without a website, browser tab, or internet connection.

## Install once

<ol class="steps">
  <li><strong>Close Reaper, Ableton, and other MIDI apps.</strong></li>
  <li><strong>Open the <a href="https://offline-integrated.biotron-midi-preview.pages.dev/#/biotron">Biotron Settings beta</a></strong> in desktop Chrome or Edge.</li>
  <li><strong>Allow MIDI device control.</strong> Keep the page open until the green status says <strong>Ready offline</strong>.</li>
  <li><strong>Install the app.</strong> In Chrome, use the install icon or <strong>More → Cast, save and share → Install page as app</strong>. In Edge, use <strong>App available → Install</strong>.</li>
  <li><strong>Open Playtronica Settings once from Windows Start</strong> while you are still online.</li>
</ol>

> 💡 The offline copy belongs to the browser profile that installed it. Clearing
> that profile's site data removes the copy; repeat these steps afterwards.

## Open without internet

<ol class="steps">
  <li>Disconnect Wi-Fi or Ethernet.</li>
  <li>Open <strong>Playtronica Settings</strong> from Windows Start.</li>
  <li>Check for <strong>Offline — Settings are available</strong>.</li>
  <li>Connect one Biotron, select it, and change the settings you need.</li>
</ol>

Firmware update stays disabled offline. The app must find a valid online
firmware file before it can send a BOOT command.

## Move to your DAW

On Windows, use one application at a time:

<ol class="steps">
  <li>Finish configuring Biotron.</li>
  <li>Select <strong>Release device for DAW</strong>, then close Settings.</li>
  <li>Open Reaper or Ableton and enable Biotron as a MIDI input.</li>
  <li>When you need Settings again, close Biotron in the DAW, reopen Settings, and select <strong>Reconnect settings</strong>.</li>
</ol>

If the DAW still cannot open the device, close every Chrome, Edge, and Settings
window. Reconnect the USB cable, then enable Biotron in the DAW again.

<details>
<summary>Send MIDI from Reaper to Biotron</summary>
<ol>
  <li>Open <strong>Options → Preferences → Audio → MIDI Devices</strong>.</li>
  <li>Enable Biotron under <strong>MIDI outputs</strong>.</li>
  <li>Open the sending track's <strong>Routing</strong>.</li>
  <li>Choose Biotron under <strong>MIDI Hardware Output</strong>.</li>
</ol>
<p>Incoming CC is still experimental. Use occasional test values, not fast automation, until a tested firmware release is linked from the <a href="/software/biotron-midi-cc/">MIDI guide</a>.</p>
</details>

## Fix only if needed

<details>
<summary>There is no “Ready offline” message</summary>
<p>Stay online, reload the beta, and wait for the green status before installing. Do not assume the app is cached while the status is still pending.</p>
</details>

<details>
<summary>There is no install icon</summary>
<p>Use the browser menu path in step 4. See the official <a href="https://support.google.com/chrome/answer/9658361">Chrome web app instructions</a> or <a href="https://learn.microsoft.com/microsoft-edge/progressive-web-apps/ux">Edge PWA instructions</a>.</p>
</details>

<details>
<summary>MIDI permission was denied</summary>
<p>Open site settings for <code>offline-integrated.biotron-midi-preview.pages.dev</code>, allow MIDI device control, and reload. Close other MIDI applications first.</p>
</details>

<details>
<summary>MIDI Clock changes the plant timing</summary>
<p>MIDI Clock is not required for CC. In Reaper's Biotron output configuration, turn off <strong>Send clock to this device</strong> if you want Biotron to keep its own timing.</p>
</details>

<details>
<summary>A synth holds a note</summary>
<p>Use the synth's <strong>Panic</strong> or <strong>All Notes Off</strong> control. If it returns, stop playback, disable the Biotron input and output, reconnect USB, and save a short MIDI log for support.</p>
</details>

<details>
<summary>What the offline beta does not do</summary>
<ul>
  <li>It does not remove the Chrome or Edge engine.</li>
  <li>It does not install on a computer that has never been online.</li>
  <li>It does not download or update firmware offline.</li>
  <li>It does not let Settings and a DAW share one exclusive MIDI port.</li>
  <li>It does not make fast incoming CC automation release-ready.</li>
</ul>
</details>

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with your
Windows version, browser, DAW, and the exact error. Add one screenshot of
**Options → Preferences → Audio → MIDI Devices**. We aim for 24 hours, but a
reply may take up to 3 business days.
