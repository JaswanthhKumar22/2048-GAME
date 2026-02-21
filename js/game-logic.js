/* ===================================================
   game-logic.js — Pure game logic (no DOM)
   Handles sliding, merging, scoring, win/loss checks.
   =================================================== */

const GameLogic = (() => {

    /**
     * Slide a single row to the left.
     * Returns { row, score, merged } where `merged` contains
     * indices in the new row that were produced by merging.
     */
    function slideRowLeft(row) {
        // 1. Remove zeros
        let filtered = row.filter(v => v !== 0);
        let score = 0;
        const merged = [];

        // 2. Merge adjacent equal tiles
        for (let i = 0; i < filtered.length - 1; i++) {
            if (filtered[i] === filtered[i + 1]) {
                filtered[i] *= 2;
                score += filtered[i];
                merged.push(i);
                filtered[i + 1] = 0;
                i++; // skip next
            }
        }

        // 3. Remove zeros again after merging
        filtered = filtered.filter(v => v !== 0);

        // 4. Pad with zeros
        while (filtered.length < row.length) filtered.push(0);

        return { row: filtered, score, merged };
    }

    /**
     * Apply a move in the given direction to a grid (2D array).
     * direction: 'left' | 'right' | 'up' | 'down'
     * Returns { grid, score, moved, mergedCells: [{r,c}] }
     */
    function applyMove(grid, direction) {
        const size = grid.length;
        let totalScore = 0;
        let moved = false;
        const mergedCells = [];

        // Helper: extract rows depending on direction, slide, and put back.
        const getRows = () => {
            switch (direction) {
                case 'left':
                    return grid.map(r => [...r]);
                case 'right':
                    return grid.map(r => [...r].reverse());
                case 'up':
                    return Array.from({ length: size }, (_, c) =>
                        Array.from({ length: size }, (_, r) => grid[r][c])
                    );
                case 'down':
                    return Array.from({ length: size }, (_, c) =>
                        Array.from({ length: size }, (_, r) => grid[r][c]).reverse()
                    );
            }
        };

        const rows = getRows();
        const newGrid = grid.map(r => [...r]);

        rows.forEach((row, idx) => {
            const result = slideRowLeft(row);
            const needReverse = direction === 'right' || direction === 'down';
            const finalRow = needReverse ? result.row.reverse() : result.row;
            const finalMerged = needReverse
                ? result.merged.map(i => size - 1 - i)
                : result.merged;

            totalScore += result.score;

            // Write back
            if (direction === 'left' || direction === 'right') {
                for (let c = 0; c < size; c++) {
                    if (newGrid[idx][c] !== finalRow[c]) moved = true;
                    newGrid[idx][c] = finalRow[c];
                }
                finalMerged.forEach(c => mergedCells.push({ r: idx, c }));
            } else {
                for (let r = 0; r < size; r++) {
                    const c = idx;
                    if (newGrid[r][c] !== finalRow[r]) moved = true;
                    newGrid[r][c] = finalRow[r];
                }
                finalMerged.forEach(r => mergedCells.push({ r, c: idx }));
            }
        });

        return { grid: newGrid, score: totalScore, moved, mergedCells };
    }

    /** Check if 2048 (or higher) exists */
    function hasWon(grid) {
        return grid.some(row => row.some(v => v >= 2048));
    }

    /** Check if any move is possible */
    function canMove(grid) {
        const size = grid.length;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (grid[r][c] === 0) return true;
                if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return true;
                if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return true;
            }
        }
        return false;
    }

    return { slideRowLeft, applyMove, hasWon, canMove };
})();
