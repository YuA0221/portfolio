"use strict";

(() => {
  const modal = document.getElementById('workModal');
  const overlay = modal.querySelector('.work-modal__overlay');
  const btnClose = modal.querySelector('.work-modal__close');

  const elTitle = modal.querySelector('.work-modal__title');
  const elTools = modal.querySelector('.work-modal__tools');
  const elDesc  = modal.querySelector('.work-modal__desc');
  const imgPc   = modal.querySelector('.work-modal__img--pc');
  const imgSp   = modal.querySelector('.work-modal__img--sp');
  const listPts = modal.querySelector('.work-modal__points');

  let lastFocused = null;

  function openModal(link){
    lastFocused = document.activeElement;

    // data取得
    const title  = link.dataset.title || '';
    const tools  = link.dataset.tools || '';
    const pc     = link.dataset.pc || '';
    const sp     = link.dataset.sp || '';
    const desc   = link.dataset.desc || '';
    const points = (link.dataset.points || '').split('|').map(s => s.trim()).filter(Boolean);

    // 反映
    elTitle.textContent = title;
    elTools.textContent = tools;
    elDesc.textContent  = desc;

    imgPc.src = pc;
    imgPc.alt = title ? `${title} PC view` : 'PC view';

    // SPがない作品も想定
    if (sp) {
      imgSp.src = sp;
      imgSp.alt = title ? `${title} SP view` : 'SP view';
      imgSp.closest('.work-modal__figure--sp').style.display = '';
    } else {
      imgSp.src = '';
      imgSp.alt = '';
      imgSp.closest('.work-modal__figure--sp').style.display = 'none';
    }

    listPts.innerHTML = points.map(p => `<li>${p}</li>`).join('');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-modal-open');

    // closeボタンへフォーカス
    btnClose.focus();
  }

  function closeModal(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-modal-open');

    // 画像読み込みを解除（次回のちらつき防止）
    imgPc.src = '';
    imgSp.src = '';

    if (lastFocused) lastFocused.focus();
  }

  // open
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.js-work-open');
    if (!link) return;

    e.preventDefault();
    openModal(link);
  });

  // close: overlay / button
  overlay.addEventListener('click', closeModal);
  btnClose.addEventListener('click', closeModal);

  // close: ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();