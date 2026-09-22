// espera a pagina carregar todo o html antes de rodar a funcao listar
document.addEventListener("DOMContentLoaded", function () {
    listar();
});

// funcao chamada quando o usuario clica no botao cadastrar
function salvarGenero() {
    // pega os valores digitados nos campos da tela
    // .value serve para ler o conteúdo de inputs e textareas
    let nome = document.getElementById("inputGenero").value;
    let descricao = document.getElementById("inputDescricao").value;

    // busca os generos salvos no navegador; se nao tiver nenhum ainda, cria uma lista vazia []
    // o localStorage só guarda TEXTO, então usamos JSON.parse para
    // transformar esse texto de volta em uma lista (array) de verdade.
    let lista = JSON.parse(localStorage.getItem("generos")) || [];

    // validacao simples: se nome ou descricao estiverem vazios, avisa e para a funcao
    if (!nome || !descricao) {
        alert("Por favor, preencha todos os campos");
        return;
    }

    // adiciona o novo genero no final da lista
    lista.push({ nome, descricao });

    // salva a lista atualizada de volta na memoria do localStorage do navegador
    // como o localStorage só aceita texto, usamos JSON.stringify
    // para transformar a lista (array) em texto antes de guardar
    localStorage.setItem("generos", JSON.stringify(lista));

    // atualiza os cards na tela para o novo genero ja aparecer
    listar();

    // limpa os campos do formulario
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputDescricao").value = "";
}

// funcao que le o localstorage e monta os cards na tela
function listar() {

    //busca a lista de generos salva
    let lista = JSON.parse(localStorage.getItem("generos")) || [];

    // limpa a div onde ficam os cards para nao duplicar o conteudo anterior
    document.getElementById("card-genero").innerHTML = "";

    // guarda a posiçao de cada genero na lista para poder editar ou excluir depois   
    let indice = 0;

    // for...of repete o bloco de código uma vez para cada item
    // da lista. a cada volta, "genero" representa o item atual
    for (let genero of lista) {
        //inner HTML serve para colocar o conteudo dentro de uma div que pode ser modificada
        document.getElementById("card-genero").innerHTML += `
        <div class="col-12 col-sm-6 col-md-4">
            <div id="genero-${indice}" class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title" id="titulo-${indice}"></h5>
                    <p class="card-text text-muted" id="descricao-${indice}"></p>
                </div>

                <!-- rodape com os botoes de acao (editar e excluir) passando o indice -->
                <div class="card-footer bg-white d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-outline-warning" onclick="carregar(${indice})">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluir(${indice})">Excluir</button>
                </div>
            </div>
        </div>
        `;

        // soma 1 ao índice, para o próximo card da lista receber
        // um id diferente (genero-0, genero-1, genero-2...)
        indice++;
    }

    // preenche os textos depois com textContent, assim o que o usuario digitou
    // nunca e interpretado como html (evita injetar codigo pela caixinha)
    indice = 0;
    for (let genero of lista) {

        // encontra o título vazio criado no loop anterior (pelo id)
        // e coloca o texto do nome do gênero usando textContent.
        //
        // a diferença entre textContent e innerHTML:
        // - innerHTML interpreta o texto como código HTML
        // - textContent trata tudo como texto puro
        //
        // se o usuário digitasse algo como "<b>Romance</b>" no
        // campo, com innerHTML o navegador deixaria "Romance" em
        // negrito (ou até executaria um script malicioso). com
        // textContent, apareceria exatamente "<b>Romance</b>"
        // escrito na tela, sem risco
        document.getElementById(`titulo-${indice}`).textContent = genero.nome;
        
        // faz o mesmo para a descricao do genero
        document.getElementById(`descricao-${indice}`).textContent = genero.descricao;
        indice++;
    }
}

// funcao para apagar um genero pelo indice dele
function excluir(indice) {
    let lista = JSON.parse(localStorage.getItem("generos")) || [];

    // o splice remove 1 item exatamente na posicao do indice clicado
    lista.splice(indice, 1);

    localStorage.setItem("generos", JSON.stringify(lista));

    // redesenha os cards na tela
    listar();

    alert("Gênero excluído com sucesso!");
}

// funcao que carrega os dados do genero de volta nos campos para o usuario poder editar
function carregar(indice) {
    // busca a lista atual salva no localStorage
    let lista = JSON.parse(localStorage.getItem("generos")) || [];

    // lista[indice] acessa o gênero que está naquela posição da lista.
    // .nome e .descricao pegam as informações guardadas nele.
    // atribuir esses valores a ".value" preenche visualmente os
    // campos de input/textarea com os dados atuais do gênero
    document.getElementById("inputGenero").value = lista[indice].nome;
    document.getElementById("inputDescricao").value = lista[indice].descricao;

    // cria dinamicamente o botao amarelo para confirmar a alteracao daquela posicao
    document.getElementById("alterar").innerHTML = `<button class="btn btn-warning w-100 mb-2" onclick="alterar(${indice})">Salvar Alteração</button>`;
}

// funcao chamada quando o usuario clica em "salvar alteracao"
function alterar(indice) {
    let lista = JSON.parse(localStorage.getItem("generos")) || [];

    // substitui os dados antigos daquela posicao pelos novos valores dos campos
    lista[indice].nome = document.getElementById("inputGenero").value;
    lista[indice].descricao = document.getElementById("inputDescricao").value;

    localStorage.setItem("generos", JSON.stringify(lista));

    // limpa o botao de alterar e os campos, ja que a edicao foi concluida
    document.getElementById("alterar").innerHTML = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputDescricao").value = "";

    listar();
}