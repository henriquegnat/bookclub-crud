// js/livros.js — CRUD de livros conectado ao PHP/MySQL (substitui a versão com localStorage)

// Evita que um título com <script> seja executado dentro da tabela
function esc(texto) {
    const d = document.createElement("div");
    d.textContent = texto ?? "";
    return d.innerHTML;
}

// Monta o FormData com os dados do formulário (usado no CREATE e no UPDATE)
function montarFormData() {
    const fd = new FormData();
    fd.append("titulo", document.getElementById("titulo").value.trim());
    fd.append("autor", document.getElementById("autor").value.trim());
    fd.append("id_genero", document.getElementById("genero").value);
    fd.append("paginas", document.getElementById("paginas").value);
    fd.append("ano", document.getElementById("ano").value);
    return fd;
}

// ----carrega os gêneros no <select> do formulário----
async function carregarGeneros() {
    const retorno = await fetch("../php/livros/livro_generos.php");
    const resposta = await retorno.json();

    let opcoes = "<option value=''>Selecione...</option>";

    if (resposta.status == "ok") {
        for (const g of resposta.data) {
            opcoes += `<option value="${g.id_genero}">${esc(g.nome)}</option>`;
        }
    }

    document.getElementById("genero").innerHTML = opcoes;
}

//  ----READ: mostra os livros na tabela----
// Busca no PHP (livro_get.php). Se não houver livros, mostra a mensagem "Nenhum livro cadastrado"
async function listar() {
    const retorno = await fetch("../php/livros/livro_get.php");
    const resposta = await retorno.json();

    let linhas;

    if (resposta.status == "ok") {
        linhas = resposta.data.map(livro => `
            <tr>
                <td>${esc(livro.titulo)}</td>
                <td>${esc(livro.autor)}</td>
                <td>${esc(livro.genero)}</td>
                <td>${esc(livro.paginas)}</td>
                <td>${esc(livro.ano_publicacao)}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editar(${livro.id_livro})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluir(${livro.id_livro})">Excluir</button>
                </td>
            </tr>`).join("");
    } else {
        linhas = "<tr><td colspan='6' class='text-center text-muted'>Nenhum livro cadastrado</td></tr>";
    }

    document.getElementById("tabela").innerHTML = linhas;
}

// ----CREATE e UPDATE: botao Salvar----
// Se o campo id estiver vazio, cria um novo livro (livro_novo.php)
// Se o campo id estiver preenchido, atualiza o livro existente (livro_alterar.php)
async function salvar() {
    const id = document.getElementById("id").value;
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value;
    const paginas = document.getElementById("paginas").value;
    const ano = document.getElementById("ano").value;

    // validacao: todos os campos sao obrigatorios
    if (!titulo || !autor || !genero || !paginas || !ano) {
        alert("Preencha todos os campos!");
        return;
    }

    // validacao: paginas precisa ser maior que zero
    if (Number(paginas) <= 0) {
        alert("O numero de paginas deve ser maior que zero!");
        return;
    }

    // CREATE: sem id, POST simples. UPDATE: id na URL + dados no body
    const url = id === ""
        ? "../php/livros/livro_novo.php"
        : "../php/livros/livro_alterar.php?id=" + id;

    const retorno = await fetch(url, {
        method: "POST",
        body: montarFormData()
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("SUCESSO: " + resposta.mensagem);
        limpar();
        listar();
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}

// ----UPDATE (parte 1): coloca os dados do livro no formulario----
// Busca o livro pelo id (livro_get.php?id=X) e preenche os campos
async function editar(id) {
    const retorno = await fetch("../php/livros/livro_get.php?id=" + id);
    const resposta = await retorno.json();

    if (resposta.status != "ok") {
        alert("ERRO: " + resposta.mensagem);
        return;
    }

    const livro = resposta.data[0];

    document.getElementById("id").value = livro.id_livro;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("genero").value = livro.id_genero;
    document.getElementById("paginas").value = livro.paginas;
    document.getElementById("ano").value = livro.ano_publicacao;

    window.scrollTo(0, 0); // sobe a pagina para mostrar o formulario
}

// ----DELETE: remove o livro----
// Chama livro_excluir.php?id=X e atualiza a tabela se deu certo
async function excluir(id) {
    if (!confirm("Deseja excluir este livro?")) {
        return;
    }

    const retorno = await fetch("../php/livros/livro_excluir.php?id=" + id);
    const resposta = await retorno.json();

    alert(resposta.mensagem);

    if (resposta.status == "ok") {
        limpar(); // se estava editando esse livro, limpa o formulario
        listar();
    }
}

// ----limpa o formulario (tambem usado pelo botao Cancelar)----
function limpar() {
    ["id", "titulo", "autor", "genero", "paginas", "ano"].forEach(
        campo => document.getElementById(campo).value = ""
    );
}

// ao abrir a pagina, carrega os generos e mostra os livros salvos
carregarGeneros();
listar();
