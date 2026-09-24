// ===== GERADOR DE TABUADA =====
// Usa apenas: let/const, conversão com Number() e um laço FOR.
// Sem if, sem switch, sem nenhuma condicional.

const botao = document.getElementById("botaoGerar");
const listaResultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
  listaResultado.innerHTML = "";

  // O valor do input sempre chega como String
  const valorDoInput = document.getElementById("numero").value;
  console.log("Valor bruto do input:", valorDoInput, "| typeof:", typeof valorDoInput);

  // Conversão de String para Number, como no material
  const numero = Number(valorDoInput);
  console.log("Valor convertido:", numero, "| typeof:", typeof numero);

  // Laço FOR gerando a tabuada de 1 até 10
  for (let i = 1; i <= 10; i++) {
    const resultadoLinha = numero * i;

    const linha = numero + " x " + i + " = " + resultadoLinha;
    console.log(linha);

    const item = document.createElement("li");
    item.textContent = linha;
    listaResultado.appendChild(item);
  }
});