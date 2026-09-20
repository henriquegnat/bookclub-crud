// pega a lista salva (ou uma lista vazia se nao tiver nada)
function pegarLivros() {
    const texto = localStorage.getItem("livros");
    if (texto === null) {
        return [];
    }
    return JSON.parse(texto);
}

// guarda a lista no localStorage
function guardarLivros(livros) {
    localStorage.setItem("livros", JSON.stringify(livros));
}

// ---------- READ: mostra os livros na tabela ----------
function listar() {
    const livros = pegarLivros();
    let linhas = "";

    if (livros.length === 0) {
        linhas = "<tr><td colspan='6' class='text-center text-muted'>Nenhum livro cadastrado</td></tr>";
    }

    for (let i = 0; i < livros.length; i++) {
        const livro = livros[i];
        linhas += "<tr>" +
            "<td>" + livro.titulo + "</td>" +
            "<td>" + livro.autor + "</td>" +
            "<td>" + livro.genero + "</td>" +
            "<td>" + livro.paginas + "</td>" +
            "<td>" + livro.ano + "</td>" +
            "<td>" +
                "<button class='btn btn-sm btn-warning me-1' onclick='editar(" + livro.id + ")'>Editar</button>" +
                "<button class='btn btn-sm btn-danger' onclick='excluir(" + livro.id + ")'>Excluir</button>" +
            "</td>" +
            "</tr>";
    }

    document.getElementById("tabela").innerHTML = linhas;
}

// ---------- CREATE e UPDATE: botao Salvar ----------
function salvar() {
    const id = document.getElementById("id").value;
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const paginas = document.getElementById("paginas").value;
    const ano = document.getElementById("ano").value;

    // validacao: todos os campos sao obrigatorios
    if (titulo === "" || autor === "" || genero === "" || paginas === "" || ano === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // validacao: paginas precisa ser maior que zero
    if (Number(paginas) <= 0) {
        alert("O numero de paginas deve ser maior que zero!");
        return;
    }

    const livros = pegarLivros();

    // validacao: nao deixa salvar o mesmo livro duas vezes (mesmo titulo e mesmo autor)
    for (let i = 0; i < livros.length; i++) {
        const mesmoTitulo = livros[i].titulo.toLowerCase() === titulo.toLowerCase();
        const mesmoAutor = livros[i].autor.toLowerCase() === autor.toLowerCase();
        const outroLivro = livros[i].id != id; // na edicao, ignora o proprio livro

        if (mesmoTitulo && mesmoAutor && outroLivro) {
            alert("Este livro já está cadastrado!");
            return;
        }
    }

    if (id === "") {
        // CREATE: nao tem id, entao e um livro novo
        livros.push({
            id: Date.now(),
            titulo: titulo,
            autor: autor,
            genero: genero,
            paginas: Number(paginas),
            ano: Number(ano)
        });
    } else {
        // UPDATE: tem id, entao muda os dados do livro que ja existe
        for (let i = 0; i < livros.length; i++) {
            if (livros[i].id == id) {
                livros[i].titulo = titulo;
                livros[i].autor = autor;
                livros[i].genero = genero;
                livros[i].paginas = Number(paginas);
                livros[i].ano = Number(ano);
            }
        }
    }

    guardarLivros(livros);
    limpar();
    listar();
}

// ---------- UPDATE (parte 1): coloca os dados do livro no formulario ----------
function editar(id) {
    const livros = pegarLivros();

    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id == id) {
            document.getElementById("id").value = livros[i].id;
            document.getElementById("titulo").value = livros[i].titulo;
            document.getElementById("autor").value = livros[i].autor;
            document.getElementById("genero").value = livros[i].genero;
            document.getElementById("paginas").value = livros[i].paginas;
            document.getElementById("ano").value = livros[i].ano;
        }
    }

    window.scrollTo(0, 0); // sobe a pagina para mostrar o formulario
}

// ---------- DELETE: remove o livro ----------
function excluir(id) {
    if (!confirm("Deseja excluir este livro?")) {
        return;
    }

    const livros = pegarLivros();
    const novaLista = [];

    // copia todos os livros, menos o que foi excluido
    for (let i = 0; i < livros.length; i++) {
        if (livros[i].id != id) {
            novaLista.push(livros[i]);
        }
    }

    guardarLivros(novaLista);
    limpar(); // se estava editando esse livro, limpa o formulario
    listar();
}

// ---------- limpa o formulario (tambem usado pelo botao Cancelar) ----------
function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("paginas").value = "";
    document.getElementById("ano").value = "";
}

// ao abrir a pagina, mostra os livros salvos
listar();