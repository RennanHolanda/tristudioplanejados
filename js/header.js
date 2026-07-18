/* ===================================
   HEADER: efeito de scroll (encolher + blur)
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  if (!header) return;

  const aoRolar = () => {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', aoRolar);
  aoRolar(); // executa uma vez ao carregar
});
