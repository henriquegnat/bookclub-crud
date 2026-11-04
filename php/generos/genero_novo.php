<?php
include_once("conexao.php");
$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem de envio para o front
    'data'     => []
];

// trazendo as infos do front end
$nome = $_POST["nome"];

$stmt = $conexao->prepare("
    INSERT INTO genero (nome)
    VALUES (?)");
$stmt->bind_param("s", $nome);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno = [
        "status"   => "ok",
        "mensagem" => "gênero cadastrado com sucesso",
        "data"     => []
    ];
} else {
    $retorno = [
        "status"   => "nok",
        "mensagem" => "Falha ao cadastrar gênero",
        "data"     => []
    ];
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);