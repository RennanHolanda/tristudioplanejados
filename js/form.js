/* ===================================
   VALIDAÇÃO DO FORMULÁRIO DE ORÇAMENTO
   TriStudio Planejados
   =================================== */
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('form-orcamento');
  if (!form) return;

  const feedbackGeral = document.getElementById('feedback-geral');

  /* ===================================
     REGRAS DE VALIDAÇÃO POR CAMPO
     =================================== */
  const validadores = {
    nome: (valor) => {
      if (!valor.trim()) return 'Por favor, informe seu nome.';
      if (valor.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
      return '';
    },
    telefone: (valor) => {
      const numeros = valor.replace(/\D/g, '');
      if (!numeros) return 'Por favor, informe um telefone.';
      if (numeros.length < 10) return 'Telefone inválido. Inclua o DDD.';
      return '';
    },
    whatsapp: (valor) => {
      const numeros = valor.replace(/\D/g, '');
      if (!numeros) return 'Por favor, informe seu WhatsApp.';
      if (numeros.length < 10) return 'WhatsApp inválido. Inclua o DDD.';
      return '';
    },
    email: (valor) => {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!valor.trim()) return 'Por favor, informe seu e-mail.';
      if (!regexEmail.test(valor)) return 'Digite um e-mail válido.';
      return '';
    },
    cidade: (valor) => {
      if (!valor.trim()) return 'Por favor, informe sua cidade.';
      return '';
    },
    ambiente: (valor) => {
      if (!valor) return 'Selecione um ambiente desejado.';
      return '';
    },
  };

  /* ===================================
     MÁSCARA DE TELEFONE (simples)
     =================================== */
  const aplicarMascaraTelefone = (input) => {
    input.addEventListener('input', () => {
      let valor = input.value.replace(/\D/g, '').slice(0, 11);
      if (valor.length > 6) {
        valor = valor.replace(/^(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
      } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (valor.length > 0) {
        valor = valor.replace(/^(\d{0,2})/, '($1');
      }
      input.value = valor.trim();
    });
  };

  aplicarMascaraTelefone(document.getElementById('telefone'));
  aplicarMascaraTelefone(document.getElementById('whatsapp'));

  /* ===================================
     EXIBE / OCULTA ERRO EM UM CAMPO
     =================================== */
  const mostrarErro = (idCampo, mensagem) => {
    const input = document.getElementById(idCampo);
    const erroEl = document.getElementById(`erro-${idCampo}`);

    if (mensagem) {
      input.classList.add('campo--invalido');
      erroEl.textContent = mensagem;
    } else {
      input.classList.remove('campo--invalido');
      erroEl.textContent = '';
    }
  };

  /* ===================================
     VALIDA UM CAMPO ESPECÍFICO
     =================================== */
  const validarCampo = (idCampo) => {
    const input = document.getElementById(idCampo);
    const validador = validadores[idCampo];
    if (!validador) return true;

    const mensagemErro = validador(input.value);
    mostrarErro(idCampo, mensagemErro);
    return !mensagemErro;
  };

  // Validação em tempo real (ao sair do campo)
  Object.keys(validadores).forEach((idCampo) => {
    const input = document.getElementById(idCampo);
    if (input) {
      input.addEventListener('blur', () => validarCampo(idCampo));
    }
  });

  /* ===================================
     ENVIO DO FORMULÁRIO
     =================================== */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formularioValido = true;
    Object.keys(validadores).forEach((idCampo) => {
      const valido = validarCampo(idCampo);
      if (!valido) formularioValido = false;
    });

    if (!formularioValido) {
      feedbackGeral.textContent = 'Por favor, corrija os campos destacados antes de enviar.';
      feedbackGeral.className = 'formulario__feedback formulario__feedback--erro';
      // Rola até o primeiro campo inválido
      const primeiroInvalido = form.querySelector('.campo--invalido');
      if (primeiroInvalido) primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* ===================================
       AQUI ENTRA A INTEGRAÇÃO REAL
       (endpoint próprio, EmailJS, Formspree, etc.)
       Por padrão simulamos o envio com sucesso.
       =================================== */
    feedbackGeral.textContent = 'Solicitação enviada com sucesso! Em breve entraremos em contato.';
    feedbackGeral.className = 'formulario__feedback formulario__feedback--sucesso';

    form.reset();
    // Remove classes de erro remanescentes
    form.querySelectorAll('.campo--invalido').forEach((el) => el.classList.remove('campo--invalido'));
  });
});
