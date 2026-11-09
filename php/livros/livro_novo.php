<?php // php/livros/livro_novo.php
require_once __DIR__ . '/../conexao.php';
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$titulo = trim($_POST['titulo'] ?? '');
$autor = trim($_POST['autor'] ?? '');
$id_genero = (int) ($_POST['id_genero'] ?? 0);
$paginas = (int) ($_POST['paginas'] ?? 0);
$ano = (int) ($_POST['ano'] ?? 0);

// Verifica se já existe um livro com o mesmo título e autor
$check = $conexao->prepare('SELECT id_livro FROM livro WHERE titulo = ? AND autor = ?');
$check->bind_param('ss', $titulo, $autor);
$check->execute();
$existe = $check->get_result()->num_rows > 0;
$check->close();

if ($titulo === '' || $autor === '' || $id_genero <= 0 || $paginas <= 0 || $ano <= 0) {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Preencha todos os campos corretamente.';
} elseif ($existe) {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Este livro ja esta cadastrado.';
} else {
    $stmt = $conexao->prepare(
        'INSERT INTO livro(titulo, autor, id_genero, paginas, ano_publicacao) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->bind_param('ssiii', $titulo, $autor, $id_genero, $paginas, $ano); // s s i i i
    $stmt->execute();

    $ok = $stmt->affected_rows > 0;
    $retorno['status'] = $ok ? 'ok' : 'nok';
    $retorno['mensagem'] = $ok ? 'Livro cadastrado com sucesso' : 'Falha ao cadastrar o livro';
    $stmt->close();
}

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);