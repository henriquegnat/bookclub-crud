<?php
require_once __DIR__ . '/../conexao.php';
$retorno = [
    'status'   => '', // ok - nok
    'mensagem' => '', // mensagem de envio para o front
    'data'     => []
];

// trazendo as infos do front end
$id = (int) $_GET["id"]; // convertendo para inteiro: genero_excluir.php?id=3

$stmt = $conexao->prepare("DELETE FROM genero WHERE id_genero = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno = [
        "status"   => "ok",
        "mensagem" => "gênero excluído com sucesso",
        "data"     => []
    ];
} else {
    $retorno = [
        "status"   => "nok",
        "mensagem" => "Falha ao excluir gênero",
        "data"     => []
    ];
}

$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);