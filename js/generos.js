// caminho ate os arquivos php, a partir da pagina home/generos.html
const API = "../php/generos";

// guarda os generos que vieram do banco para usar ao clicar em editar
let generos = [];

// espera a pagina carregar todo o html antes de rodar a funcao listar
document.addEventListener("DOMContentLoaded", function () {
    listar();
});

// funcao chamada quando o usuario clica no botao cadastrar
async function salvarGenero() {
    // pega os valores digitados nos campos da tela
    // .value serve para ler o conteudo de inputs e textareas
    let nome = document.getElementById("inputGenero").value.trim();
    let descricao = document.getElementById("inputDescricao").value.trim();

    // validacao simples: se nome ou descricao estiverem vazios, avisa e para a funcao
    if (!nome || !descricao) {
        alert("Por favor, preencha todos os campos");
        return;
    }

    // FormData monta os dados que o php le com $_POST
    let dados = new FormData();
    dados.append("nome", nome);
    dados.append("descricao", descricao);

    try {
        // fetch envia os dados para o php, que grava no banco
        // await espera a resposta antes de continuar
        let resposta = await fetch(`${API}/genero_novo.php`, {
            method: "POST",
            body: dados
        });

        // transforma o json devolvido pelo php em um objeto do javascript
        let retorno = await resposta.json();

        // se o php respondeu que nao deu certo, mostra a mensagem e para a funcao
        if (retorno.status !== "ok") {
            alert(retorno.mensagem);
            return;
        }

        // limpa os campos do formulario
        limparFormulario();

        // busca os dados de novo para o novo genero ja aparecer
        await listar();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível cadastrar o gênero. Verifique se ele já existe.");
    }
}

// funcao que busca os generos no banco e monta os cards na tela
async function listar() {
    let cards = document.getElementById("card-genero");

    try {
        // sem method, o fetch faz um GET, usado para buscar dados
        let resposta = await fetch(`${API}/genero_get.php`);
        let retorno = await resposta.json();

        if (retorno.status !== "ok") {
            alert(retorno.mensagem);
            return;
        }

        // retorno.data e a lista de generos enviada pelo php
        generos = retorno.data;

        // limpa a div onde ficam os cards para nao duplicar o conteudo anterior
        cards.innerHTML = "";

        // for...of repete o bloco de codigo uma vez para cada item
        // da lista. a cada volta, "genero" representa o item atual
        for (let genero of generos) {
            // agora cada card usa o id_genero do banco, em vez da posicao na lista
            cards.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4">
                <div id="genero-${genero.id_genero}" class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title" id="titulo-${genero.id_genero}"></h5>
                        <p class="card-text text-muted" id="descricao-${genero.id_genero}"></p>
                    </div>

                    <!-- rodape com os botoes de acao (editar e excluir) passando o id -->
                    <div class="card-footer bg-white d-flex justify-content-end gap-2">
                        <button class="btn btn-sm btn-outline-warning" onclick="carregar(${genero.id_genero})">Editar</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="excluir(${genero.id_genero})">Excluir</button>
                    </div>
                </div>
            </div>
            `;
        }

        // preenche os textos depois com textContent, assim o que o usuario digitou
        // nunca e interpretado como html (evita injetar codigo pela caixinha)
        for (let genero of generos) {
            document.getElementById(`titulo-${genero.id_genero}`).textContent = genero.nome;
            document.getElementById(`descricao-${genero.id_genero}`).textContent = genero.descricao;
        }
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os gêneros.");
    }
}

// funcao para apagar um genero pelo id dele
async function excluir(id) {
    try {
        // o id vai pela url, assim como no genero_alterar.php
        let resposta = await fetch(`${API}/genero_excluir.php?id=${id}`);
        let retorno = await resposta.json();

        if (retorno.status !== "ok") {
            alert(retorno.mensagem);
            return;
        }

        // redesenha os cards na tela
        await listar();

        alert("Gênero excluído com sucesso!");
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o gênero.");
    }
}

// funcao que carrega os dados do genero de volta nos campos para o usuario poder editar
function carregar(id) {
    // procura na lista o genero que tem o id clicado
    let genero = generos.find(function (item) {
        return Number(item.id_genero) === id;
    });

    // se nao encontrou o genero, para a funcao
    if (!genero) {
        return;
    }

    // preenche os campos com os dados atuais do genero
    document.getElementById("inputGenero").value = genero.nome;
    document.getElementById("inputDescricao").value = genero.descricao ?? "";

    // cria dinamicamente o botao amarelo para confirmar a alteracao daquele genero
    document.getElementById("alterar").innerHTML = `<button class="btn btn-warning w-100 mb-2" onclick="alterar(${id})">Salvar Alteração</button>`;
}

// funcao chamada quando o usuario clica em "salvar alteracao"
async function alterar(id) {
    let nome = document.getElementById("inputGenero").value.trim();
    let descricao = document.getElementById("inputDescricao").value.trim();

    if (!nome || !descricao) {
        alert("Por favor, preencha todos os campos");
        return;
    }

    let dados = new FormData();
    dados.append("nome", nome);
    dados.append("descricao", descricao);

    try {
        // o id vai pela url e os novos dados vao pelo POST
        let resposta = await fetch(`${API}/genero_alterar.php?id=${id}`, {
            method: "POST",
            body: dados
        });
        let retorno = await resposta.json();

        if (retorno.status !== "ok") {
            alert(retorno.mensagem);
            return;
        }

        // limpa o botao de alterar e os campos, ja que a edicao foi concluida
        document.getElementById("alterar").innerHTML = "";
        limparFormulario();

        await listar();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível alterar o gênero.");
    }
}

// funcao que limpa os campos do formulario
function limparFormulario() {
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputDescricao").value = "";
}