<?php // php/resenha_excluir.php
// ============================================================================
// ARQUIVO: resenha_excluir.php (Baseado nas Seções 8.7 e 9.7 da Apostila)
// OPERAÇÃO: D - Delete (DELETE — excluir registro)
// Conforme a Apostila (Página 13 e 19):
// O ID vem pela URL ($_GET['id']). Verificamos se o ID foi informado antes de executar.
// ============================================================================

require_once __DIR__ . '/../conexao.php';

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    $stmt = $conexao->prepare('DELETE FROM resenha WHERE id_resenha = ?');
    $stmt->bind_param('i', $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Registro excluido';
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Registro nao excluido';
    }

    $stmt->close();
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'E necessario informar um ID para exclusao';
}

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
