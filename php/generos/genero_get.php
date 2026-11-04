<?php // php/genero_get.php
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

// Dois comportamentos num único arquivo:
if (isset($_GET['id'])) {
    // Buscar por ID — usado na Fase 1 do alterar
    $stmt = $conexao->prepare('SELECT * FROM genero WHERE id = ?');
    $stmt->bind_param('i', $_GET['id']); // 'i' = integer
} else {
    // Buscar todos — usado na listagem
    $stmt = $conexao->prepare('SELECT * FROM genero');
}

$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha; // adiciona cada linha ao array
    }
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
?>