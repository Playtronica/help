---
title: "Use Biotron Settings offline on Windows"
slug: biotron-offline-settings
section: software
summary: "Install Playtronica Settings once, then configure Biotron without an internet connection and hand the MIDI port back to your DAW."
order: 8
segment: ["music-producer", "creator"]
deflection_target: 55
status: new-2026-08
last_edited: 2026-08-20
emoji: 📴
---

Playtronica Settings can be installed from Chrome or Edge and then launched
from Windows without an internet connection. No ZIP, terminal, administrator
mode, or firmware flash is required.

> 🧪 **Beta:** this guide uses the isolated
> [Biotron Settings beta](https://offline-integrated.biotron-midi-preview.pages.dev/#/biotron).
> It does not replace or modify `settings.playtronica.com`. Do not use the beta
> to update firmware.

> **Important boundary:** this is an installed web app powered by Chrome or
> Edge, not a native application. After the first online installation, the
> settings interface works offline. Firmware downloads still require internet.

## Install once while online

1. Close Reaper, Ableton, and other MIDI applications.
2. In desktop Chrome or Edge, open
   [Biotron Settings beta](https://offline-integrated.biotron-midi-preview.pages.dev/#/biotron).
3. Allow **MIDI device control** when the browser asks. Keep the page open until
   the green message says **Ready offline**.
4. Install the app:
   - **Chrome:** select the install icon in the address bar, or choose
     **More → Cast, save and share → Install page as app**.
   - **Edge:** select the **App available** icon in the address bar, then
     **Install**.
5. Close the browser window. Open **Playtronica Settings** from the Windows
   Start menu once while still online.

Chrome and Edge keep the installed app inside the browser profile used for the
installation. Clearing that profile's site data removes the offline copy, so
repeat the installation steps afterwards.

## Use it without internet

1. Disconnect Wi-Fi or Ethernet.
2. Open **Playtronica Settings** from the Windows Start menu.
3. Confirm the green status says **Offline — Settings are available**.
4. Connect Biotron, select it in the app, and change the settings you need.

The firmware update button is disabled offline. It will not put Biotron into
BOOT mode unless an online firmware file has first been found.

## Move from Settings to Reaper or Ableton

The safest workflow on Windows is to let only one application use Biotron at a
time:

1. Finish configuring Biotron.
2. Select **Release device for DAW**, then close Playtronica Settings.
3. Open your DAW and enable Biotron's MIDI input. Enable its MIDI output
   separately only when the DAW needs to send MIDI back to Biotron.
4. When you want to configure Biotron again, close the MIDI device in the DAW,
   reopen Playtronica Settings, and select **Reconnect settings**.

If the DAW still reports that the device cannot be opened, close every Chrome,
Edge, and Playtronica Settings window, disconnect and reconnect Biotron, then
enable it in the DAW again. The Release button explicitly closes the selected
Web MIDI ports, but MIDI drivers differ; closing the app is the reliable
fallback.

### Reaper: enable the output to Biotron

1. Open **Options → Preferences → Audio → MIDI Devices**.
2. Under **MIDI inputs**, right-click Biotron and choose **Enable input**.
3. Under **MIDI outputs**, right-click Biotron and choose **Enable output**.
4. On the track that should send MIDI to Biotron, open **Routing** and choose
   Biotron under **MIDI Hardware Output**.

Incoming MIDI CC control is still experimental. Do not use fast fader
automation until a tested firmware release is linked from the
[Biotron MIDI CC guide](/software/biotron-midi-cc/).

## What this offline app does not do

- It does not remove the Chrome/Edge Web MIDI engine.
- It does not provide a first installation on a computer that has never been
  online.
- It does not download or update firmware while offline.
- It does not guarantee that Settings and a DAW can hold the same MIDI port at
  the same time.
- It does not make experimental incoming MIDI CC automation release-ready.

## If installation or MIDI access fails

- **No Ready offline message:** stay online, reload the page, and wait for the
  green status before installing.
- **No install icon:** use the browser menu path above. Chrome's official
  [web app instructions](https://support.google.com/chrome/answer/9658361)
  and Microsoft's official
  [Edge PWA instructions](https://learn.microsoft.com/microsoft-edge/progressive-web-apps/ux)
  show the current controls.
- **MIDI permission denied:** open the browser's site settings for
  `offline-integrated.biotron-midi-preview.pages.dev`, allow MIDI device
  control, and reload.
- **Biotron is missing:** use a USB data cable, connect directly rather than
  through a hub, and close other MIDI applications.

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with your
Windows version, browser, DAW, and the exact message shown by Settings or the
DAW. A screenshot of **Options → Preferences → Audio → MIDI Devices** is
usually enough for the first diagnosis.
