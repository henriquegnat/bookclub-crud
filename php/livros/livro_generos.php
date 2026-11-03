<?php // php/livro_generos.php — lista os gêneros para preencher o <select> do formulário
include_once('conexao.php');

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

try {
    $stmt = $conexao->prepare('SELECT id_genero, nome FROM genero ORDER BY nome');
    $stmt->execute();
    $resultado = $stmt->get_result();

    $tabela = [];
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha;
    }

    $retorno['status']   = count($tabela) > 0 ? 'ok' : 'nok';
    $retorno['mensagem'] = count($tabela) > 0 ? 'Consulta efetuada.' : 'Nao ha generos cadastrados';
    $retorno['data']     = $tabela;

    $stmt->close();
} catch (Throwable $e) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Erro no servidor: ' . $e->getMessage();
}

$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
