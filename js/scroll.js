/* ===================================
   ANIMAÇÕES DE SCROLL (Intersection Observer)
   E BOTÃO VOLTAR AO TOPO
   =================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Reveal ao rolar --- */
  const elementos = document.querySelectorAll('[data-animar]');

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('animado');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((el) => observer.observe(el));

  /* --- Botão voltar ao topo --- */
  const btnTopo = document.querySelector('.btn-topo');
  if (btnTopo) {
    window.addEventListener('scroll', () => {
      btnTopo.classList.toggle('visivel', window.scrollY > 400);
    });

    btnTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
