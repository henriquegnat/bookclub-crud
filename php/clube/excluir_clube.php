<?php
require_once __DIR__ . '/../conexao.php';

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $stmt = $conexao->prepare('DELETE FROM clube WHERE id_clube = ?');
    $stmt->bind_param('i', $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Registro excluido';
    } else {
        $retorno['status']   = 'nok';
      
        if ($stmt->errno == 1451) {
            $retorno['mensagem'] = 'Nao e possivel excluir: o clube possui membros ou registros vinculados.';
        } else {
            $retorno['mensagem'] = 'Registro nao excluido';
        }
    }

    $stmt->close();
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'E necessario informar um ID para exclusao';
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);