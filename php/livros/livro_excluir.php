<?php // php/livro_excluir.php — DELETE
include_once('conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (isset($_GET['id'])) {
    try {
        $stmt = $conexao->prepare('DELETE FROM livro WHERE id_livro = ?');
        $stmt->bind_param('i', $_GET['id']);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno['status']   = 'ok';
            $retorno['mensagem'] = 'Livro excluido';
        } else {
            $retorno['status']   = 'nok';
            $retorno['mensagem'] = 'Livro nao excluido';
        }
        $stmt->close();
    } catch (mysqli_sql_exception $e) {
        $retorno['status'] = 'nok';
        // 1451 = existe outra tabela apontando para esse livro (estante, resenha, etc.)
        if ($e->getCode() == 1451) {
            $retorno['mensagem'] = 'Nao e possivel excluir: o livro esta vinculado a outros registros (estante, resenha...).';
        } else {
            $retorno['mensagem'] = 'Erro no servidor: ' . $e->getMessage();
        }
    }
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'E necessario informar um ID para exclusao';
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
