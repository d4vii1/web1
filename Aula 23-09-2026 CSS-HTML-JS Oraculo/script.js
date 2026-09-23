// ===== ORÁCULO DIGITAL =====
// Projeto que usa: let/const, tipos de dados, conversões (Number()),
// condicionais (if/else if/else/switch), operadores lógicos (&&, ||, !)
// e laços de repetição (for, while, break, continue).

const destinos = [
  "Uma porta que você já bateu vai finalmente se abrir.",
  "Alguém do passado vai reaparecer com uma proposta inesperada.",
  "Seu maior obstáculo esta semana é a própria pressa.",
  "Um projeto pequeno vai render um resultado gigante.",
  "É hora de terminar algo que você deixou pela metade.",
  "Uma conversa difícil vai aliviar um peso que você carrega.",
  "A sorte está do seu lado, mas só se você agir logo.",
  "Um erro recente vai virar o seu maior aprendizado.",
  "Alguém está prestes a pedir sua ajuda com algo importante.",
  "Descanse: sua energia vai ser muito necessária em breve."
];

// Sussurros que às vezes aparecem no meio do embaralhar (só clima, não afetam o resultado)
const sussurros = [
  "alguém mais está lendo isso com você.",
  "as cartas já sabiam seu nome antes de você digitar.",
  "não olhe para trás enquanto elas giram.",
  "isso já aconteceu antes, você só não lembra."
];

const botao = document.getElementById("botaoConsultar");
const terminal = document.getElementById("terminal");
const resultadoDiv = document.getElementById("resultado");

function escreverNoTerminal(texto, tipo) {
  const linha = document.createElement("p");
  linha.className = "linha-terminal" + (tipo ? " " + tipo : "");
  linha.textContent = "> " + texto;
  terminal.appendChild(linha);
  terminal.scrollTop = terminal.scrollHeight;
}

// Dá um "susto" rápido na tela: um flash vermelho de um instante
function assustar() {
  document.body.classList.add("flash");
  setTimeout(function () {
    document.body.classList.remove("flash");
  }, 90);
}

botao.addEventListener("click", function () {
  terminal.innerHTML = "";
  resultadoDiv.innerHTML = "";

  const nome = document.getElementById("nome").value.trim();
  const numeroBruto = document.getElementById("numero").value;

  console.log("Valor bruto do input número:", numeroBruto, "| typeof:", typeof numeroBruto);

  const numero = Number(numeroBruto);

  if (nome === "" || numeroBruto === "" || isNaN(numero)) {
    escreverNoTerminal("erro: preencha seu nome e um número válido.", "linha-erro");
    console.log("Consulta cancelada: dados inválidos.");
    return;
  }

  console.log("Valor convertido:", numero, "| typeof:", typeof numero);
  assustar();
  escreverNoTerminal("consulente: " + nome);
  escreverNoTerminal("número revelado: " + numero);

  // Laço FOR simulando o embaralhar de cartas, com sussurros aleatórios
  for (let i = 1; i <= 5; i++) {
    escreverNoTerminal("embaralhando as cartas... (" + i + "/5)");
    console.log("Embaralhamento - passo " + i + " de 5");

    if (Math.random() < 0.4) {
      const indiceSussurro = Math.floor(Math.random() * sussurros.length);
      escreverNoTerminal(sussurros[indiceSussurro], "linha-sussurro");
    }
  }

  // Laço WHILE contando vogais do nome
  const vogais = "aeiouAEIOU";
  let contadorVogais = 0;
  let indice = 0;
  while (indice < nome.length) {
    if (vogais.includes(nome[indice])) {
      contadorVogais++;
    }
    indice++;
  }
  escreverNoTerminal("seu nome tem " + contadorVogais + " vogais.");

  // Laço FOR com BREAK e CONTINUE: procurando o dígito sagrado "7"
  const digitos = Math.abs(numero).toString();
  let encontrouSete = false;
  for (let i = 0; i < digitos.length; i++) {
    if (digitos[i] === "0") {
      continue;
    }
    if (digitos[i] === "7") {
      encontrouSete = true;
      assustar();
      escreverNoTerminal("o dígito sagrado 7 apareceu no seu número!");
      break;
    }
  }

  let paridade;
  if (numero % 2 === 0) {
    paridade = "par";
  } else {
    paridade = "ímpar";
  }

  let somaDigitos = 0;
  for (let i = 0; i < digitos.length; i++) {
    somaDigitos += Number(digitos[i]);
  }

  let energia;
  switch (somaDigitos % 4) {
    case 0:
      energia = "Energia da Terra";
      break;
    case 1:
      energia = "Energia do Fogo";
      break;
    case 2:
      energia = "Energia da Água";
      break;
    default:
      energia = "Energia do Ar";
  }

  const indiceDestino = Math.abs(numero + contadorVogais) % destinos.length;
  const destino = destinos[indiceDestino];

  let mensagemBonus = "";
  if (encontrouSete && paridade === "ímpar") {
    mensagemBonus = "Combinação rara: grandes mudanças estão a caminho.";
  } else if (contadorVogais >= 3 || numero > 50) {
    mensagemBonus = "Sua energia está vibrando forte hoje.";
  }

  const resultadoFinal = {
    nome: nome,
    numero: numero,
    paridade: paridade,
    vogaisNoNome: contadorVogais,
    somaDigitos: somaDigitos,
    energia: energia,
    encontrouSete: encontrouSete,
    destino: destino,
    mensagemBonus: mensagemBonus
  };

  console.log("===== RESULTADO DA CONSULTA =====");
  console.log(resultadoFinal);

  assustar();

  resultadoDiv.innerHTML =
    "<h2>" + nome + ", seu destino foi revelado</h2>" +
    "<p><strong>Número:</strong> " + numero + " (" + paridade + ")</p>" +
    "<p><strong>Energia dominante:</strong> " + energia + "</p>" +
    "<p class='frase-destino'>\"" + destino + "\"</p>" +
    (mensagemBonus ? "<p class='bonus'>" + mensagemBonus + "</p>" : "");
});

