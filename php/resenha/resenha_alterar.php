<?php // php/resenha_alterar.php
// ============================================================================
// ARQUIVO: resenha_alterar.php (Baseado nas Seções 8.6 e 9.6 da Apostila)
// OPERAÇÃO: U - Update (UPDATE — alterar registro)
// Conforme a Apostila (Página 12 e Q2 da Aula 9):
// O ID vem pela URL ($_GET['id']) para identificar qual registro alterar,
// e os dados novos vêm pelo body ($_POST).
// ============================================================================

include_once('conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

// ID vem na URL: resenha_alterar.php?id=1
if (isset($_GET['id'])) {
    // Recebe os novos dados enviados pelo FormData via $_POST
    $id_usuario     = (int) $_POST['id_usuario'];
    $id_livro       = (int) $_POST['id_livro'];
    $nota           = (int) $_POST['nota'];
    $texto_resenha  = $_POST['texto_resenha'];
    $contem_spoiler = (int) $_POST['contem_spoiler'];

    // Prepara o comando UPDATE com placeholders (?)
    $stmt = $conexao->prepare(
        'UPDATE resenha
         SET id_usuario = ?, id_livro = ?, nota = ?, texto_resenha = ?, contem_spoiler = ?
         WHERE id_resenha = ?'
    );

    // 'iiisii' = id_usuario(i), id_livro(i), nota(i), texto_resenha(s), contem_spoiler(i) e $_GET['id'](i)
    $stmt->bind_param('iiisii', $id_usuario, $id_livro, $nota, $texto_resenha, $contem_spoiler, $_GET['id']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno['status']   = 'ok';
        $retorno['mensagem'] = 'Registro alterado com sucesso.';
    } else {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Nao foi possivel alterar o registro (ou nenhum dado foi modificado).';
    }

    $stmt->close();
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
}

$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
