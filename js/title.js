"use strict";

document.addEventListener("loading:complete", () => {
  runTitleToMV();
});

function runTitleToMV() {
  const screen = document.getElementById("titleScreen");
  const stage = document.getElementById("titleStage");
  const mv = document.getElementById("mv");
  const mvTitle = document.getElementById("mvTitle");
  const wrapper = document.getElementById("wrapper");

  if (!screen || !stage || !mv || !mvTitle || !wrapper) return;

  // ★ MVをクローンしてタイトル画面に入れる（毎回初期化）
  stage.innerHTML = "";
  const mvClone = mv.cloneNode(true);
  stage.appendChild(mvClone);

  // クローン側のタイトル要素を取得（FLIPの「出発点」）
  const cloneTitle = mvClone.querySelector("#mvTitle");

  // ① タイトル画面を表示
  screen.classList.add("is-show");
  console.log("cloneTitle:", cloneTitle);
  console.log("cloneTitle opacity:", getComputedStyle(cloneTitle).opacity);
  setTimeout(() => {
    // ② MVのh1の「最終位置」を計測（まだopacity0でOK）
    const last = mvTitle.getBoundingClientRect();

    // ③ タイトル画面のh1を中央表示した状態の位置を計測
    const first = cloneTitle.getBoundingClientRect();

    // ④ MVのh1を、タイトル位置に“瞬間移動”させたように見せる準備（FLIP）
    //    → MVのh1を表示し、transformで差分を埋める
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;

    mvTitle.classList.add("is-visible");
    mvTitle.style.transformOrigin = "top left";
    mvTitle.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;

    // クローン側のタイトルは消して、二重表示を防ぐ
    // cloneTitle.style.opacity = "0";

    // ⑤ 次のフレームでtransformを戻してアニメーションさせる
    requestAnimationFrame(() => {
      mvTitle.style.transition = "transform 800ms cubic-bezier(.2,.9,.2,1)";
      mvTitle.style.transform = "translate(0,0) scale(1,1)";

      setTimeout(() => {
        // ⑥ タイトル画面を消す（同時にフェードでもOK）
        screen.classList.remove("is-show");
        // wrapperを出す
        wrapper.classList.add("is-ready");
        // ⑦ 後片付け（transition削除）
        mvTitle.style.transition = "";
        mvTitle.style.transformOrigin = "";
        mvTitle.style.transform = "";
      }, 820);
    });
  }, 500); // ← ここが「全画面で見せる時間」
}
