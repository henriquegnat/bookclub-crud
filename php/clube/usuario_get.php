<?php
include_once('conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

$stmt = $conexao->prepare('SELECT * FROM usuario');
$stmt->execute();
$resultado = $stmt->get_result();

$linhas = [];
while ($linha = $resultado->fetch_assoc()) {
    $linhas[] = $linha;
}

if (count($linhas) > 0) {
   
    $colunas = array_keys($linhas[0]);

    $colId = $colunas[0];
    foreach (['id_usuario', 'id'] as $c) {
        if (in_array($c, $colunas, true)) { $colId = $c; break; }
    }

    $colNome = $colunas[1] ?? $colunas[0];
    foreach (['nome', 'nome_usuario', 'nome_completo', 'name', 'login', 'email'] as $c) {
        if (in_array($c, $colunas, true)) { $colNome = $c; break; }
    }

    $tabela = [];
    foreach ($linhas as $l) {
        $tabela[] = ['id_usuario' => $l[$colId], 'nome' => $l[$colNome]];
    }

    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $tabela;
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao ha registros';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);