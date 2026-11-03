// Declara a função "pegarClubes", responsável por buscar os clubes salvos no localStorage
function pegarClubes() {
    // Busca no localStorage o item guardado com a chave "clubes" e armazena o texto (string) na variável "texto"
    const texto = localStorage.getItem("clubes");
    // Verifica se não existe nenhum valor salvo (ou seja, texto é null)
    if (texto === null) {
        // Se não houver dados salvos, retorna um array vazio
        return [];
    }
    // Converte o texto (JSON em formato string) de volta para um array/objeto JavaScript e retorna
    return JSON.parse(texto);
}

// Declara a função "guardarClubes", responsável por salvar a lista de clubes no localStorage
function guardarClubes(clubes) {
    // Converte o array/objeto "clubes" para uma string JSON e salva no localStorage na chave "clubes"
    localStorage.setItem("clubes", JSON.stringify(clubes));
}

// Declara a função "listar", responsável por exibir os clubes na tabela HTML
function listar() {
    // Chama a função pegarClubes() para obter a lista atual de clubes
    const clubes = pegarClubes();
    // Cria uma variável de texto vazia que vai acumular o HTML das linhas da tabela
    let linhas = "";
    // Verifica se a lista de clubes está vazia
    if (clubes.length === 0) {
        // Se estiver vazia, define uma linha única informando que não há clubes cadastrados
        linhas = "<tr><td colspan='4' class='text-center text-muted'>Nenhum clube cadastrado</td></tr>";
    }
    // Percorre cada clube do array, um por um, usando o índice "i"
    for (let i = 0; i < clubes.length; i++) {
        // Guarda o clube atual (na posição i) na variável "clube"
        const clube = clubes[i];
        // Monta uma linha de tabela (<tr>) concatenando os dados do clube
        linhas += "<tr>" +
            // Célula com o nome do clube
            "<td>" + clube.nome_clube + "</td>" +
            // Célula com o tema do clube
            "<td>" + clube.tema + "</td>" +
            // Célula com o líder do clube
            "<td>" + clube.lider + "</td>" +
            // Célula com os botões de ação
            "<td>" +
                // Botão "Editar" que, ao ser clicado, chama a função editar() passando o id do clube
                "<button class='btn btn-sm btn-warning me-1' onclick='editar(" + clube.id + ")'>Editar</button>" +
                // Botão "Excluir" que, ao ser clicado, chama a função excluir() passando o id do clube
                "<button class='btn btn-sm btn-danger' onclick='excluir(" + clube.id + ")'>Excluir</button>" +
            "</td>" +
            // Fecha a tag da linha da tabela
            "</tr>";
    }
    // Insere o HTML montado (todas as linhas) dentro do elemento com id "tabela"
    document.getElementById("tabela").innerHTML = linhas;
}

// Declara a função "salvar", responsável por criar um novo clube ou atualizar um existente
function salvar() {
    // Pega o valor do campo escondido/input "id" (vazio se for um novo cadastro)
    const id = document.getElementById("id").value;
    // Pega o valor do campo "nome_clube" e remove espaços em branco no início/fim
    const nome_clube = document.getElementById("nome_clube").value.trim();
    // Pega o valor do campo "tema" e remove espaços em branco no início/fim
    const tema = document.getElementById("tema").value.trim();
    // Pega o valor do campo "status"
    const status = document.getElementById("inputUsuario").value;
    // Verifica se o nome do clube ou o tema estão vazios
    if (nome_clube === "" || tema === "") {
        // Exibe um alerta pedindo para preencher todos os campos
        alert("Preencha todos os campos!");
        // Interrompe a execução da função, não salvando nada
        return;
    }
    // Busca a lista atual de clubes salvos
    const clubes = pegarClubes();
    // Verifica se o campo "id" está vazio, indicando que é um cadastro novo
    if (id === "") {
        // Adiciona um novo objeto de clube ao array "clubes"
        clubes.push({
            // Gera um id único baseado no timestamp atual (data/hora em milissegundos)
            id: Date.now(),
            // Define o nome do clube com o valor digitado
            nome_clube: nome_clube,
            // Define o tema do clube com o valor digitado
            tema: tema,
            // Define o líder do clube com o valor selecionado
            lider: status
        });
    } else {
        // Caso contrário (id preenchido), significa que é uma edição de um clube existente
        // Percorre todos os clubes procurando aquele com o id correspondente
        for (let i = 0; i < clubes.length; i++) {
            // Compara o id do clube atual com o id vindo do formulário (comparação frouxa, ==)
            if (clubes[i].id == id) {
                // Atualiza o nome do clube encontrado
                clubes[i].nome_clube = nome_clube;
                // Atualiza o tema do clube encontrado
                clubes[i].tema = tema;
                // Atualiza o líder do clube encontrado
                clubes[i].lider = status;
            }
        }
    }
    // Salva a lista atualizada de clubes no localStorage
    guardarClubes(clubes);
    // Limpa os campos do formulário
    limpar();
    // Atualiza a exibição da tabela com os dados mais recentes
    listar();
}

