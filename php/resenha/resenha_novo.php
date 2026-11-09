<?php // php/resenha_novo.php
// ============================================================================
// ARQUIVO: resenha_novo.php (Baseado nas Seções 8.5 e 9.5 da Apostila)
// OPERAÇÃO: C - Create (INSERT — inserir registro)
// Recebe os dados via $_POST (enviados pelo FormData do JavaScript), gera a
// data de publicação automaticamente e verifica o affected_rows.
// ============================================================================

require_once __DIR__ . '/../conexao.php';

// Padrão de retorno do projeto
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

// Validação com empty() (conforme Exercício Q4 da Aula 9 - Página 21/22 da Apostila)
if (empty($_POST['id_usuario']) || empty($_POST['id_livro']) || empty($_POST['nota']) || empty($_POST['texto_resenha'])) {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Todos os campos sao obrigatorios.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}

// Receber os dados do FormData (vêm via $_POST)
$id_usuario     = (int) $_POST['id_usuario'];     // (int) garante que é número inteiro
$id_livro       = (int) $_POST['id_livro'];       // (int) garante que é número inteiro
$nota           = (int) $_POST['nota'];           // (int) nota de 1 a 5
$texto_resenha  = $_POST['texto_resenha'];        // string com o texto da resenha
$contem_spoiler = (int) $_POST['contem_spoiler']; // 0 = sem spoiler, 1 = com spoiler

// Gera a data de publicação automática no formato do MySQL (AAAA-MM-DD)
date_default_timezone_set('America/Sao_Paulo');
$data_publicacao = date('Y-m-d');

// Preparar o INSERT com placeholders ? (evita SQL Injection - Seção 8.8)
$stmt = $conexao->prepare(
    'INSERT INTO resenha (id_usuario, id_livro, nota, texto_resenha, contem_spoiler, data_publicacao)
     VALUES (?, ?, ?, ?, ?, ?)'
);

// Bind: 'iiisis' = 3 integers (id_usuario, id_livro, nota) + 1 string (texto_resenha) + 1 integer (contem_spoiler) + 1 string (data_publicacao)
$stmt->bind_param('iiisis', $id_usuario, $id_livro, $nota, $texto_resenha, $contem_spoiler, $data_publicacao);
$stmt->execute();

// affected_rows > 0 significa que o INSERT funcionou
if ($stmt->affected_rows > 0) {
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Registro inserido com sucesso';
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Falha ao inserir o registro';
}

$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
