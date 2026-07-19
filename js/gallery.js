/* ===================================
   GALERIA DINÂMICA + LIGHTBOX
   =================================== */
let imagensAtuais = [];
let indiceAtual = 0;

document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.getElementById('galeria');
  const botoesCategoria = document.querySelectorAll('.categoria-btn');

  if (!galeria) return;

  // Renderiza as imagens de uma categoria
  function renderizarGaleria(categoria) {
    const imagens = dadosAmbientes[categoria];

    if (!imagens || imagens.length === 0) {
      galeria.innerHTML = '<p>Nenhuma imagem encontrada para esta categoria.</p>';
      return;
    }

    galeria.innerHTML = imagens
      .map((img, index) => `
        <figure class="galeria__item" data-index="${index}">
          <img 
            src="${img.src}" 
            alt="${img.alt}" 
            loading="lazy"
            class="galeria__imagem"
          >
        </figure>
      `)
      .join('');

    ativarLightbox(imagens);
  }

  // Clique nos botões de categoria
  botoesCategoria.forEach((botao) => {
    botao.addEventListener('click', () => {
      botoesCategoria.forEach((b) => {
        b.classList.remove('categoria-btn--ativo');
        b.setAttribute('aria-selected', 'false');
      });

      botao.classList.add('categoria-btn--ativo');
      botao.setAttribute('aria-selected', 'true');

      renderizarGaleria(botao.dataset.categoria);
    });
  });

  // Carrega "cozinhas" por padrão ao abrir a página
  renderizarGaleria('cozinhas');

  // Links do footer também filtram a galeria
  document.querySelectorAll('[data-categoria-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const categoria = link.dataset.categoriaLink;

      document.querySelector('.ambientes')?.scrollIntoView({ behavior: 'smooth' });

      const botaoCorrespondente = document.querySelector(`[data-categoria="${categoria}"]`);
      if (botaoCorrespondente) botaoCorrespondente.click();
    });
  });

  // ===== LIGHTBOX =====
  function ativarLightbox(imagens) {
    imagensAtuais = imagens;
    document.querySelectorAll('.galeria__item').forEach((item) => {
      item.addEventListener('click', () => {
        indiceAtual = parseInt(item.dataset.index);
        abrirLightbox();
      });
    });
  }

  function abrirLightbox() {
    const lightbox = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-imagem');

    imgEl.src = imagensAtuais[indiceAtual].src;
    imgEl.alt = imagensAtuais[indiceAtual].alt;

    lightbox.classList.add('lightbox--ativo');
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    document.getElementById('lightbox').classList.remove('lightbox--ativo');
    document.body.style.overflow = '';
  }

  function navegarLightbox(direcao) {
    indiceAtual = (indiceAtual + direcao + imagensAtuais.length) % imagensAtuais.length;
    const imgEl = document.getElementById('lightbox-imagem');
    imgEl.src = imagensAtuais[indiceAtual].src;
    imgEl.alt = imagensAtuais[indiceAtual].alt;
  }

  document.getElementById('lightbox-fechar')?.addEventListener('click', fecharLightbox);
  document.getElementById('lightbox-anterior')?.addEventListener('click', () => navegarLightbox(-1));
  document.getElementById('lightbox-proxima')?.addEventListener('click', () => navegarLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowLeft') navegarLightbox(-1);
    if (e.key === 'ArrowRight') navegarLightbox(1);
  });
});
