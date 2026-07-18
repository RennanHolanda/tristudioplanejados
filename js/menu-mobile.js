/* ===================================
   MENU HAMBÚRGUER (mobile) - Vanilla JS
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('.header__hamburguer');
  const nav = document.querySelector('.header__nav');

  if (!botao || !nav) return;

  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-label', 'Abrir menu de navegação');

  botao.addEventListener('click', () => {
    const aberto = nav.classList.toggle('header__nav--ativo');
    document.body.classList.toggle('menu-mobile-ativo', aberto);
    botao.classList.toggle('ativo', aberto);
    botao.setAttribute('aria-expanded', aberto);
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('header__nav--ativo');
      document.body.classList.remove('menu-mobile-ativo');
      botao.classList.remove('ativo');
      botao.setAttribute('aria-expanded', 'false');
    });
  });
});
