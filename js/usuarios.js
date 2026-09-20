// CREATE - CADASTRO DE UM NOVO LEITOR
document.getElementById("btn_adicionar").addEventListener("click", () => {

    // Pega os valores digitados nos campos do HTML
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let meta_leitura = document.getElementById("meta_leitura").value;

    // VALIDAÇÃO - verifica se algum campo está vazio
    if(nome == "" || email == "" || meta_leitura == ""){
        alert("Preencha todos os campos.");
        return;
    }

    // Recupera a lista que está no localStorage
    // getItem pega os dados e JSON.parse transforma em objeto JavaScript
    let lista = JSON.parse(localStorage.getItem("usuarios"));

    // Se ainda não existir uma lista, cria uma lista vazia
    if(!lista){
        lista = [];
    }

    // CREATE - cria o usuário e adiciona na lista
    lista.push({
        id: lista.length + 1,
        nome: nome,
        email: email,
        meta_leitura: meta_leitura
    });

    // SALVAR NO LOCALSTORAGE
    // JSON.stringify transforma a lista em texto para ser armazenada
    localStorage.setItem("usuarios", JSON.stringify(lista));

    limparCampos();

    // Atualiza a tabela depois do cadastro
    listar();
});


// READ - LISTAGEM DOS LEITORES
function listar(){

    // Recupera os usuários salvos
    let lista = JSON.parse(localStorage.getItem("usuarios"));

    if(!lista){
        lista = [];
    }

    // Limpa a tabela antes de mostrar novamente
    document.getElementById("lista_usuarios").innerHTML = "";

    let indice = 0;

    // Percorre a lista de usuários
    for(let usuario of lista){

        // Mostra cada usuário na tabela
        document.getElementById("lista_usuarios").innerHTML += `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.meta_leitura}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="carregar(${indice})">Carregar</button>
                <button class="btn btn-danger btn-sm" onclick="excluir(${indice})">Excluir</button>
            </td>
        </tr>`;

        indice++;
    }
}


// DELETE - EXCLUSÃO DE UM LEITOR
function excluir(indice){

    // Recupera a lista do localStorage
    let lista = JSON.parse(localStorage.getItem("usuarios"));

    // Remove o usuário da posição recebida
    lista.splice(indice, 1);

    // Salva novamente a lista depois da exclusão
    localStorage.setItem("usuarios", JSON.stringify(lista));

    // Atualiza a tabela
    listar();
}


// CARREGAR DADOS PARA EDIÇÃO
function carregar(indice){

    let lista = JSON.parse(localStorage.getItem("usuarios"));

    // Coloca os dados do usuário novamente nos campos
    document.getElementById("nome").value = lista[indice].nome;
    document.getElementById("email").value = lista[indice].email;
    document.getElementById("meta_leitura").value = lista[indice].meta_leitura;

    // Cria o botão que confirma a alteração
    document.getElementById("alterar").innerHTML = `
        <button class="btn btn-warning" onclick="alterar(${indice})">Alterar</button>`;
}


// UPDATE - ALTERAÇÃO DE UM LEITOR
function alterar(indice){

    // Recupera a lista
    let lista = JSON.parse(localStorage.getItem("usuarios"));

    // Pega os novos valores dos campos
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let meta_leitura = document.getElementById("meta_leitura").value;

    // VALIDAÇÃO
    if(nome == "" || email == "" || meta_leitura == ""){
        alert("Preencha todos os campos.");
        return;
    }

    // Altera os dados do usuário escolhido
    lista[indice].nome = nome;
    lista[indice].email = email;
    lista[indice].meta_leitura = meta_leitura;

    // Salva a lista alterada no localStorage
    localStorage.setItem("usuarios", JSON.stringify(lista));

    // Remove o botão Alterar
    document.getElementById("alterar").innerHTML = "";

    limparCampos();

    // Atualiza a tabela
    listar();
}


// LIMPA OS CAMPOS DEPOIS DO CADASTRO OU ALTERAÇÃO
function limparCampos(){

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("meta_leitura").value = "";
}


// Quando a página é aberta, mostra os usuários que já estão salvos
listar();