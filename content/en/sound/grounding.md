---
title: "Grounding — how and why"
slug: grounding
section: sound
summary: "Ground has to reach your skin — never a radiator, a pipe, or your laptop. Five ways to ground yourself, plus ground patterns for installations."
order: 1
segment: ["music-producer"]
deflection_target: 20
status: rewritten-2026-08
last_edited: 2026-08-03
emoji: 💡
---

**One rule: the ground has to reach your skin.**

Playtron and TouchMe work by conductivity. Your body is the part of the circuit that closes the loop. So the ground pin has to end up connected to *you* — your hand, your finger, your wrist, a surface you are touching. Ground that goes to a radiator, a pipe, or your laptop instead of to you does nothing, and the device stays silent.

> ⚠️ **Ground is not "earth" here.** It is not the floor, not the building, not the mains. It is the second contact of the circuit, and you are the wire between the two contacts.

This page is mainly for Playtron. TouchMe uses the same principle with its two pads. Biotron and Scales do not use grounding — see the notes at the end.

## How Playtron works

Picture an electrical circuit with two ends. Both ends have to be connected for current to flow.

- The **16 alligator-clip pins** are one end.
- The **two golden ground pins on the pointed corner** are the other end.

Touch an object clipped to a pin with one hand, and touch the ground corner — or anything conductive connected to it — with the other hand. The circuit closes through your body and the note plays. Leave the ground side untouched and it is the same as switching off a lamp: nothing flows, nothing sounds.

Playtron's LED stays dark when you plug it in. That is normal. It blinks each time you close the circuit, so the LED is your check that grounding works.

{{ youtube: ixZ_ac3A47Q title="How to ground Playtron — Playtronica tutorial" }}

## Five ways to ground yourself

All five put the ground in contact with your skin. Use whichever fits what you are doing.

{{ youtube: JC2lzwe_NwQ title="Four easy ways to ground your Playtron — Playtronica tutorial" }}

### 1. Bare skin on the pointed corner

Hold the pointed corner of Playtron with bare skin — a finger, a palm, the side of your hand. Play objects with the other hand. This needs no accessories and is the most reliable method.

### 2. Hold a ground cable

Clip an alligator cable to the pointed corner and keep the metal end in your hand. Useful when the device sits far away, on a table or in a rack.

### 3. Wear the ground

Clip the ground cable to something you are already wearing against your skin:

- a metal ring or a metal wristband,
- the metal parts of a watch strap or a belt buckle,
- the edge of a t-shirt or a waistband where the clip touches skin.

This is the pattern for live performance — the cable is hidden and your hands stay free. If notes get weak, move the clip so metal touches skin directly.

### 4. Hold a second object

Clip the ground cable to another conductive object — an orange, a metal spoon, a glass of water — and keep that object in your hand while you play the others. This is the setup shown in the connection tutorial: one object on ground, the rest on the pins.

### 5. Another person

A friend holds the ground corner or the ground cable and keeps touching your skin — a hand-hold, a high-five, an arm on a shoulder. The circuit runs through both bodies. At workshops the whole group can hold hands while one person plays.

