<?php
require_once __DIR__ . '/../conexao.php';

$retorno = [
    'status'   => '',
    'mensagem' => '',
    'data'     => []
];

$nome = trim($_POST["nome"] ?? "");
$descricao = trim($_POST["descricao"] ?? "");

if ($nome === "" || $descricao === "") {
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Informe o nome e a descrição do gênero';
} else {
    $stmt = $conexao->prepare("INSERT INTO genero (nome, descricao) VALUES (?, ?)");
    $stmt->bind_param("ss", $nome, $descricao);
    $stmt->execute();

    $retorno['status'] = 'ok';
    $retorno['mensagem'] = 'Gênero cadastrado com sucesso';

    $stmt->close();
}

$conexao->close();

header('Content-Type: application/json; charset=utf-8');
echo json_encode($retorno, JSON_UNESCAPED_UNICODE);