<?php
require_once __DIR__ . '/../conexao.php';

$retorno = ['status' => 'ok', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $stmt = $conexao->prepare('SELECT * FROM clube WHERE id_clube = ?');
    $stmt->bind_param('i', $_GET['id']);
} else {
    $stmt = $conexao->prepare('SELECT * FROM clube ORDER BY id_clube DESC');
}

$stmt->execute();
$resultado = $stmt->get_result();

$tabela = [];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $tabela;
} else {
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Nao ha registros';
    $retorno['data']     = [];
}

$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