// ===== FUMAÇA ANIMADA DE FUNDO =====
(function () {
  const canvas = document.getElementById("fumaca");
  const ctx = canvas.getContext("2d");
  let largura, altura;

  function redimensionar() {
    largura = canvas.width = window.innerWidth;
    altura = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", redimensionar);
  redimensionar();

  const cores = ["93,58,160", "139,30,63", "60,30,90"];

  function criarParticula() {
    return {
      x: Math.random() * largura,
      y: altura + Math.random() * 120,
      raio: 90 + Math.random() * 150,
      velocidadeY: 0.12 + Math.random() * 0.3,
      deriva: (Math.random() - 0.5) * 0.5,
      opacidadeBase: 0.05 + Math.random() * 0.08,
      cor: cores[Math.floor(Math.random() * cores.length)],
      angulo: Math.random() * Math.PI * 2
    };
  }

  const quantidade = 16;
  const particulas = [];
  for (let i = 0; i < quantidade; i++) {
    const p = criarParticula();
    p.y = Math.random() * altura;
    particulas.push(p);
  }

  function desenharParticula(p) {
    const oscilacao = Math.sin(p.angulo) * 0.5 + 0.5;
    const opacidade = p.opacidadeBase * (0.6 + oscilacao * 0.4);
    const gradiente = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.raio);
    gradiente.addColorStop(0, "rgba(" + p.cor + ", " + opacidade + ")");
    gradiente.addColorStop(1, "rgba(" + p.cor + ", 0)");
    ctx.fillStyle = gradiente;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
    ctx.fill();
  }

  function atualizarParticula(p) {
    p.y -= p.velocidadeY;
    p.x += Math.sin(p.angulo) * p.deriva;
    p.angulo += 0.01;

    if (p.y + p.raio < 0) {
      Object.assign(p, criarParticula());
    }
  }

  function animar() {
    ctx.clearRect(0, 0, largura, altura);
    ctx.globalCompositeOperation = "lighter";
    particulas.forEach(function (p) {
      atualizarParticula(p);
      desenharParticula(p);
    });
    requestAnimationFrame(animar);
  }

  animar();
})();

// ===== SUSTOS ALEATÓRIOS DE FUNDO =====
setInterval(function () {
  if (Math.random() < 0.15) {
    assustar();
  }
}, 4000);