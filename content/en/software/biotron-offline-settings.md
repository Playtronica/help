---
title: "Use Biotron Settings offline on Windows"
slug: biotron-offline-settings
section: software
summary: "Download one Windows beta file, configure without internet, then release Biotron before starting your DAW."
order: 8
segment: ["music-producer", "creator"]
deflection_target: 55
status: edited-2026-08
last_edited: 2026-08-26
emoji: 📴
---

<div class="task-grid" aria-label="Choose an offline Settings task">
  <a class="task-card" href="#download-the-windows-beta"><span class="task-card__icon">⬇</span><span><strong>Download one file</strong><small>No installer, command line, or administrator account.</small></span></a>
  <a class="task-card" href="#configure-biotron-offline"><span class="task-card__icon">📴</span><span><strong>Configure offline</strong><small>The file opens Settings locally in Chrome or Edge.</small></span></a>
  <a class="task-card" href="#move-to-your-daw"><span class="task-card__icon">🎚</span><span><strong>Move to your DAW</strong><small>Release the MIDI port before Reaper or Ableton.</small></span></a>
  <a class="task-card" href="#stop-safely-when-something-disappears"><span class="task-card__icon">⏹</span><span><strong>Stop safely</strong><small>Check Windows before assuming a firmware fault.</small></span></a>
</div>

> 🧪 **Field-test beta — not yet approved for performance use.** The team is
> testing this exact build on Windows with real Biotron hardware. It does not
> replace `settings.playtronica.com` or change the production site.

## Download the Windows beta

Open the permanent [Biotron Settings Offline beta download](https://biotron-settings-beta.pages.dev/).
The page includes the Windows file, a small Reaper test clip, and the exact
SHA-256 checksum. The link does not use an expiring email signature.

<ol class="steps">
  <li><strong>Download <code>Biotron-Settings-Offline-Windows-x64.exe</code>.</strong> You may copy it to an offline computer with a USB drive.</li>
  <li><strong>Keep Chrome or Edge installed.</strong> The beta opens its local Settings interface in that browser engine; the internet is not used.</li>
  <li><strong>Run it as your normal Windows user.</strong> It is unsigned, so Windows may show <strong>More info → Run anyway</strong>. Never choose <strong>Run as administrator</strong>.</li>
  <li><strong>If it starts only as administrator, stop.</strong> Do not work around it. Send support a screenshot of the Windows message.</li>
</ol>

The beta needs no installation, Node, CMD, PowerShell, or runtime download.
When it opens, the address starts with `http://127.0.0.1`; that is the same
computer, not an external website.

## Configure Biotron offline

<ol class="steps">
  <li><strong>Close Reaper, Ableton, MIDI-OX, browser Settings pages, and other MIDI apps.</strong></li>
  <li><strong>Connect one Biotron directly with a USB data cable.</strong></li>
  <li><strong>Open the downloaded beta and allow MIDI device control.</strong></li>
  <li><strong>Change one reversible setting.</strong> Confirm the device responds before changing anything else.</li>
</ol>

Firmware update stays disabled offline. The beta must never send a BOOT command
when it cannot first verify an online firmware file.

## Move to your DAW

Windows MIDI ports may be available to only one app at a time.

<ol class="steps">
  <li>Finish configuring Biotron.</li>
  <li>Select <strong>Release device for DAW</strong>, then close the beta window.</li>
  <li>Open Reaper or Ableton and enable Biotron as a MIDI input.</li>
  <li>To return to Settings, close Biotron in the DAW, reopen the beta, and select <strong>Reconnect settings</strong>.</li>
</ol>

This is a handoff, not simultaneous sharing. If the DAW still cannot open the
device, close every Chrome, Edge, Settings, and MIDI utility window. Reconnect
USB once, then retry in the DAW.

## Stop safely when something disappears

Green LEDs prove that Biotron has power. They do **not** prove that Windows has
recognised its USB MIDI interface.

1. Stop playback and rapid MIDI messages.
2. Disconnect Biotron. Close the beta, browsers, Reaper, and MIDI-OX.
3. Reopen **Device Manager → Sound, video and game controllers**.
4. Connect Biotron directly with a known USB data cable once.
5. If it is absent from both Device Manager and MIDI-OX, stop. Do not reflash
   firmware from this symptom alone. Save screenshots and contact support.

If Windows becomes unstable or restarts repeatedly, leave Biotron disconnected
until Windows starts normally. Do not reconnect it just to continue the test.

<details>
<summary>MIDI Clock changes the plant timing</summary>
<p>MIDI Clock is not required for CC. In Reaper's Biotron output configuration, turn off <strong>Send clock to this device</strong> if you want Biotron to keep its own timing.</p>
</details>

<details>
<summary>A synth holds a note</summary>
<p>Stop playback and use the synth's <strong>Panic</strong> or <strong>All Notes Off</strong> control. If it returns, disable the Biotron route and save a short raw MIDI log. Do not continue dense-message testing.</p>
</details>

<details>
<summary>What this beta does not claim</summary>
<ul>
  <li>It is not signed and does not have completed physical Windows acceptance.</li>
  <li>It does not remove the Chrome or Edge engine.</li>
  <li>It does not download or update firmware offline.</li>
  <li>It does not let Settings and a DAW share one exclusive MIDI port.</li>
  <li>It does not make rapid incoming CC automation release-ready.</li>
</ul>
</details>

## Browser-installed offline copy

We are also testing a version installed from Chrome or Edge after one online
visit. One field test opened successfully once and then failed on the next
offline launch, so this route is not the recommended recovery path yet. The
next beta reports a stable error code and can copy a privacy-bounded diagnostic
report instead of showing only a generic error.

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with your
Windows version, browser, DAW, the exact error, and one screenshot of both
**Device Manager** and **Options → Preferences → Audio → MIDI Devices**.

We aim for 24 hours, but a reply may take up to 3 business days.
