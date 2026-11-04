// ============================================================================
// ARQUIVO: js/resenhas.js (Baseado na Aula 9 da Apostila - Fetch + FormData)
// ============================================================================

// Espera a página carregar todo o HTML antes de buscar os dados no PHP
document.addEventListener("DOMContentLoaded", function () {
    listar();          // Busca e exibe todas as resenhas (resenha_get.php)
    carregarUsuario(); // Busca os usuários para preencher o <select> (usuario_get.php)
    carregarLivro();   // Busca os livros para preencher o <select> (livro_get.php)
});

// ============================================================================
// 1. INSERIR (CREATE) — Baseado na Seção 9.5 da Apostila (Página 18)
// Monta um FormData com todos os campos e envia via POST para resenha_novo.php
// ============================================================================
async function salvarResenha() {
    // Pega os valores digitados ou selecionados nos campos da tela
    let usuario = document.getElementById("inputUsuario").value;
    let livro   = document.getElementById("inputLivro").value;
    let resenha = document.getElementById("inputResenha").value;
    let nota    = document.getElementById("inputNota").value;
    // No checkbox usamos .checked: convertemos para 1 (marcado) ou 0 (desmarcado)
    let spoiler = document.getElementById("inputSpoiler").checked ? 1 : 0;

    // Validação simples no front-end
    if (!usuario || !livro || !resenha || !nota) {
        alert("Por favor, preencha todos os campos");
        return;
    }

    // Monta o FormData com os campos que o PHP vai ler em $_POST['...']
    const fd = new FormData();
    fd.append("id_usuario",     usuario);
    fd.append("id_livro",       livro);
    fd.append("nota",           nota);
    fd.append("texto_resenha",  resenha);
    fd.append("contem_spoiler", spoiler);

    // Envia a requisição POST com fetch() para o PHP
    const retorno = await fetch("../php/resenha_novo.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    // Verifica o status retornado pelo PHP ('ok' ou 'nok')
    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem + " (Tamanho: " + resenha.length + " caracteres)");

        // Atualiza a lista de cards na tela
        listar();

        // Limpa os campos do formulário
        document.getElementById("inputUsuario").value = "";
        document.getElementById("inputLivro").value = "";
        document.getElementById("inputResenha").value = "";
        document.getElementById("inputNota").value = "";
        document.getElementById("inputSpoiler").checked = false;
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}

// ============================================================================
// 2. LISTAR (READ) — Baseado na Seção 9.4 da Apostila (Página 17)
// Faz um fetch GET simples para resenha_get.php e monta os cards na tela
// ============================================================================
async function listar() {
    const retorno = await fetch("../php/resenha_get.php");
    const resposta = await retorno.json();

    const containerCards = document.getElementById("card-resenha");
    containerCards.innerHTML = "";

    if (resposta.status == "ok") {
        for (let resenha of resposta.data) {
            // Converte o campo contem_spoiler (que vem 0 ou 1 do MySQL) para booleano
            let temSpoiler = Number(resenha.contem_spoiler) === 1;

            // Formata a data do padrão do banco (AAAA-MM-DD) para o padrão brasileiro (DD/MM/AAAA)
            let dataFormatada = resenha.data_publicacao
                ? resenha.data_publicacao.split("-").reverse().join("/")
                : "";

            // Adiciona o card da resenha usando o id_resenha real do banco de dados
            containerCards.innerHTML += `
            <div id="resenha-${resenha.id_resenha}" class="card shadow-sm">
                <!-- Cabeçalho do card com o título do livro e a nota -->
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <strong class="fs-5">${resenha.titulo_livro}</strong>
                    <span class="badge bg-primary">Nota: ${resenha.nota}</span>
                </div>

                <!-- Corpo do card com o autor, data de publicação, aviso de spoiler e o texto -->
                <div class="card-body"> 
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <p class="card-subtitle text-muted small mb-0">
                            Feito por: <strong>${resenha.nome_usuario}</strong>
                        </p>
                        <span class="text-muted small">${dataFormatada} | #${resenha.id_resenha}</span>
                    </div>

                    <!-- Se tiver spoiler fica vermelho, se não fica cinza -->
                    <span class="badge ${temSpoiler ? 'bg-danger' : 'bg-secondary'} mb-2">
                        ${temSpoiler ? "ALERTA DE SPOILER!" : "Sem spoiler"}
                    </span>

                    <!-- Se tiver spoiler, já adiciona a classe CSS 'spoiler' que borra o texto -->
                    <p id="spoiler-${resenha.id_resenha}" class="card-text mt-2 ${temSpoiler ? 'spoiler' : ''}">${resenha.texto_resenha}</p>
                </div>

                <!-- Rodapé com os botões de ação (Editar e Excluir) passando o id_resenha do MySQL -->
                <div class="card-footer bg-white d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-outline-warning" onclick="carregar(${resenha.id_resenha})">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluir(${resenha.id_resenha})">Excluir</button>
                </div>
            </div>
            `;
        }
    } else {
        // Caso não haja nenhuma resenha cadastrada no banco
        containerCards.innerHTML = `<p class="text-muted text-center">Nenhuma resenha cadastrada no banco de dados.</p>`;
    }
}

