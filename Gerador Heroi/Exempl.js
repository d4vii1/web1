// ===== GERADOR DE CODINOME DE HERÓI =====
// Usa String (nome, codinome) e Number (energia, poder calculado).
// Pega os dados dos inputs, faz um cálculo com eles e manda tudo pro console.

const botao = document.getElementById("botaoGerar");
const resultadoDiv = document.getElementById("resultado");

botao.addEventListener("click", function () {
  resultadoDiv.innerHTML = "";

  // Dado tipo String, vindo do input de texto
  const nome = document.getElementById("nome").value.trim();

  // Dado que chega como String, mesmo sendo um número
  const numeroBruto = document.getElementById("numero").value;
  console.log("Valor bruto do input número:", numeroBruto, "| typeof:", typeof numeroBruto);

  // Conversão String -> Number
  const energia = Number(numeroBruto);
  console.log("Valor convertido:", energia, "| typeof:", typeof energia);

  if (nome === "" || numeroBruto === "" || isNaN(energia)) {
    resultadoDiv.innerHTML = "<p>Preencha seu nome e um número para virar herói.</p>";
    console.log("Não foi possível gerar o codinome: dados incompletos.");
    return;
  }

  // Fazendo algo com os dados: manipulando String e calculando com Number
  const codinome = "Capitão(ã) " + nome.toUpperCase();
  const poderTotal = energia * nome.length;
  const fraseDeEfeito = nome + ", seu poder de combate é " + poderTotal + "!";

  console.log("Nome digitado (String):", nome);
  console.log("Tamanho do nome usado no cálculo:", nome.length);
  console.log("Codinome gerado (String):", codinome);
  console.log("Poder total calculado (Number):", poderTotal);
  console.log("Frase final:", fraseDeEfeito);

  resultadoDiv.innerHTML =
    "<h2>" + codinome + "</h2>" +
    "<p><strong>Energia inicial:</strong> " + energia + "</p>" +
    "<p><strong>Tamanho do nome:</strong> " + nome.length + "</p>" +
    "<p class='balao'>" + fraseDeEfeito + "</p>";
});