// Declara a função "editar", responsável por carregar os dados de um clube no formulário para edição
function editar(id) {
    // Busca a lista atual de clubes
    const clubes = pegarClubes();
    // Percorre todos os clubes para encontrar o que corresponde ao id recebido
    for (let i = 0; i < clubes.length; i++) {
        // Compara o id do clube atual com o id recebido como parâmetro (comparação frouxa, ==)
        if (clubes[i].id == id) {
            // Preenche o campo escondido/input "id" com o id do clube encontrado
            document.getElementById("id").value = clubes[i].id;
            // Preenche o campo "nome_clube" com o nome do clube encontrado
            document.getElementById("nome_clube").value = clubes[i].nome_clube;
            // Preenche o campo "tema" com o tema do clube encontrado
            document.getElementById("tema").value = clubes[i].tema;
            // Preenche o campo "status" com o status do clube encontrado
            document.getElementById("inputUsuario").value = clubes[i].lider;
        }
    }
    // Rola a página até o topo (posição 0,0), facilitando a visualização do formulário
    window.scrollTo(0, 0);
}

// Declara a função "excluir", responsável por remover um clube da lista
function excluir(id) {
    // Exibe uma caixa de confirmação perguntando se o usuário realmente deseja excluir
    if (!confirm("Deseja excluir este clube?")) {
        // Se o usuário cancelar (não confirmar), interrompe a função sem excluir nada
        return;
    }
    // Busca a lista atual de clubes
    const clubes = pegarClubes();
    // Cria um novo array vazio que vai conter os clubes que NÃO serão excluídos
    const novaLista = [];
    // Percorre todos os clubes da lista original
    for (let i = 0; i < clubes.length; i++) {
        // Verifica se o id do clube atual é diferente do id que deve ser excluído (comparação frouxa, !=)
        if (clubes[i].id != id) {
            // Se for diferente, adiciona o clube na nova lista (ou seja, mantém ele)
            novaLista.push(clubes[i]);
        }
    }
    // Salva a nova lista (sem o clube excluído) no localStorage
    guardarClubes(novaLista);
    // Limpa os campos do formulário
    limpar();
    // Atualiza a exibição da tabela com os dados mais recentes
    listar();
}

// Declara a função "limpar", responsável por resetar os campos do formulário
function limpar() {
    // Limpa o campo escondido/input "id"
    document.getElementById("id").value = "";
    // Limpa o campo "nome_clube"
    document.getElementById("nome_clube").value = "";
    // Limpa o campo "tema"
    document.getElementById("tema").value = "";
    // Define o campo "status" de volta para o valor padrão "Ativo"
    document.getElementById("inputUsuario").value = "Ativo";
}

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

// Chama a função listar() assim que o script é carregado, para exibir os clubes já salvos ao abrir a página
listar();
carregarUsuario();