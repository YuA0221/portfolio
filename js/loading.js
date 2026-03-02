"use strict";
(() => {
  const loading = document.getElementById("loading");
  const progressCircle = document.querySelector(".ring .progress");
  const percentValue = document.getElementById("percentValue");

  if (!loading || !progressCircle || !percentValue) return;

  // 円周長（r=50）
  const r = 50;
  const circ = 2 * Math.PI * r;
  progressCircle.style.strokeDasharray = circ;
  progressCircle.style.strokeDashoffset = circ;

  setProgress(0);

  function setProgress(pct) {
    const clamped = Math.max(0, Math.min(100, pct));
    percentValue.textContent = Math.round(clamped);
    progressCircle.style.strokeDashoffset = circ * (1 - clamped / 100);
  }

  // デモ用：最短表示時間
  const MIN_TIME = 1800;
  const START = performance.now();

  let done = false;

  function finish() {
    if (done) return;
    done = true;

    setProgress(100);
    loading.classList.add("is-complete");

    setTimeout(() => {
      loading.classList.add("is-fadeout");

      // ★ここで「次へ行っていいよ」を通知（タイトル画面を出す）
      document.dispatchEvent(new CustomEvent("loading:complete"));
      setTimeout(() => {
        loading.style.display = "none";
      }, 450);
    }, 200);
  }

  // フェイク進捗
  let start = null;
  function tick(ts) {
    if (!start) start = ts;
    const t = ts - start;
    const pct = Math.min(95, (t / MIN_TIME) * 100);
    setProgress(pct);

    if (pct < 95) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);

  // 最短時間後に完了
  setTimeout(finish, MIN_TIME);
})();
