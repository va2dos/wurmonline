# 🐉 Wurm Assistant
A medieval‑themed React interface inspired by the old‑school UI of **Wurm Online**.  
Wurm Assistant displays the **current Wurm time**, **season**, and **fish availability** based on the accelerated in‑game calendar.

The project is visually styled with **wood textures**, **parchment panels**, **iron borders**, and **serif medieval fonts** to recreate the classic Wurm aesthetic.

---

## 🌟 Features

### 🕒 Wurm Time Calculation
- Real‑time conversion to Wurm Online’s accelerated calendar  
- Displays:
  - Wurm year  
  - Starfall (season)  
  - Week  
  - Day  
  - Wurm time (HH:MM:SS)  
- Automatic updates every second

### 🌤 Seasonal Detection
- Maps starfalls to seasons (Winter, Spring, Summer, Autumn)
- UI theme shifts subtly based on day/night

### 🎣 Fish Availability
- Shows fish available **right now** based on:
  - Wurm time of day (day/night)
  - Water type
  - Bait type
- Fully customizable fish dataset

### 🪵 Oldschool Wurm UI Theme
- Wood‑panel header  
- Parchment content panels  
- Iron borders  
- Medieval serif fonts  
- Optional rotating clock wheel (planned)

---

## 🚀 Installation

### 1. Install dependencies
```bash
npm install
npm start
npm run build
```

---

🧮 Wurm Time Logic
Wurm Online uses an accelerated calendar:

| Wurm Unit | Real Time |
| --- | --- |
| 1 Wurm second | 0.125 s |
| 1 Wurm minute | 7.5 s |
| 1 Wurm hour | 7.5 min |
| 1 Wurm day | 3 hours |
| 1 Wurm week | 21 hours |
| 1 starfall | 3.5 days |
| 1 Wurm year | 42 days |