// ============================================================================
// 3. EXCLUIR (DELETE) — Baseado na Seção 9.7 da Apostila (Página 19)
// Chama resenha_excluir.php passando o ID na URL (?id=X)
// ============================================================================
async function excluir(id) {
    const retorno = await fetch("../php/resenha_excluir.php?id=" + id);
    const resposta = await retorno.json();

    alert(resposta.mensagem);

    if (resposta.status == "ok") {
        // Redesenha os cards na tela para sumir com o registro excluído
        listar();
        document.getElementById("btnEnviar").disabled = false;
    }
}

// ============================================================================
// 4. ALTERAR - FASE 1 (Buscar por ID) — Baseado na Seção 9.6 da Apostila (Pág. 18/19)
// Busca o registro pelo ID na URL (resenha_get.php?id=X) e preenche o formulário
// ============================================================================
async function carregar(id) {
    const retorno = await fetch("../php/resenha_get.php?id=" + id);
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        const reg = resposta.data[0];

        // Preenche os campos do formulário com os dados vindos do banco
        document.getElementById("inputUsuario").value   = reg.id_usuario;
        document.getElementById("inputLivro").value     = reg.id_livro;
        document.getElementById("inputResenha").value   = reg.texto_resenha;
        document.getElementById("inputNota").value      = reg.nota;
        document.getElementById("inputSpoiler").checked = (reg.contem_spoiler == 1);

        // Desabilita o botão de enviar para não criar uma nova resenha enquanto edita
        document.getElementById("btnEnviar").disabled = true;

        // Cria dinamicamente o botão amarelo para confirmar a alteração passando o ID
        document.getElementById("alterar").innerHTML = `<button class="btn btn-warning w-100 mb-2" onclick="alterar(${id})">Salvar Alteração</button>`;

        // Cria dinamicamente o botão para cancelar a edição
        document.getElementById("cancelar").innerHTML = `<button class="btn btn-secondary w-100 mb-2" onclick="cancelar()">Cancelar</button>`;
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}

// ============================================================================
// 5. ALTERAR - FASE 2 (Enviar UPDATE) — Baseado na Seção 9.6 da Apostila (Pág. 19)
// O ID vai na URL (?id=X, lido via $_GET) e os dados vão no body (FormData, lidos via $_POST)
// ============================================================================
async function alterar(id) {
    const fd = new FormData();
    fd.append("id_usuario",     document.getElementById("inputUsuario").value);
    fd.append("id_livro",       document.getElementById("inputLivro").value);
    fd.append("texto_resenha",  document.getElementById("inputResenha").value);
    fd.append("nota",           document.getElementById("inputNota").value);
    fd.append("contem_spoiler", document.getElementById("inputSpoiler").checked ? 1 : 0);

    // ID na URL + dados no body (exatamente como na página 19 da apostila)
    const retorno = await fetch("../php/resenha_alterar.php?id=" + id, {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);

        // Limpa os botões de alterar e cancelar da tela
        document.getElementById("alterar").innerHTML = "";
        document.getElementById("cancelar").innerHTML = "";

        // Limpa os campos do formulário
        document.getElementById("inputUsuario").value = "";
        document.getElementById("inputLivro").value = "";
        document.getElementById("inputResenha").value = "";
        document.getElementById("inputNota").value = "";
        document.getElementById("inputSpoiler").checked = false;

        // Habilita novamente o botão de enviar
        document.getElementById("btnEnviar").disabled = false;

        // Recarrega a lista para mostrar a resenha atualizada
        listar();
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}

// ============================================================================
// FUNÇÕES AUXILIARES — Carregar Usuários e Livros nos <select>
// ============================================================================
async function carregarUsuario() {
    const retorno = await fetch("../php/usuario_get.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        listarUsuario(resposta.data);
    }
}

function listarUsuario(lista) {
    // Monta o HTML das opções do select com o id_usuario no value e o nome visível
    let options = `<option value="" disabled selected>Selecione um usuário</option>`;
    for (let usuario of lista) {
        options += `<option value="${usuario.id_usuario}">${usuario.nome}</option>`;
    }
    document.getElementById("inputUsuario").innerHTML = options;
}

async function carregarLivro() {
    const retorno = await fetch("../php/livro_get.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        listarLivro(resposta.data);
    }
}

function listarLivro(lista) {
    // Monta o HTML das opções do select com o id_livro no value e o título visível
    let options = `<option value="" disabled selected>Selecione um livro</option>`;
    for (let livro of lista) {
        options += `<option value="${livro.id_livro}">${livro.titulo}</option>`;
    }
    document.getElementById("inputLivro").innerHTML = options;
}

function cancelar() {
    // Limpa os campos do formulário
    document.getElementById("inputUsuario").value = "";
    document.getElementById("inputLivro").value = "";
    document.getElementById("inputResenha").value = "";
    document.getElementById("inputNota").value = "";
    document.getElementById("inputSpoiler").checked = false;

    // Limpa os botões de alterar e cancelar da tela
    document.getElementById("alterar").innerHTML = "";
    document.getElementById("cancelar").innerHTML = "";

    // Habilita novamente o botão de enviar para criar novas resenhas
    document.getElementById("btnEnviar").disabled = false;

    // Recarrega a lista de resenhas
    listar();
}
