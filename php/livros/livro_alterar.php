<?php // php/livro_alterar.php — UPDATE (id na URL, dados no POST)
include_once('conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

if (!isset($_GET['id'])) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'ID nao informado.';
} else {
    $id        = (int) $_GET['id'];
    $titulo    = trim($_POST['titulo'] ?? '');
    $autor     = trim($_POST['autor'] ?? '');
    $id_genero = (int) ($_POST['id_genero'] ?? 0);
    $paginas   = (int) ($_POST['paginas'] ?? 0);
    $ano       = (int) ($_POST['ano'] ?? 0);

    try {
        if ($titulo === '' || $autor === '' || $id_genero <= 0 || $paginas <= 0 || $ano <= 0) {
            $retorno['status']   = 'nok';
            $retorno['mensagem'] = 'Preencha todos os campos corretamente.';
        } else {
            // Duplicidade: ignora o próprio livro que está sendo editado
            $check = $conexao->prepare(
                'SELECT id_livro FROM livro WHERE titulo = ? AND autor = ? AND id_livro <> ?'
            );
            $check->bind_param('ssi', $titulo, $autor, $id);
            $check->execute();
            $existe = $check->get_result()->num_rows > 0;
            $check->close();

            if ($existe) {
                $retorno['status']   = 'nok';
                $retorno['mensagem'] = 'Este livro ja esta cadastrado.';
            } else {
                $stmt = $conexao->prepare(
                    'UPDATE livro
                     SET titulo = ?, autor = ?, id_genero = ?, paginas = ?, ano_publicacao = ?
                     WHERE id_livro = ?'
                );
                // s s i i i i
                $stmt->bind_param('ssiiii', $titulo, $autor, $id_genero, $paginas, $ano, $id);
                $stmt->execute();

                // Obs.: affected_rows é 0 quando nada mudou, por isso não usamos ele aqui.
                // Se o execute() não lançou erro, o UPDATE funcionou.
                $retorno['status']   = 'ok';
                $retorno['mensagem'] = 'Livro alterado com sucesso.';
                $stmt->close();
            }
        }
    } catch (Throwable $e) {
        $retorno['status']   = 'nok';
        $retorno['mensagem'] = 'Erro no servidor: ' . $e->getMessage();
    }
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
