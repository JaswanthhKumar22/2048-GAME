/* ===================================================
   app.js — Entry point: game loop, input handling
   =================================================== */

(() => {
    /* ---- State ---- */
    let score = 0;
    let bestScore = Storage.getBestScore();
    let hasWon = false;      // true once 2048 is reached
    let keepPlaying = false; // true if user chose "Keep Playing"
    let isAnimating = false; // debounce rapid moves

    /* ---- DOM refs for buttons ---- */
    const btnRestart = document.getElementById('btn-restart');
    const btnRestartWin = document.getElementById('btn-restart-win');
    const btnRestartOver = document.getElementById('btn-restart-gameover');
    const btnKeepPlaying = document.getElementById('btn-keep-playing');

    /* ========== Game lifecycle ========== */

    function startNewGame() {
        score = 0;
        hasWon = false;
        keepPlaying = false;

        UI.hideAllOverlays();
        UI.setScore(0);
        UI.setBestScore(bestScore);
        UI.buildGridBackground();

        Board.init();
        Board.addRandomTile();
        Board.addRandomTile();

        UI.renderFresh(Board.getGrid(), true);
    }

    function handleMove(direction) {
        if (isAnimating) return;

        const result = GameLogic.applyMove(Board.getGrid(), direction);
        if (!result.moved) return;

        isAnimating = true;
        Board.setGrid(result.grid);

        // Score
        score += result.score;
        UI.setScore(score);
        if (result.score > 0) UI.showScoreAddition(result.score);

        // Best score
        if (Storage.setBestScore(score)) {
            bestScore = score;
            UI.setBestScore(bestScore);
        }

        // Add a new random tile
        const newTile = Board.addRandomTile();

        // Render
        UI.updateAfterMove(Board.getGrid(), newTile, result.mergedCells);

        // After animations settle, check game state
        setTimeout(() => {
            isAnimating = false;

            // Win check
            if (!hasWon && !keepPlaying && GameLogic.hasWon(Board.getGrid())) {
                hasWon = true;
                UI.showWin();
                return;
            }

            // Game over check
            if (!GameLogic.canMove(Board.getGrid())) {
                UI.showGameOver();
            }
        }, 200);
    }

    /* ========== Input: Keyboard ========== */

    const keyMap = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
        a: 'left', A: 'left',
        d: 'right', D: 'right',
        w: 'up', W: 'up',
        s: 'down', S: 'down',
    };

    document.addEventListener('keydown', e => {
        const dir = keyMap[e.key];
        if (dir) {
            e.preventDefault();
            handleMove(dir);
        }
    });

    /* ========== Input: Touch / Swipe ========== */

    (() => {
        const boardEl = document.getElementById('board-container');
        let startX, startY;
        const MIN_SWIPE = 30;

        boardEl.addEventListener('touchstart', e => {
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
        }, { passive: true });

        boardEl.addEventListener('touchend', e => {
            if (startX == null) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            startX = null;

            if (Math.abs(dx) < MIN_SWIPE && Math.abs(dy) < MIN_SWIPE) return;

            if (Math.abs(dx) > Math.abs(dy)) {
                handleMove(dx > 0 ? 'right' : 'left');
            } else {
                handleMove(dy > 0 ? 'down' : 'up');
            }
        }, { passive: true });
    })();

    /* ========== Buttons ========== */

    btnRestart.addEventListener('click', startNewGame);
    btnRestartWin.addEventListener('click', startNewGame);
    btnRestartOver.addEventListener('click', startNewGame);

    btnKeepPlaying.addEventListener('click', () => {
        keepPlaying = true;
        UI.hideWin();
    });

    /* ========== Boot ========== */
    startNewGame();
})();
