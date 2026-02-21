/* ===================================================
   ui.js — DOM rendering, tile management, overlays
   =================================================== */

const UI = (() => {
    /* ---- Cached DOM refs ---- */
    const gridBg = document.getElementById('grid-background');
    const tileLayer = document.getElementById('tile-layer');
    const scoreEl = document.getElementById('current-score');
    const bestEl = document.getElementById('best-score');
    const additionEl = document.getElementById('score-addition');
    const overlayWin = document.getElementById('overlay-win');
    const overlayOver = document.getElementById('overlay-gameover');

    /* ---- CSS helpers ---- */
    const cs = getComputedStyle(document.documentElement);
    const cellSize = () => parseFloat(cs.getPropertyValue('--cell-size'));
    const cellGap = () => parseFloat(cs.getPropertyValue('--cell-gap'));

    function posLeft(c) { return c * (cellSize() + cellGap()); }
    function posTop(r) { return r * (cellSize() + cellGap()); }

    /* ---- Grid background cells ---- */
    function buildGridBackground() {
        gridBg.innerHTML = '';
        for (let i = 0; i < Board.SIZE * Board.SIZE; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridBg.appendChild(cell);
        }
    }

    /* ---- Render entire board from scratch ---- */
    function renderFresh(grid, animateNew) {
        tileLayer.innerHTML = '';
        for (let r = 0; r < Board.SIZE; r++) {
            for (let c = 0; c < Board.SIZE; c++) {
                if (grid[r][c] !== 0) {
                    createTileElement(r, c, grid[r][c], animateNew);
                }
            }
        }
    }

    /* ---- Create a single tile DOM element ---- */
    function createTileElement(r, c, value, animate) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        if (value > 2048) tile.classList.add('super');
        tile.dataset.value = value;
        tile.textContent = value;
        tile.style.left = posLeft(c) + 'px';
        tile.style.top = posTop(r) + 'px';
        if (animate) tile.classList.add('tile-new');
        tileLayer.appendChild(tile);
        return tile;
    }

    /* ---- Full board update after a move ---- */
    function updateAfterMove(grid, newTile, mergedCells) {
        // Replace all tiles instantly at new positions (CSS transition handles sliding)
        tileLayer.innerHTML = '';

        for (let r = 0; r < Board.SIZE; r++) {
            for (let c = 0; c < Board.SIZE; c++) {
                if (grid[r][c] === 0) continue;
                const isMerged = mergedCells.some(m => m.r === r && m.c === c);
                const isNew = newTile && newTile.r === r && newTile.c === c;

                const tile = createTileElement(r, c, grid[r][c], false);

                if (isMerged) {
                    // Trigger pop after a micro-delay so the browser sees the change
                    requestAnimationFrame(() => tile.classList.add('tile-merged'));
                }
                if (isNew) {
                    tile.style.transform = 'scale(0)';
                    tile.style.opacity = '0';
                    // Delay appear so slide finishes first
                    setTimeout(() => {
                        tile.classList.add('tile-new');
                        tile.style.transform = '';
                        tile.style.opacity = '';
                    }, 160);
                }
            }
        }
    }

    /* ---- Score display ---- */
    function setScore(score) {
        scoreEl.textContent = score;
    }

    function showScoreAddition(amount) {
        if (amount <= 0) return;
        additionEl.textContent = `+${amount}`;
        additionEl.classList.remove('pop');
        // force reflow
        void additionEl.offsetWidth;
        additionEl.classList.add('pop');
    }

    function setBestScore(score) {
        bestEl.textContent = score;
    }

    /* ---- Overlays ---- */
    function showWin() {
        overlayWin.classList.add('active');
    }

    function hideWin() {
        overlayWin.classList.remove('active');
    }

    function showGameOver() {
        overlayOver.classList.add('active');
    }

    function hideGameOver() {
        overlayOver.classList.remove('active');
    }

    function hideAllOverlays() {
        hideWin();
        hideGameOver();
    }

    return {
        buildGridBackground,
        renderFresh,
        updateAfterMove,
        setScore,
        showScoreAddition,
        setBestScore,
        showWin,
        hideWin,
        showGameOver,
        hideGameOver,
        hideAllOverlays,
    };
})();
