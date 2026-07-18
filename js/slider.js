/* ===================================
   SLIDER AUTOMÁTICO DE DEPOIMENTOS
   =================================== */
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider-depoimentos');
  if (!slider) return;

  const track = slider.querySelector('.slider__track');
  const slides = slider.querySelectorAll('.slider__slide');
  let indiceAtual = 0;

  const irParaSlide = (indice) => {
    track.style.transform = `translateX(-${indice * 100}%)`;
  };

  const proximoSlide = () => {
    indiceAtual = (indiceAtual + 1) % slides.length;
    irParaSlide(indiceAtual);
  };

  setInterval(proximoSlide, 5000); // troca a cada 5s
});
