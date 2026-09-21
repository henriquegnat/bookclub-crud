function pegarClubes() {
    const texto = localStorage.getItem("clubes");
    if (texto === null) {
        return [];
    }
    return JSON.parse(texto);
}

function guardarClubes(clubes) {
    localStorage.setItem("clubes", JSON.stringify(clubes));
}

function listar() {
    const clubes = pegarClubes();
    let linhas = "";
    if (clubes.length === 0) {
        linhas = "<tr><td colspan='4' class='text-center text-muted'>Nenhum clube cadastrado</td></tr>";
    }
    for (let i = 0; i < clubes.length; i++) {
        const clube = clubes[i];
        linhas += "<tr>" +
            "<td>" + clube.nome_clube + "</td>" +
            "<td>" + clube.tema + "</td>" +
            "<td>" + clube.status + "</td>" +
            "<td>" +
                "<button class='btn btn-sm btn-warning me-1' onclick='editar(" + clube.id + ")'>Editar</button>" +
                "<button class='btn btn-sm btn-danger' onclick='excluir(" + clube.id + ")'>Excluir</button>" +
            "</td>" +
            "</tr>";
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function salvar() {
    const id = document.getElementById("id").value;
    const nome_clube = document.getElementById("nome_clube").value.trim();
    const tema = document.getElementById("tema").value.trim();
    const status = document.getElementById("status").value;
    if (nome_clube === "" || tema === "") {
        alert("Preencha todos os campos!");
        return;
    }
    const clubes = pegarClubes();
    if (id === "") {
        clubes.push({
            id: Date.now(),
            nome_clube: nome_clube,
            tema: tema,
            status: status
        });
    } else {
        for (let i = 0; i < clubes.length; i++) {
            if (clubes[i].id == id) {
                clubes[i].nome_clube = nome_clube;
                clubes[i].tema = tema;
                clubes[i].status = status;
            }
        }
    }
    guardarClubes(clubes);
    limpar();
    listar();
}

function editar(id) {
    const clubes = pegarClubes();
    for (let i = 0; i < clubes.length; i++) {
        if (clubes[i].id == id) {
            document.getElementById("id").value = clubes[i].id;
            document.getElementById("nome_clube").value = clubes[i].nome_clube;
            document.getElementById("tema").value = clubes[i].tema;
            document.getElementById("status").value = clubes[i].status;
        }
    }
    window.scrollTo(0, 0);
}

function excluir(id) {
    if (!confirm("Deseja excluir este clube?")) {
        return;
    }
    const clubes = pegarClubes();
    const novaLista = [];
    for (let i = 0; i < clubes.length; i++) {
        if (clubes[i].id != id) {
            novaLista.push(clubes[i]);
        }
    }
    guardarClubes(novaLista);
    limpar();
    listar();
}

function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("nome_clube").value = "";
    document.getElementById("tema").value = "";
    document.getElementById("status").value = "Ativo";
}

listar();
