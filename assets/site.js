// Görünüm seçici: uygulamanın beş temasının gerçek ekran görüntüsünü TV çerçevesinde değiştirir.
// Radyo grubu: ok tuşlarıyla gezilir (uygulamadaki kumanda gibi), yalnız seçili düğme sekme sırasında.
document.documentElement.classList.remove('no-js');
(function () {
  var group = document.querySelector('[data-looks]');
  if (!group) return;
  var keys = Array.prototype.slice.call(group.querySelectorAll('.look'));
  var shots = Array.prototype.slice.call(document.querySelectorAll('.tv__screen img'));
  var title = document.querySelector('[data-look-title]');
  var desc = document.querySelector('[data-look-desc]');

  function pick(i, focus) {
    keys.forEach(function (k, n) {
      var on = n === i;
      k.setAttribute('aria-checked', on ? 'true' : 'false');
      k.tabIndex = on ? 0 : -1;
    });
    shots.forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-look') === keys[i].getAttribute('data-look')); });
    title.textContent = keys[i].textContent;
    desc.textContent = keys[i].getAttribute('data-desc');
    if (focus) keys[i].focus();
  }

  keys.forEach(function (k, i) {
    k.addEventListener('click', function () { pick(i, false); });
    k.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      pick((i + d + keys.length) % keys.length, true);
    });
  });
  pick(0, false);
})();
