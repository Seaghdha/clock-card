# :watch: Clock Card for Home Assistant

![Home
Assistant](https://img.shields.io/badge/Home%20Assistant-2023.0%2B-blue?logo=home-assistant)
![Lovelace](https://img.shields.io/badge/Lovelace-Custom%20Card-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A minimal digital clock card for Home Assistant Lovelace dashboards.

This card displays the current time with optional:

-   weekday
-   seconds
-   AM/PM indicator
-   animated dividers
-   configurable typography
-   customizable labels
-   YAML-based styling

Designed to be clean, lightweight and grid-friendly.

------------------------------------------------------------------------

## Features

- 24h / 12h clock
- optional seconds
- optional weekday
- optional AM/PM
- animated dividers
- configurable alignment
- configurable typography
- configurable colors
- tabular numeric rendering

------------------------------------------------------------------------

## Why this card?

Many Home Assistant dashboards need a clean, configurable clock.

Most existing clock cards are either too simple or too visually heavy for modern Lovelace dashboards.

**Clock Card** focuses on:

- minimal design
- clean typography
- flexible YAML configuration
- grid-friendly layout
- zero dependencies

The goal is to provide a **simple clock that integrates naturally into modern Home Assistant dashboards.**

---

⭐ If you find this card useful, consider starring the repository.

------------------------------------------------------------------------

# Preview

<p align="center">
  <img src="Basic%20Usage.png" width="650">
</p>

## Example layout:

    FR : 19 : 59 : 12
    DAY   HOURS   MINUTES   SECONDS

## Minimal mode:

    FR : 19 : 59

------------------------------------------------------------------------

# 📦 Installation

## Manual

1.  Download `clock-card.js`

2.  Copy to:

    `/config/www/clock-card.js`

3.  Add resource in Home Assistant:

    Settings → Dashboards → Resources

Add:

    URL: /local/clock-card.js
    Type: JavaScript Module

4.  Refresh the browser. 

------------------------------------------------------------------------

# Basic Usage

    type: custom:clock-card

------------------------------------------------------------------------

## Full Example

<p align="center">
  <img src="Full%20Example.gif" width="650">
</p>

    type: custom:clock-card

    hour24: false
    showAmPm: true
    padZero: true

    showWeekday: true
    showSeconds: true

    align: center

    animateDividers: true
    dividerBlinkSpeed: 1

    weekdays:
      - SU
      - MO
      - TU
      - WE
      - TH
      - FR
      - SA

    labels:
      day: DAY
      hours: HOURS
      minutes: MINUTES
      seconds: SECONDS
      ampm: AM/PM

    background: "#000000"
    color: "#ffffff"
    dividerColor: "rgba(255,255,255,0.35)"
    fontFamily: "system-ui"

    padding: "12px 14px"

    valueFontSize: 48
    labelFontSize: 10
    dividerFontSize: 34
    ampmFontSize: 18

    valueFontWeight: 500
    labelFontWeight: 600
    dividerFontWeight: 300
    ampmFontWeight: 600

    dividerSpacing: 12

    showLabels: true
    tabularNumbers: true

------------------------------------------------------------------------

# ⚙️ Configuration

## :pushpin: Time

  |Option        |Default   |Description|
  |------------- |--------- |-----------------|
  |`hour24`        |true      |Use 24h format|
  |`padZero`       |true      |Leading zero|
  |`showSeconds`   |true      |Display seconds|
  |`showAmPm`      |false     |Show AM/PM|

------------------------------------------------------------------------

## :pushpin: Weekday

  |Option        |Default|
  |------------- |--------------------------------------|
  |`showWeekday`   |true|
  |`weekdays`      |["SU","MO","TU","WE","TH","FR","SA"]|

🧩 Example:

    weekdays:
      - NE
      - PO
      - ÚT
      - ST
      - ČT
      - PÁ
      - SO

------------------------------------------------------------------------

## :pushpin: Labels

  |Option           |Default|
  |---------------- |---------|
  |`showLabels`       |true|
  |labels.day       |DAY|
  |labels.hours     |HOURS|
  |labels.minutes   |MINUTES|
  |labels.seconds   |SECONDS|
  |labels.ampm      |AM/PM|

------------------------------------------------------------------------

## :pushpin: Layout

  |Option           |Default|
  |---------------- |-------------|
  |`align`            |center|
  |`padding`          |"12px 14px"|
  |`dividerSpacing`   |12|

Alignment options:

    left
    center
    right

------------------------------------------------------------------------

## :pushpin: Divider Animation

  |Option              |Default|
  |------------------- |---------|
  |`animateDividers`     |false|
  |`dividerBlinkSpeed`   |1|

🧩 Example:

    animateDividers: true
    dividerBlinkSpeed: 1

------------------------------------------------------------------------

## :pushpin: Typography

  |Option            |Default|
  ----------------- |----------|
  |`fontFamily`        |system-ui|
  |`valueFontSize`     |48|
  |`labelFontSize`     |10|
  |`dividerFontSize`   |34|
  |`ampmFontSize`      |18|

Font weight:

  |Option              |Default|
  |------------------- |---------|
  |`valueFontWeight`     |500|
 |`labelFontWeight`     |600|
  |`dividerFontWeight`   |300|
  |`ampmFontWeight`      |600|

------------------------------------------------------------------------

## :pushpin: Colors

  |Option         |Default|
  |-------------- |------------------------|
  |`background`     |#000000|
  |`color`          |#ffffff|
  |`dividerColor`   |rgba(255,255,255,0.35)|

------------------------------------------------------------------------

## :pushpin: Numeric Rendering

  |Option           |Default   |Description|
  |---------------- |--------- |--------------------|
  |`tabularNumbers`   |false     |Fixed-width digits|

🧩 Example:

    tabularNumbers: true

------------------------------------------------------------------------

## :pushpin: Minimal Examples

### Simple clock

    type: custom:clock-card

### Clock without labels

<p align="center">
  <img src="Clock%20without%20labels.png" width="650">
</p>

    type: custom:clock-card
    showLabels: false

### Clock without seconds

<p align="center">
  <img src="Clock%20without%20seconds.png" width="650">
</p>

    type: custom:clock-card
    showSeconds: false

### 12h clock

<p align="center">
  <img src="12h%20clock.png" width="650">
</p>

    type: custom:clock-card
    hour24: false
    showAmPm: true

------------------------------------------------------------------------

License

MIT License
