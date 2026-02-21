#  2048 — The Classic Puzzle Game

A fully playable, premium-looking **2048** sliding puzzle game built with vanilla HTML, CSS, and JavaScript. Features a sleek dark theme, smooth animations, and mobile support.

---

##  Features

- **Classic 2048 Gameplay** — Slide and merge tiles on a 4×4 grid to reach 2048
- **Multiple Controls** — Arrow keys, WASD, and mobile swipe gestures
- **Smooth Animations** — CSS transitions for tile sliding, pop effect on merges, and zoom-in for new tiles
- **Dynamic Tile Colors** — Each tile value (2 → 2048+) has a unique color with glow effects on high-value tiles
- **Score Tracking** — Live score with animated "+N" popup on each merge
- **Best Score Persistence** — High score saved to `localStorage` and persists across sessions
- **Win Screen** — Celebration overlay when you hit 2048, with a "Keep Playing" option
- **Game Over Screen** — Displayed when no valid moves remain
- **Restart Anytime** — New Game button to reset the board
- **Responsive Design** — Fully playable on desktop, tablet, and mobile (down to 320px)
- **Premium Dark UI** — Glassmorphism effects, gradient title, subtle background glows, and the Outfit font

---

##  Getting Started

No build tools, frameworks, or dependencies required — just open the file in a browser.

### Option 1: Double-click
Open `index.html` directly in your file explorer.

### Option 2: Command Line (Windows)
```bash
cd path/to/2048
start index.html
```


---

##  How to Play

1. Use **Arrow Keys** (↑ ↓ ← →) or **WASD** to slide all tiles in a direction
2. When two tiles with the **same number** collide, they **merge into one** (e.g. 2 + 2 = 4)
3. After every move, a new tile (2 or 4) appears randomly on the board
4. Reach the **2048** tile to win! Or keep going for an even higher score
5. The game ends when no more moves are possible

**On mobile:** Swipe in any direction on the game board.

---



### Module Responsibilities

| Module | Purpose |
|---|---|
| **`storage.js`** | Read/write best score to `localStorage` |
| **`game-logic.js`** | Pure functions for sliding rows, merging tiles, checking win/loss — zero DOM dependency |
| **`board.js`** | Manages the 2D grid array, tracks empty cells, spawns random tiles |
| **`ui.js`** | Creates and positions tile DOM elements, manages overlays and score display |
| **`app.js`** | Coordinates everything — handles input events, runs the game loop, manages state |

---

##  Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom properties, Grid layout, animations, glassmorphism, responsive design |
| **Vanilla JavaScript** | Game engine, DOM manipulation, event handling |
| **Google Fonts** | [Outfit](https://fonts.google.com/specimen/Outfit) typeface |
| **localStorage** | Best score persistence |

No frameworks. No build step. No dependencies.

---

##  Design Highlights

- **Color Palette** — Dark navy background (`#0f0f1a`) with purple (`#7c5cfc`) and pink (`#ec4899`) accents
- **Tile Progression** — Colors shift from cool dark purples (2, 4) → warm oranges (8–64) → golden yellows (128–2048) → vibrant gradient (super tiles)
- **Glassmorphism** — Score boxes use `backdrop-filter: blur()` with semi-transparent backgrounds
- **Micro-animations** — Score "+N" floats upward and fades, tiles pop on merge, new tiles scale in
- **2048 Glow** — The 2048 tile has a golden box-shadow glow effect

---

##  Responsive Breakpoints

| Screen Width | Tile Size | Gap |
|---|---|---|
| > 520px | 100px | 12px |
| 381–520px | 72px | 8px |
| ≤ 380px | 60px | 6px |

---

##  License

This project is open source and available for personal and educational use.

---

**Coded by Jaswanth Kumar**
