/* ===================================================
   storage.js — Best-score persistence via localStorage
   =================================================== */

const Storage = (() => {
  const BEST_KEY = '2048_best_score';

  function getBestScore() {
    const stored = localStorage.getItem(BEST_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }

  function setBestScore(score) {
    const current = getBestScore();
    if (score > current) {
      localStorage.setItem(BEST_KEY, score);
      return true; // new best
    }
    return false;
  }

  function clearBestScore() {
    localStorage.removeItem(BEST_KEY);
  }

  return { getBestScore, setBestScore, clearBestScore };
})();
