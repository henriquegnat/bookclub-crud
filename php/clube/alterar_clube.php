<?php
require_once __DIR__ . '/../conexao.php';

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $nome_clube = trim($_POST['nome_clube'] ?? '');
    $tema       = trim($_POST['tema'] ?? '');

   
    $id_criador = (int) ($_POST['id_criador'] ?? 0);
    if ($id_criador < 1) {
        $id_criador = null;
    }

    if ($nome_clube === '' || $tema === '') {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Preencha o nome e o tema do clube!';
        $conexao->close();
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($retorno);
        exit;
    }

    $stmt = $conexao->prepare(
        'UPDATE clube SET nome_clube = ?, tema = ?, id_criador = ? WHERE id_clube = ?'
    );
    
    $stmt->bind_param('ssii', $nome_clube, $tema, $id_criador, $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Registro alterado com sucesso.';
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Nao foi possivel alterar o registro (ou nada foi modificado).';
    }

    $stmt->close();
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);