// =====================================================
//  MINI COPA: usando for, while e do...while
// =====================================================

// ---------- Dados ----------
const todasSelecoes = [
    { nome: "Brasil",    sigla: "BRA", cor: "#f5c400", forca: 90 },
    { nome: "Argentina", sigla: "ARG", cor: "#7cc4f2", forca: 88 },
    { nome: "França",    sigla: "FRA", cor: "#6f9bf5", forca: 87 },
    { nome: "Espanha",   sigla: "ESP", cor: "#f58a8a", forca: 85 },
    { nome: "Portugal",  sigla: "POR", cor: "#5fdc8c", forca: 83 },
    { nome: "Alemanha",  sigla: "ALE", cor: "#e5e7eb", forca: 82 },
    { nome: "Holanda",   sigla: "HOL", cor: "#fb923c", forca: 81 },
    { nome: "Itália",    sigla: "ITA", cor: "#60a5fa", forca: 80 },
    { nome: "Uruguai",   sigla: "URU", cor: "#a5d8ff", forca: 78 },
    { nome: "Marrocos",  sigla: "MAR", cor: "#f87171", forca: 76 },
    { nome: "Japão",     sigla: "JAP", cor: "#fca5a5", forca: 74 },
    { nome: "México",    sigla: "MEX", cor: "#86efac", forca: 72 }
  ];
  
  let selecoes = []; // seleções sorteadas na etapa 1
  
  // ---------- Elementos da página ----------
  const campoQtd      = document.getElementById("qtdTimes");
  const msg1          = document.getElementById("msg1");
  const gridTimes     = document.getElementById("times");
  const btnSortear    = document.getElementById("btnSortear");
  const btnJogar      = document.getElementById("btnJogar");
  const btnPenaltis   = document.getElementById("btnPenaltis");
  const confronto2    = document.getElementById("confronto2");
  const confronto3    = document.getElementById("confronto3");
  const placar        = document.getElementById("placar");
  const listaLances   = document.getElementById("lances");
  const resumo        = document.getElementById("resumo");
  const painelPenalti = document.getElementById("penaltis");
  const resumoPenalti = document.getElementById("resumoPenaltis");
  const contFor       = document.getElementById("contFor");
  const contWhile     = document.getElementById("contWhile");
  const contDo        = document.getElementById("contDo");
  
  // ---------- Funções auxiliares ----------
  // Cria um elemento já com classe e texto
  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }
  
  function criarEscudo(time) {
    const escudo = criar("span", "escudo", time.sigla);
    escudo.style.background = time.cor;
    return escudo;
  }
  
  // Mostra "Brasil x Argentina" nas etapas 2 e 3
  function montarConfronto(destino) {
    const a = selecoes[0];
    const b = selecoes[1];
    destino.innerHTML = "";
    destino.append(
      criarEscudo(a), criar("strong", "", a.nome),
      criar("span", "x", "x"),
      criar("strong", "", b.nome), criarEscudo(b)
    );
  }
  
  function sortearEntre(a, b) {
    return Math.random() < 0.5 ? a : b;
  }
  
  // =====================================================
  //  ETAPA 1: laço FOR (quantidade conhecida de voltas)
  // =====================================================
  function sortearSelecoes() {
    // O valor do input vem como String, então convertemos com Number()
    const qtd = Number(campoQtd.value);
  
    // Condicional: valida o número digitado
    if (!Number.isInteger(qtd) || qtd < 2 || qtd > 8) {
      msg1.textContent = "Digite um número inteiro de 2 a 8.";
      msg1.className = "msg erro";
      return;
    }
  
    msg1.className = "msg";
    gridTimes.innerHTML = "";
    selecoes = [];
    limparResultados();
  
    const disponiveis = [...todasSelecoes]; // cópia da lista
    let voltas = 0;
  
    // for: repete exatamente "qtd" vezes
    for (let i = 0; i < qtd; i++) {
      const posicao = Math.floor(Math.random() * disponiveis.length);
      const time = disponiveis.splice(posicao, 1)[0]; // tira da lista para não repetir
      selecoes.push(time);
  
      const cartao = criar("div", "time");
      cartao.style.animationDelay = (i * 90) + "ms";
      cartao.append(
        criarEscudo(time),
        criar("strong", "", time.nome),
        criar("small", "", "Força " + time.forca)
      );
      gridTimes.appendChild(cartao);
  
      voltas++;
    }
  
    contFor.textContent = voltas;
    msg1.textContent = qtd + " seleções sorteadas. O primeiro confronto é " +
                       selecoes[0].nome + " x " + selecoes[1].nome + ".";
  
    montarConfronto(confronto2);
    montarConfronto(confronto3);
    btnJogar.disabled = false;
    btnPenaltis.disabled = false;
  }
  
  function limparResultados() {
    placar.textContent = "";
    listaLances.innerHTML = "";
    resumo.textContent = "";
    painelPenalti.innerHTML = "";
    resumoPenalti.textContent = "";
    contWhile.textContent = 0;
    contDo.textContent = 0;
  }
  
  // =====================================================
  //  ETAPA 2: laço WHILE (não sabemos quantos lances vão ocorrer)
  // =====================================================
  function jogarPartida() {
    const a = selecoes[0];
    const b = selecoes[1];
    const chanceA = a.forca / (a.forca + b.forca); // time mais forte ataca mais
  
    let minuto = 0;
    let golsA = 0;
    let golsB = 0;
    let voltas = 0;
    const lances = [];
  
    // while: continua enquanto o relógio estiver abaixo de 90 minutos
    while (minuto < 90) {
      minuto += Math.floor(Math.random() * 8) + 3; // o relógio avança de 3 a 10 minutos
      if (minuto > 90) minuto = 90;
      voltas++;
  
      const sorte = Math.random();
  
      if (sorte < 0.28) {
        // gol
        const marcou = Math.random() < chanceA ? a : b;
        if (marcou === a) golsA++; else golsB++;
        lances.push({
          minuto: minuto, gol: true,
          texto: "⚽ Gol de " + marcou.nome + "! (" + golsA + " x " + golsB + ")"
        });
      } else if (sorte < 0.42) {
        // cartão amarelo
        lances.push({ minuto: minuto, gol: false, texto: "🟨 Cartão amarelo para " + sortearEntre(a, b).nome });
      } else if (sorte < 0.55) {
        // chance perdida
        lances.push({ minuto: minuto, gol: false, texto: "😮 " + sortearEntre(a, b).nome + " bate na trave!" });
      }
      // nos outros casos nada acontece e o jogo segue
    }
  
    lances.push({ minuto: 90, gol: false, texto: "🏁 Fim de jogo!" });
  
    // Mostra os lances na tela (outro for, agora para desenhar a lista)
    listaLances.innerHTML = "";
    for (let i = 0; i < lances.length; i++) {
      const item = criar("li", lances[i].gol ? "gol" : "");
      item.style.animationDelay = (i * 110) + "ms";
      item.append(criar("span", "min", lances[i].minuto + "'"), criar("span", "", lances[i].texto));
      listaLances.appendChild(item);
    }
  
    placar.textContent = a.sigla + " " + golsA + " x " + golsB + " " + b.sigla;
    contWhile.textContent = voltas;
  
    // Condicional: define o resultado
    if (golsA > golsB) {
      resumo.textContent = "Vitória do " + a.nome + "!";
    } else if (golsB > golsA) {
      resumo.textContent = "Vitória do " + b.nome + "!";
    } else {
      resumo.textContent = "Empate! Dá para decidir nos pênaltis.";
    }
  }
  
  // =====================================================
  //  ETAPA 3: laço DO...WHILE (a primeira cobrança sempre acontece)
  // =====================================================
  function disputarPenaltis() {
    const a = selecoes[0];
    const b = selecoes[1];
    const chanceA = 0.6 + a.forca / 400; // chance de converter a cobrança
    const chanceB = 0.6 + b.forca / 400;
  
    let golsA = 0;
    let golsB = 0;
    let rodada = 0;
    const cobrancas = [];
  
    // do...while: cobra primeiro, depois confere se precisa continuar
    do {
      rodada++;
      const marcouA = Math.random() < chanceA;
      const marcouB = Math.random() < chanceB;
      if (marcouA) golsA++;
      if (marcouB) golsB++;
      cobrancas.push({ rodada: rodada, a: marcouA, b: marcouB });
      // repete se ainda não completou 5 cobranças OU se continua empatado (morte súbita)
    } while (rodada < 5 || golsA === golsB);
  
    // Mostra a tabela de cobranças (for para desenhar as linhas)
    painelPenalti.innerHTML = "";
    const cab = criar("div", "penalti cab");
    cab.append(criar("span", "", "Cobrança"), criar("span", "", a.sigla), criar("span", "", b.sigla));
    painelPenalti.appendChild(cab);
  
    for (let i = 0; i < cobrancas.length; i++) {
      const c = cobrancas[i];
      const linha = criar("div", c.rodada > 5 ? "penalti subita" : "penalti");
      linha.style.animationDelay = (i * 140) + "ms";
      linha.append(
        criar("span", "", c.rodada > 5 ? c.rodada + "ª (morte súbita)" : c.rodada + "ª"),
        criar("span", "", c.a ? "⚽ Gol" : "❌ Perdeu"),
        criar("span", "", c.b ? "⚽ Gol" : "❌ Perdeu")
      );
      painelPenalti.appendChild(linha);
    }
  
    contDo.textContent = rodada;
  
    const campeao = golsA > golsB ? a : b;
    resumoPenalti.textContent = "🏆 " + campeao.nome + " vence nos pênaltis por " +
                                Math.max(golsA, golsB) + " x " + Math.min(golsA, golsB) + "!";
  }
  
  // ---------- Eventos ----------
  btnSortear.addEventListener("click", sortearSelecoes);
  btnJogar.addEventListener("click", jogarPartida);
  btnPenaltis.addEventListener("click", disputarPenaltis);
  campoQtd.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") sortearSelecoes();
  });
  
  // Já começa com um sorteio feito
  sortearSelecoes();