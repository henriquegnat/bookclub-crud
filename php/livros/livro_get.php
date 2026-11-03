<?php // php/livros/livro_get.php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$sql = 'SELECT l.*, g.nome AS genero
        FROM livro l
        LEFT JOIN genero g ON g.id_genero = l.id_genero';

// Dois comportamentos num único arquivo:
if (isset($_GET['id'])) {
    // Buscar por ID — usado na edição
    $stmt = $conexao->prepare($sql . ' WHERE l.id_livro = ?');
    $stmt->bind_param('i', $_GET['id']);
} else {
    // Buscar todos — usado na listagem
    $stmt = $conexao->prepare($sql);
}

$stmt->execute();
$resultado = $stmt->get_result();
$tabela = $resultado->fetch_all(MYSQLI_ASSOC); // pega todas as linhas de uma vez

if (count($tabela) > 0) {
    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data'] = $tabela;
} else {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Nao ha registros';
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);