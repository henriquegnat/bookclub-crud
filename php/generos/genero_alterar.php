<?php
include_once("conexao.php");
$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem de envio para o front
    'data'     => []
];

// trazendo as infos do front end
$nome = $_POST["nome"];
$descricao = $_POST["descricao"] ?? "";
$id   = (int) $_GET["id"]; // id vem pela URL: genero_alterar.php?id=3

$stmt = $conexao->prepare("
    UPDATE genero SET
    nome = ?,
    descricao = ?
    WHERE id_genero = ?");
$stmt->bind_param("ssi", $nome, $descricao, $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno = [
        "status"   => "ok",
        "mensagem" => "gênero alterado com sucesso",
        "data"     => []
    ];
} else {
    $retorno = [
        "status"   => "nok",
        "mensagem" => "Falha ao alterar gênero",
        "data"     => []
    ];
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);