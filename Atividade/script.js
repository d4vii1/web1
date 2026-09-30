let quantidadeNotas = 2;


// Adicionar nota
function adicionarNota() {

    if (quantidadeNotas >= 20) {

        alert("Você já adicionou 20 notas!");

        return;
    }

    quantidadeNotas++;

    let divNota = document.createElement("div");

    divNota.className = "nota";

    let label = document.createElement("label");

    label.textContent = "Nota " + quantidadeNotas;

    let input = document.createElement("input");

    input.type = "number";
    input.min = "0";
    input.max = "10";
    input.step = "0.1";
    input.placeholder = "Digite a nota";

    let botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.className = "btn-excluir";

    botaoExcluir.onclick = function () {

        excluirNota(botaoExcluir);

    };


    divNota.appendChild(label);

    divNota.appendChild(input);

    divNota.appendChild(botaoExcluir);

    document.getElementById("notas").appendChild(divNota);
}


// Excluir nota
function excluirNota(botao) {

    // Pegando a caixa da nota
    let nota = botao.parentElement;

    // Removendo a nota
    nota.remove();

    // Reorganizando as notas
    reorganizarNotas();
}


// Reorganizar a numeração
function reorganizarNotas() {

    let notas = document.querySelectorAll(".nota");

    quantidadeNotas = notas.length;

    for (let i = 0; i < notas.length; i++) {

        let label = notas[i].querySelector("label");

        let input = notas[i].querySelector("input");

        label.textContent = "Nota " + (i + 1);

        input.id = "nota" + (i + 1);
    }
}


// Calcular média
function calcularMedia() {

    let soma = 0;

    let notasPreenchidas = 0;

    let notas = document.querySelectorAll(".nota");


    for (let i = 0; i < notas.length; i++) {

        let input = notas[i].querySelector("input");

        let valor = input.value;


        if (valor !== "") {

            let nota = Number(valor);


            if (nota < 0 || nota > 10) {

                document.getElementById("media").textContent =
                    "Digite notas entre 0 e 10.";

                document.getElementById("situacao").textContent =
                    "Verifique os valores digitados.";

                return;
            }


            soma = soma + nota;

            notasPreenchidas++;
        }
    }


    if (notasPreenchidas === 0) {

        document.getElementById("media").textContent =
            "Digite pelo menos uma nota.";

        document.getElementById("situacao").textContent =
            "Nenhuma nota foi informada.";

        return;
    }


    let resultado = soma / notasPreenchidas;


    document.getElementById("media").textContent =
        "Média: " + resultado.toFixed(2);


    if (resultado >= 7) {

        document.getElementById("situacao").textContent =
            "Situação: Aprovado";

    } else if (resultado >= 5) {

        document.getElementById("situacao").textContent =
            "Situação: Recuperação";

    } else {

        document.getElementById("situacao").textContent =
            "Situação: Reprovado";
    }
}