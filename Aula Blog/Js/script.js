// js/script.js

async function carregarPagina(pagina){

    try{

        const resposta = await fetch(pagina);

        if(!resposta.ok){
            throw new Error("Página não encontrada");
        }

        const html = await resposta.text();

        document.getElementById("conteudo").innerHTML = html;

    } catch(erro){

        document.getElementById("conteudo").innerHTML = `
            <h2>Erro</h2>
            <p>Não foi possível carregar a página.</p>
        `;

        console.error(erro);
    }
}

/* Página inicial */

window.onload = () => {
    carregarPagina("pages/home.html");
};