// ===== CALCULADORA & DICIONÁRIO =====
// Usa String (palavra digitada, texto dos resultados) e Number (os valores calculados).
// Cada aba pega dados dos inputs, faz algo com eles e manda tudo pro console.

// ---------- TROCA DE ABAS ----------
const botoesDeAba = document.querySelectorAll(".aba-botao");
const conteudosDeAba = document.querySelectorAll(".aba-conteudo");

botoesDeAba.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const alvo = botao.dataset.aba; // String com o id da aba a mostrar

    botoesDeAba.forEach(function (b) {
      b.classList.remove("ativo");
    });
    conteudosDeAba.forEach(function (c) {
      c.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    document.getElementById(alvo).classList.add("ativo");

    console.log("Aba trocada para:", alvo);
  });
});

// ---------- CALCULADORA ----------
// Guarda as operações como funções dentro de um objeto (sem usar if/switch)
const operacoes = {
  soma: function (a, b) { return a + b; },
  subtracao: function (a, b) { return a - b; },
  multiplicacao: function (a, b) { return a * b; },
  divisao: function (a, b) { return a / b; }
};

const botaoCalcular = document.getElementById("botaoCalcular");
const resultadoCalculadora = document.getElementById("resultadoCalculadora");

botaoCalcular.addEventListener("click", function () {
  // Valores brutos dos inputs (String)
  const valorABruto = document.getElementById("numeroA").value;
  const valorBBruto = document.getElementById("numeroB").value;
  const operacaoEscolhida = document.getElementById("operacao").value; // String

  console.log("Valores brutos:", valorABruto, valorBBruto, "| typeof:", typeof valorABruto);

  // Conversão String -> Number
  const numeroA = Number(valorABruto);
  const numeroB = Number(valorBBruto);
  console.log("Valores convertidos:", numeroA, numeroB, "| typeof:", typeof numeroA);

  // Fazendo algo com os dados: aplicando a função da operação escolhida
  const funcaoDaOperacao = operacoes[operacaoEscolhida];
  const resultado = funcaoDaOperacao(numeroA, numeroB);

  console.log("Operação escolhida:", operacaoEscolhida);
  console.log("Resultado calculado:", resultado);

  resultadoCalculadora.innerHTML =
    "<div class='cartao-resultado'>" +
    "<p class='rotulo'>Resultado</p>" +
    "<p class='valor'>" + resultado + "</p>" +
    "</div>";
});

// ---------- DICIONÁRIO (busca na internet) ----------
// Usa a API pública do Dicionário Aberto (dicionario-aberto.net) para
// buscar palavras reais em português. Usa fetch + async/await.

const botaoBuscar = document.getElementById("botaoBuscar");
const resultadoDicionario = document.getElementById("resultadoDicionario");

async function buscarNaInternet(palavra) {
  const url = "https://api.dicionario-aberto.net/word/" + encodeURIComponent(palavra);
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("A API respondeu com erro: " + resposta.status);
  }

  const dados = await resposta.json(); // Array de entradas encontradas
  return dados;
}

function extrairDefinicao(entradaXml) {
  // A API devolve a definição dentro de um XML, então usamos o DOMParser
  // para pegar só o texto de dentro da tag <def>
  const parser = new DOMParser();
  const documentoXml = parser.parseFromString(entradaXml, "text/xml");
  const tagDef = documentoXml.querySelector("def");
  const textoLimpo = tagDef ? tagDef.textContent.trim().replace(/\s+/g, " ") : "";
  return textoLimpo;
}

botaoBuscar.addEventListener("click", async function () {
  // Dado tipo String, vindo do input
  const palavraDigitada = document.getElementById("palavra").value.trim();
  const palavraTratada = palavraDigitada.toLowerCase();

  console.log("Palavra digitada (String):", palavraDigitada);

  resultadoDicionario.innerHTML = "<p class='carregando'>Buscando na internet...</p>";

  try {
    const dados = await buscarNaInternet(palavraTratada);
    console.log("Resposta da API:", dados);

    const naoEncontrou = dados.length === 0;
    const definicao = naoEncontrou ? "Essa palavra não foi encontrada." : extrairDefinicao(dados[0].xml);

    console.log("Definição encontrada:", definicao);

    resultadoDicionario.innerHTML =
      "<div class='cartao-resultado" + (naoEncontrou ? " erro" : "") + "'>" +
      "<p class='rotulo'>" + palavraTratada + "</p>" +
      "<p class='definicao'>" + definicao + "</p>" +
      "</div>";
  } catch (erro) {
    console.log("Erro ao buscar a palavra na internet:", erro);

    resultadoDicionario.innerHTML =
      "<div class='cartao-resultado erro'>" +
      "<p class='rotulo'>Erro</p>" +
      "<p class='definicao'>Não foi possível buscar essa palavra agora. Verifique sua internet e tente de novo.</p>" +
      "</div>";
  }
});