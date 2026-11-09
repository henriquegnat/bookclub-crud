let clubesCache = [];
let usuariosCache = [];

function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto ?? "";
    return div.innerHTML;
}


async function carregarUsuarios() {
    try {
        const retorno = await fetch("../php/clube/usuario_get.php");
        const resposta = await retorno.json();
        usuariosCache = resposta.status == "ok" ? resposta.data : [];
    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
        usuariosCache = [];
    }

    let opcoes = "<option value=''>Sem fundador</option>";
    for (const u of usuariosCache) {
        opcoes += "<option value='" + escapar(u.id_usuario) + "'>" + escapar(u.nome) + "</option>";
    }
    document.getElementById("inputUsuario").innerHTML = opcoes;
}

function nomeUsuario(id) {
    const u = usuariosCache.find(x => x.id_usuario == id);
    return u ? u.nome : id;
}


async function listar() {
    try {
        const retorno = await fetch("../php/clube/clube_get.php");
        const resposta = await retorno.json();
        clubesCache = resposta.status == "ok" ? resposta.data : [];
    } catch (erro) {
        console.error("Erro ao listar:", erro);
        clubesCache = [];
    }

    let linhas = "";
    if (clubesCache.length === 0) {
        linhas = "<tr><td colspan='4' class='text-center text-muted'>Nenhum clube cadastrado</td></tr>";
    }

    for (const clube of clubesCache) {
        linhas +=
            "<tr>" +
                "<td>" + escapar(clube.nome_clube) + "</td>" +
                "<td>" + escapar(clube.tema) + "</td>" +
                "<td>" + (clube.id_criador ? escapar(nomeUsuario(clube.id_criador)) : "<span class='text-muted'>—</span>") + "</td>" +
                "<td>" +
                    "<button type='button' class='btn btn-sm btn-warning me-1' onclick='editar(" + Number(clube.id_clube) + ")'>Editar</button>" +
                    "<button type='button' class='btn btn-sm btn-danger' onclick='excluir(" + Number(clube.id_clube) + ")'>Excluir</button>" +
                "</td>" +
            "</tr>";
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("nome_clube").value = "";
    document.getElementById("tema").value = "";
    document.getElementById("inputUsuario").value = "";
}


async function salvar() {
    const id = document.getElementById("id").value;
    const nome_clube = document.getElementById("nome_clube").value.trim();
    const tema = document.getElementById("tema").value.trim();
    const id_criador = document.getElementById("inputUsuario").value;

    if (nome_clube === "" || tema === "") {
        alert("Preencha o nome e o tema do clube!");
        return;
    }

    const fd = new FormData();
    fd.append("nome_clube", nome_clube);
    fd.append("tema", tema);
    fd.append("id_criador", id_criador); 

    
    let url = "../php/clube/cadastrar_clube.php";
    if (id !== "") {
        url = "../php/clube/alterar_clube.php?id=" + id;
    }

    try {
        const retorno = await fetch(url, {
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();

        if (resposta.status == "ok") {
            alert("SUCESSO: " + resposta.mensagem);
            limpar();
            listar();
        } else {
            alert("ERRO: " + resposta.mensagem);
        }
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Não foi possível salvar. Veja o Console.");
    }
}


function editar(id) {
    const clube = clubesCache.find(c => c.id_clube == id);
    if (!clube) {
        return;
    }
    document.getElementById("id").value = clube.id_clube;
    document.getElementById("nome_clube").value = clube.nome_clube;
    document.getElementById("tema").value = clube.tema;
    document.getElementById("inputUsuario").value = clube.id_criador ?? "";
    window.scrollTo(0, 0);
}


async function excluir(id) {
    if (!confirm("Deseja excluir este clube?")) {
        return;
    }

    try {
        const retorno = await fetch("../php/clube/excluir_clube.php?id=" + id);
        const resposta = await retorno.json();
        alert(resposta.mensagem);

        if (resposta.status == "ok") {
            limpar();
            listar();
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Não foi possível excluir. Veja o Console.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await carregarUsuarios(); 
    listar();
});
