// Pega a lista salva ou devolve uma array vazia, para que o código possa funcionar mesmo sem livros salvos
function pegarLivros() {
    return JSON.parse(localStorage.getItem("livros")) || [];
}

// Guarda a lista do "pegar livros" no localStorage
function guardarLivros(livros) {
    localStorage.setItem("livros", JSON.stringify(livros));
}

//  ----READ: mostra os livros na tabela----
// Se não houver livros, mostra uma linha com a mensagem "Nenhum livro cadastrado"
// Se houver livros, mostra uma linha para cada livro, com os botoes de Editar e Excluir
function listar() {
    const livros = pegarLivros();

    const linhas = livros.length === 0
        ? "<tr><td colspan='6' class='text-center text-muted'>Nenhum livro cadastrado</td></tr>"
        : livros.map(livro => `
            <tr>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>${livro.paginas}</td>
                <td>${livro.ano}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editar(${livro.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluir(${livro.id})">Excluir</button>
                </td>
            </tr>`).join("");

    document.getElementById("tabela").innerHTML = linhas;
}

// ----CREATE e UPDATE: botao Salvar----
// Se o campo id estiver vazio, cria um novo livro (CREATE)
// Se o campo id estiver preenchido, atualiza o livro existente (UPDATE)
// Valida os campos antes de salvar
function salvar() {
    const id = document.getElementById("id").value;
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value.trim();
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

    const livros = pegarLivros();

    // validacao: nao deixa salvar o mesmo livro duas vezes (mesmo titulo e mesmo autor)
    const jaExiste = livros.some(livro =>
        livro.titulo.toLowerCase() === titulo.toLowerCase() &&
        livro.autor.toLowerCase() === autor.toLowerCase() &&
        livro.id != id // na edicao, ignora o proprio livro
    );

    if (jaExiste) {
        alert("Este livro já está cadastrado!");
        return;
    }

    if (id === "") {
        // CREATE: nao tem id, entao e um livro novo
        livros.push({
            id: Date.now(),
            titulo,
            autor,
            genero,
            paginas: Number(paginas),
            ano: Number(ano)
        });
    } else {
        // UPDATE: tem id, entao muda os dados do livro que ja existe
        const livro = livros.find(l => l.id == id);
        Object.assign(livro, { titulo, autor, genero, paginas: Number(paginas), ano: Number(ano) });
    }

    guardarLivros(livros);
    limpar();
    listar();
}

// ----UPDATE (parte 1): coloca os dados do livro no formulario----
// Quando o usuário clica no botão editar, o id do livro é passado para essa função, que procura o livro na lista e coloca os dados nos campos do formulário
// Se o livro não for encontrado, a função retorna sem fazer nada
function editar(id) {
    const livro = pegarLivros().find(l => l.id == id);
    if (!livro) return;

    document.getElementById("id").value = livro.id;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("genero").value = livro.genero;
    document.getElementById("paginas").value = livro.paginas;
    document.getElementById("ano").value = livro.ano;

    window.scrollTo(0, 0); // sobe a pagina para mostrar o formulario
}

// ----DELETE: remove o livro----
// Quando o usuário clica no botão excluir, o id do livro é passado para essa função que remove o livro da lista e atualiza a tabela
function excluir(id) {
    if (!confirm("Deseja excluir este livro?")) {
        return;
    }

    const novaLista = pegarLivros().filter(livro => livro.id != id);

    guardarLivros(novaLista);
    limpar(); // se estava editando esse livro, limpa o formulario
    listar();
}

// ----limpa o formulario (tambem usado pelo botao Cancelar)----
function limpar() {
    ["id", "titulo", "autor", "genero", "paginas", "ano"].forEach(
        campo => document.getElementById(campo).value = ""
    );
}

// ao abrir a pagina, mostra os livros salvos
listar();