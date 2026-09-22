// espera a pagina carregar todo o html antes de rodar a funcao listar
document.addEventListener("DOMContentLoaded", function () {
    listar();
    carregarUsuario();
    carregarLivro();
});

// funcao chamada quando o usuario clica no botao "enviar"
function salvarResenha() {
    // pega os valores digitados ou selecionados nos campos da tela
    let usuario = document.getElementById("inputUsuario").value;
    let livro = document.getElementById("inputLivro").value;
    let resenha = document.getElementById("inputResenha").value;
    let nota = document.getElementById("inputNota").value;
    // no checkbox usamos .checked para saber se esta marcado (true) ou nao (false)
    let spoiler = document.getElementById("inputSpoiler").checked;

    // busca as resenhas salvas no navegador; se nao tiver nenhuma ainda, cria uma lista vazia []
    let lista = JSON.parse(localStorage.getItem("resenhas")) || [];

    // validacao simples: se usuario, livro ou resenha estiverem vazios, avisa e para a funcao
    if (!usuario || !livro || !resenha) {
        alert("Por favor, preencha todos os campos");
        return; // o return interrompe a funcao aqui para nao salvar nada incompleto
    }

    // adiciona a nova resenha no final da lista
    lista.push({ usuario, livro, resenha, nota, spoiler });

    // salva a lista atualizada de volta na memoria do navegador (convertida para texto com json)
    localStorage.setItem("resenhas", JSON.stringify(lista));

    // atualiza os cards na tela para a nova resenha ja aparecer
    listar();

    // limpa todos os campos do formulario para ficarem prontos para uma nova resenha
    document.getElementById("inputUsuario").value = "";
    document.getElementById("inputLivro").value = "";
    document.getElementById("inputResenha").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputSpoiler").checked = false;
}

// funcao que le o localstorage e monta os cards na tela
function listar() {
    // busca a lista de resenhas salvas
    let lista = JSON.parse(localStorage.getItem("resenhas")) || [];

    // limpa a div onde ficam os cards para nao duplicar o conteudo anterior
    document.getElementById("card-resenha").innerHTML = "";

    // variavel para controlar a posicao (indice) de cada resenha na lista (0, 1, 2...)
    let indice = 0;

    // passa de resenha em resenha montando o html de cada card
    for (let resenha of lista) {
        document.getElementById("card-resenha").innerHTML += `
        <div id="resenha-${indice}" class="card shadow-sm">
            <!-- cabecalho do card com o nome do livro e a nota -->
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
                <strong class="fs-5">${resenha.livro}</strong>
                <span class="badge bg-primary">Nota: ${resenha.nota}</span>
            </div>

            <!-- corpo do card com o autor, aviso de spoiler e o texto da resenha -->
            <div class="card-body"> 
                <p class="card-subtitle mb-2 text-muted small">Feito por: <strong>${resenha.usuario}</strong></p>
                <!-- se tiver spoiler fica vermelho, se nao fica cinza -->
                <span class="badge ${resenha.spoiler ? 'bg-danger' : 'bg-secondary'} mb-2">
                    ${resenha.spoiler ? "⚠️ ALERTA DE SPOILER!" : "Sem spoiler"}
                </span>
                <p id="spoiler-${indice}" class="card-text mt-2">${resenha.resenha}</p>
            </div>

            <!-- rodape com os botoes de acao (editar e excluir) passando o numero do indice -->
            <div class="card-footer bg-white d-flex justify-content-end gap-2">
                <button class="btn btn-sm btn-outline-warning" onclick="carregar(${indice})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir(${indice})">Excluir</button>
            </div>
        </div>
        `;

        // se essa resenha tiver spoiler marcado, adiciona a classe css que borra o texto
        if (resenha.spoiler) {
            document.getElementById(`spoiler-${indice}`).classList.add("spoiler");
        }

        // passa para o proximo indice
        indice++;
    }
}

// funcao para apagar uma resenha pelo indice dela
function excluir(indice) {
    // pega a lista atual do localstorage
    let lista = JSON.parse(localStorage.getItem("resenhas")) || [];

    // o splice remove 1 item exatamente na posicao do indice clicado
    lista.splice(indice, 1);

    // salva a lista sem o item de volta no localstorage
    localStorage.setItem("resenhas", JSON.stringify(lista));

    // redesenha os cards na tela para sumir com o que foi excluido
    listar();

    // mensagem de confirmacao para o usuario
    alert("Resenha excluída com sucesso!");

    // habilita o botao de enviar para criar novas resenhas
    document.getElementById("btnEnviar").disabled = false;

}

