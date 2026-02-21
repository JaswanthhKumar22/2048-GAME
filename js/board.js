/* ===================================================
   board.js — Board & tile state management
   =================================================== */

const Board = (() => {
    const SIZE = 4;
    let grid = [];

    /** Create an empty SIZE×SIZE grid */
    function createEmptyGrid() {
        return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    }

    /** Initialize / reset grid */
    function init() {
        grid = createEmptyGrid();
    }

    /** Get current grid (returns a deep copy) */
    function getGrid() {
        return grid.map(r => [...r]);
    }

    /** Set the grid directly (e.g. after a move) */
    function setGrid(newGrid) {
        grid = newGrid.map(r => [...r]);
    }

    /** Get list of empty cells as [{r, c}] */
    function emptyCells() {
        const cells = [];
        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                if (grid[r][c] === 0) cells.push({ r, c });
            }
        }
        return cells;
    }

    /** Place a tile at (r, c) */
    function setCell(r, c, value) {
        grid[r][c] = value;
    }

    /** Add a random tile (90 % → 2, 10 % → 4). Returns {r, c, value} or null */
    function addRandomTile() {
        const available = emptyCells();
        if (available.length === 0) return null;
        const cell = available[Math.floor(Math.random() * available.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        setCell(cell.r, cell.c, value);
        return { r: cell.r, c: cell.c, value };
    }

    return { SIZE, init, getGrid, setGrid, emptyCells, setCell, addRandomTile };
})();