> 💡 **Copper tape and skin patches.** [Copper tape](https://shop.playtronica.com/products/copper-tape) on a table edge, or a [skin patch](https://shop.playtronica.com/products/patches-for-skin-and-plants) on your forearm, both work as a ground contact. Clip the ground cable to the tape or the patch instead of holding a wire.

## Installations and exhibitions

In an installation the visitor cannot hold a cable. The rule does not change — the ground still has to touch them. It just stops being a wire in their hand.

- **A ground surface.** Clip the ground cable to a sheet of aluminium foil, a metal plate, or copper tape on the plinth. The visitor rests a hand on it, leans on it, or stands on it barefoot.
- **A metal handle or handrail.** Clip the ground cable to the rail, the armrest, or the metal edge of the pedestal that visitors hold anyway.
- **Two objects, one in each hand.** One object on a pin, one object on ground. The visitor takes one in each hand and the circuit closes.
- **A ground patch for the performer.** For a repeating performance, a skin patch or a clip inside clothing is faster than handing over a cable each time.

The computer running your DAW makes no difference to any of this. A MacBook, a PC, a phone, or a hardware synth all power Playtron the same way; grounding is a separate thing that happens between the device and the person.

## What does not work as ground

### Your laptop's metal body

This is the most common wrong turn, so it is worth being exact: **it cannot work, and you do not need it.**

Playtron's ground is already connected to your computer's ground through the USB cable — the USB shield and the chassis are bonded together at the connector. Clipping a wire from the pointed corner to a screw or a port frame connects ground to the same ground it is already on. Nothing changes. And it is the wrong target anyway: what has to be connected to ground is the person playing, not the computer.

If you were told to attach a clip to a MacBook, ignore it — do not clip anything to the case or the connectors. Use one of the five methods above, or a ground surface for installations.

### A radiator, a sink, or a pipe

Building metalwork is not part of the Playtron circuit. Clipping ground to a radiator sends the circuit to the wall instead of to the player, and the note does not fire. Modern buildings also break the earth path with plastic pipe sections, so the metalwork often is not earthed at all.

### The floor

Grounding does not mean putting Playtron on the ground or burying it. Ground is a contact on the device, not the surface under it.

### Materials that block skin contact

- **Painted metal, powder-coated metal, anodised aluminium.** The coating is an insulator.
- **Dry wood, dry plastic, dry stone, rubber, silicone.**
- **Gloves, sleeves, or a phone case between your skin and the contact.**
- **Rubber soles** — standing on a ground plate works barefoot or in thin damp socks, not in trainers.

## Notes are weak or fire only sometimes

Grounding is usually the cause, but check in this order:

1. **Skin contact.** Bare skin, firm contact, on the corner or the ground cable. Fingertip only is the weakest option; use a palm.
2. **Dry skin.** Wash your hands and dry them only partly, or use a little hand cream. Dry skin conducts poorly.
3. **The object.** Dry fruit, dead leaves, and dry wood give weak signals. Add moisture or use a wetter object. See [Objects you can play](/sound/objects-you-can-play/).
4. **The clip.** Reposition the alligator clip so the teeth grip firmly, and clean corroded pins. See the [Playtron FAQ](/troubleshooting/playtron-faq/).

## TouchMe, Biotron, and Scales

- **TouchMe** uses the same conductivity principle. Its two gold pads are the two ends of the circuit, and there is no separate ground pin — one hand on each pad, or two people touching each other, and your bodies close the loop.
- **Biotron** measures the bio-electrical signal of the plant. The plant is the source. Your body is not in the circuit unless you touch a leaf to change the signal.
- **Scales** measures weight on a load cell. There is no conductive circuit involved.

## TouchMe playing on one hand — "ground leaking"

TouchMe is meant to need **both** pads at once. If a single hand on one pad already plays notes, your setup has a second, unintended path back to the device — through the mains. We call this **ground leaking**. It is not a grounding method, and it is not a fault.

**Why it happens.** When the computer powering TouchMe is plugged into the mains, its ground is tied to the building's earth. Your body is also loosely coupled to earth — through your feet, your chair, a metal desk. Touching one pad can then complete a weak loop through *you → earth → the mains → back to TouchMe*, and the device fires a note.

**When it matters.** One-hand play is fine if that is what you want. It becomes a problem when you are showing the two-person moment and notes fire *before* the two people touch.

**How to get the two-pad behaviour back** — remove the earth path, from easiest to most thorough:

1. **Run on battery.** Unplug the laptop charger, or play from a phone or tablet with the [iPhone adapter](https://shop.playtronica.com/products/iphone-adapter). This alone fixes most cases.
2. **Move away from earthed objects.** Step off a metal floor, let go of the radiator or the metal desk frame.
3. **Use a USB isolator.** If the host must stay plugged in — a desktop, a stage rig — a galvanic USB isolator breaks the loop and passes the MIDI data through untouched.

## Is the current safe

Yes. Playtron and TouchMe run on USB low voltage, and the current that passes through your hand is far below anything you can feel. You cannot get a shock from these devices.

> ⚠️ **Never clip a Playtronica device to anything connected to the mains**, to a wall socket, or to an appliance that is plugged in. Play passive objects only: fruit, plants, water, metal, skin, foil.

## Troubleshooting

> **Nothing plays, and the LED never blinks.** The circuit is open. Put bare skin on the pointed corner and touch an object. If the LED blinks, grounding was the problem.

> **The LED blinks but there is no sound.** Grounding is fine. Confirm you are using Brave or Chrome, that MIDI permission is allowed, and that the device is selected in the synth. See [No sound or MIDI not detected](/troubleshooting/no-sound/).

> **TouchMe fires on just one hand.** Earth is leaking in through the mains. Run the host on battery, or add a USB isolator — see the ground-leaking section above.

> **Live performance setup.** See the [Playtron deep dive](/devices/playtron-advanced/) for stage-tested grounding patterns.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Grounding issue` and a short description of what you are doing and what is happening. We aim for 24 hours, but a reply may take up to 3 business days.
