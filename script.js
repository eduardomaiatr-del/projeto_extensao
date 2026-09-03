const niveisDeFonte = [1, 1.2, 1.4, 1.6, 1.8];
let nivelAtual = 0;

const raiz = document.documentElement;
const diminuirFonte = document.getElementById("diminuirFonte");
const aumentarFonte = document.getElementById("aumentarFonte");
const tamanhoFonte = document.getElementById("tamanhoFonte");

try {
  const nivelSalvo = Number(localStorage.getItem("nivelDaFonte"));

  if (
    Number.isInteger(nivelSalvo) &&
    nivelSalvo >= 0 &&
    nivelSalvo < niveisDeFonte.length
  ) {
    nivelAtual = nivelSalvo;
  }
} catch (erro) {
  nivelAtual = 0;
}

function atualizarFonte() {
  const escala = niveisDeFonte[nivelAtual];

  raiz.style.setProperty("--escala", escala);
  tamanhoFonte.textContent = Math.round(escala * 100) + "%";

  diminuirFonte.disabled = nivelAtual === 0;
  aumentarFonte.disabled = nivelAtual === niveisDeFonte.length - 1;

  try {
    localStorage.setItem("nivelDaFonte", String(nivelAtual));
  } catch (erro) {
  }
}

aumentarFonte.addEventListener("click", function () {
  if (nivelAtual < niveisDeFonte.length - 1) {
    nivelAtual++;
    atualizarFonte();
  }
});

diminuirFonte.addEventListener("click", function () {
  if (nivelAtual > 0) {
    nivelAtual--;
    atualizarFonte();
  }
});

const visualizador = document.getElementById("visualizador");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const legendaVisualizador = document.getElementById("legendaVisualizador");
const fecharVisualizador = document.getElementById("fecharVisualizador");

document.querySelectorAll(".ampliar").forEach(function (botao) {
  botao.addEventListener("click", function () {
    imagemAmpliada.src = botao.dataset.imagem;
    imagemAmpliada.alt = botao.dataset.legenda;
    legendaVisualizador.textContent = botao.dataset.legenda;
    visualizador.showModal();
  });
});

fecharVisualizador.addEventListener("click", function () {
  visualizador.close();
});

visualizador.addEventListener("click", function (evento) {
  if (evento.target === visualizador) {
    visualizador.close();
  }
});

const LINK_DO_FORMULARIO =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5gIDdjvZz0p85FSTIq7V8-kYsvO5hFTtKWknFDFSIioUO2g/viewform";

const linkFormulario = document.getElementById("linkFormulario");

if (LINK_DO_FORMULARIO) {
  linkFormulario.href = LINK_DO_FORMULARIO;
  linkFormulario.target = "_blank";
  linkFormulario.rel = "noopener noreferrer";
} else {
  linkFormulario.addEventListener("click", function (evento) {
    evento.preventDefault();
    alert("O link do formulário ainda precisa ser adicionado.");
  });
}

atualizarFonte();