// funcao que carrega os dados da resenha de volta nos campos para o usuario poder editar
function carregar(indice) {
    let lista = JSON.parse(localStorage.getItem("resenhas")) || [];

    // joga as informacoes guardadas daquela resenha para dentro dos campos de texto
    document.getElementById("inputUsuario").value = lista[indice].usuario;
    document.getElementById("inputLivro").value = lista[indice].livro;
    document.getElementById("inputResenha").value = lista[indice].resenha;
    document.getElementById("inputNota").value = lista[indice].nota;
    document.getElementById("inputSpoiler").checked = lista[indice].spoiler;

    document.getElementById("btnEnviar").disabled = true; // desabilita o botao de enviar para nao criar uma nova resenha enquanto edita

    // cria dinamicamente o botao amarelo para confirmar a alteracao daquela posicao
    document.getElementById("alterar").innerHTML = `<button class="btn btn-warning w-100 mb-2" onclick="alterar(${indice})">Salvar Alteração</button>`;

    // cria dinamicamente o botao para cancelar a edicao
    document.getElementById("cancelar").innerHTML = `<button class="btn btn-secondary w-100 mb-2" onclick="cancelar()">Cancelar</button>`;
}

// funcao chamada quando o usuario clica em "salvar alteracao"
function alterar(indice) {
    let lista = JSON.parse(localStorage.getItem("resenhas")) || [];

    // substitui os dados antigos daquela posicao pelos novos valores que estao nos campos
    lista[indice].usuario = document.getElementById("inputUsuario").value;
    lista[indice].livro = document.getElementById("inputLivro").value;
    lista[indice].resenha = document.getElementById("inputResenha").value;
    lista[indice].nota = document.getElementById("inputNota").value;
    lista[indice].spoiler = document.getElementById("inputSpoiler").checked;

    // salva a lista modificada no localstorage
    localStorage.setItem("resenhas", JSON.stringify(lista));

    // limpa o botao de alterar da tela ja que a edicao foi concluida
    document.getElementById("alterar").innerHTML = "";

    //limoa o botao de cancelar da tela ja que a edicao foi concluida
    document.getElementById("cancelar").innerHTML = "";

    // limpa os campos do formulario para ficarem prontos para uma nova resenha
    document.getElementById("inputUsuario").value = "";
    document.getElementById("inputLivro").value = "";
    document.getElementById("inputResenha").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputSpoiler").checked = false;
    
    // habilita o botao de enviar para criar novas resenhas
    document.getElementById("btnEnviar").disabled = false;
    
    // recarrega a lista para mostrar a resenha ja atualizada
    listar();
}

// funcao que carrega os usuarios do localstorage e monta o select na tela
function carregarUsuario() {
    // busca a lista de usuarios salvos no localstorage; se nao tiver nenhum, cria uma lista vazia
    let lista = JSON.parse(localStorage.getItem("usuarios")) || [];

    // monta o html das opcoes do select com os nomes dos usuarios
    let options = "";

    // passa de usuario em usuario montando a tag <option> para cada um
    for (let usuario of lista) {
        // monta a tag <option> com o nome do usuario como valor e texto
        options += `<option value="${usuario.nome}">${usuario.nome}</option>`;
    }

    // adiciona as opcoes dentro do select na tela
    document.getElementById("inputUsuario").innerHTML += options;
}

function carregarLivro() {
    // busca a lista de livros salvos no localstorage; se nao tiver nenhum, cria uma lista vazia
    let lista = JSON.parse(localStorage.getItem("livros")) || [];
    
    // monta o html das opcoes do select com os titulos dos livros
    let options = "";

    for (let livro of lista) {
        options += `<option value="${livro.titulo}">${livro.titulo}</option>`;
    }

    document.getElementById("inputLivro").innerHTML += options;
}

function cancelar() {
    // limpa os campos do formulario
    document.getElementById("inputUsuario").value = "";
    document.getElementById("inputLivro").value = "";
    document.getElementById("inputResenha").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputSpoiler").checked = false;

    // limpa os botoes de alterar e cancelar da tela
    document.getElementById("alterar").innerHTML = "";
    document.getElementById("cancelar").innerHTML = "";

    // habilita novamente o botao de enviar para criar novas resenhas
    document.getElementById("btnEnviar").disabled = false; 

    // recarrega a lista de resenhas para mostrar a tela original
    listar();
}
