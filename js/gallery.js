/* ===================================
   GALERIA DE AMBIENTES + LIGHTBOX
   TriStudio Planejados
   =================================== */
document.addEventListener('DOMContentLoaded', () => {

  const galeriaEl = document.getElementById('galeria');
  const botoesCategoria = document.querySelectorAll('.categoria-btn');
  const linksFooterCategoria = document.querySelectorAll('[data-categoria-link]');

  if (!galeriaEl) return;

  /* ===================================
     BANCO DE IMAGENS POR CATEGORIA
     (Edite aqui para adicionar/remover fotos)
     =================================== */
  const bancoDeImagens = {
    'cozinhas': [
      { src: 'assets/imagens/cozinhas/cozinha-01.jpg', alt: 'Cozinha planejada moderna com ilha central' },
      { src: 'assets/imagens/cozinhas/cozinha-02.jpg', alt: 'Cozinha planejada em tons claros com armários altos' },
      { src: 'assets/imagens/cozinhas/cozinha-03.jpg', alt: 'Cozinha planejada com bancada em granito' },
    ],
    'quartos': [
      { src: 'assets/imagens/quartos/quarto-01.jpg', alt: 'Quarto planejado com guarda-roupa de correr' },
      { src: 'assets/imagens/quartos/quarto-02.jpg', alt: 'Quarto planejado com cabeceira estofada' },
    ],
    'closets': [
      { src: 'assets/imagens/closets/closet-01.jpg', alt: 'Closet planejado com iluminação em LED' },
      { src: 'assets/imagens/closets/closet-02.jpg', alt: 'Closet planejado com prateleiras de vidro' },
    ],
    'banheiros': [
      { src: 'assets/imagens/banheiros/banheiro-01.jpg', alt: 'Banheiro planejado com gabinete suspenso' },
    ],
    'home-office': [
      { src: 'assets/imagens/home-office/office-01.jpg', alt: 'Home office planejado com mesa em L' },
    ],
    'salas': [
      { src: 'assets/imagens/salas/sala-01.jpg', alt: 'Sala de TV planejada com painel ripado' },
    ],
    'paineis': [
      { src: 'assets/imagens/salas/painel-01.jpg', alt: 'Painel de TV planejado em madeira ripada' },
    ],
    'gourmet': [
      { src: 'assets/imagens/gourmet/gourmet-01.jpg', alt: 'Área gourmet planejada com churrasqueira' },
    ],
    'lavanderias': [
      { src: 'assets/imagens/lavanderias/lavanderia-01.jpg', alt: 'Lavanderia planejada com armários altos' },
    ],
  };

  let categoriaAtual = 'cozinhas';
  let indiceLightbox = 0;

  /* ===================================
     RENDERIZAR GALERIA (com fade)
     =================================== */
  const renderizarGaleria = (categoria) => {
    const imagens = bancoDeImagens[categoria] || [];

    // Fade out
    galeriaEl.classList.remove('fade-transicao');
    galeriaEl.style.opacity = '0';

    setTimeout(() => {
      galeriaEl.innerHTML = imagens.map((img, indice) => `
        <figure class="galeria__item" data-indice="${indice}">
          <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </figure>
      `).join('');

      // Fade in
      galeriaEl.classList.add('fade-transicao');
      galeriaEl.style.opacity = '1';

      // Vincula clique nas imagens para abrir o lightbox
      galeriaEl.querySelectorAll('.galeria__item').forEach((item) => {
        item.addEventListener('click', () => {
          const indice = parseInt(item.dataset.indice, 10);
          abrirLightbox(categoria, indice);
        });
      });
    }, 200);

    categoriaAtual = categoria;
  };

  /* ===================================
     TROCA DE CATEGORIA (botões)
     =================================== */
  const selecionarCategoria = (categoria) => {
    botoesCategoria.forEach((btn) => {
      const ativo = btn.dataset.categoria === categoria;
      btn.classList.toggle('categoria-btn--ativo', ativo);
      btn.setAttribute('aria-selected', ativo);
    });
    renderizarGaleria(categoria);
  };

  botoesCategoria.forEach((btn) => {
    btn.addEventListener('click', () => selecionarCategoria(btn.dataset.categoria));
  });

  // Links do footer também trocam categoria (com scroll até a galeria)
  linksFooterCategoria.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      selecionarCategoria(link.dataset.categoriaLink);
      document.querySelector('.ambientes').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ===================================
     LIGHTBOX
     =================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImagem = document.getElementById('lightbox-imagem');
  const btnFechar = document.getElementById('lightbox-fechar');
  const btnAnterior = document.getElementById('lightbox-anterior');
  const btnProxima = document.getElementById('lightbox-proxima');

  const abrirLightbox = (categoria, indice) => {
    categoriaAtual = categoria;
    indiceLightbox = indice;
    atualizarImagemLightbox();
    lightbox.classList.add('lightbox--ativo');
    document.body.style.overflow = 'hidden';
    btnFechar.focus();
  };

  const fecharLightbox = () => {
    lightbox.classList.remove('lightbox--ativo');
    document.body.style.overflow = '';
  };

  const atualizarImagemLightbox = () => {
    const imagens = bancoDeImagens[categoriaAtual];
    const img = imagens[indiceLightbox];
    lightboxImagem.src = img.src;
    lightboxImagem.alt = img.alt;
    lightboxImagem.classList.remove('zoom-ativo');
  };

  const imagemAnterior = () => {
    const imagens = bancoDeImagens[categoriaAtual];
    indiceLightbox = (indiceLightbox - 1 + imagens.length) % imagens.length;
    atualizarImagemLightbox();
  };

  const proximaImagem = () => {
    const imagens = bancoDeImagens[categoriaAtual];
    indiceLightbox = (indiceLightbox + 1) % imagens.length;
    atualizarImagemLightbox();
  };

  btnFechar.addEventListener('click', fecharLightbox);
  btnAnterior.addEventListener('click', imagemAnterior);
  btnProxima.addEventListener('click', proximaImagem);

  // Fecha ao clicar fora da imagem
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });

  // Zoom ao clicar na imagem
  lightboxImagem.addEventListener('click', () => {
    lightboxImagem.classList.toggle('zoom-ativo');
  });

  // Navegação por teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--ativo')) return;
    if (e.key === 'Escape') fecharLightbox();
    if (e.key === 'ArrowLeft') imagemAnterior();
    if (e.key === 'ArrowRight') proximaImagem();
  });

  /* ===================================
     Suporte a hash na URL (#cozinhas etc.)
     =================================== */
  const hashInicial = window.location.hash.replace('#', '');
  if (hashInicial && bancoDeImagens[hashInicial]) {
    selecionarCategoria(hashInicial);
  } else {
    renderizarGaleria(categoriaAtual);
  }
});
