<?php // php/resenha_get.php
// ============================================================================
// ARQUIVO: resenha_get.php (Baseado nas Seções 8.4 e 9.4 da Apostila)
// OPERAÇÃO: R - Read (SELECT — buscar registros)
// Tem dois comportamentos num único arquivo:
//   1) Sem parâmetro: retorna todas as resenhas (usado na listagem de cards)
//   2) Com ?id=X na URL: retorna apenas uma resenha (usado na Fase 1 do alterar)
// ============================================================================

include_once('conexao.php');

// Padrão de retorno — definido no início de TODOS os arquivos PHP (Seção 7.7)
$retorno = [
    'status'   => '', // 'ok' quando deu certo, 'nok' quando falhou
    'mensagem' => '', // texto explicativo para exibir ao usuário
    'data'     => []  // array com os registros retornados do banco
];

// Dois comportamentos num único arquivo:
if (isset($_GET['id'])) {
    // Buscar por ID — usado na Fase 1 do alterar (quando clica em Editar)
    // Fazemos INNER JOIN com usuario e livro para trazer o nome do usuário e o título do livro
    $stmt = $conexao->prepare("
        SELECT r.*, u.nome AS nome_usuario, l.titulo AS titulo_livro
        FROM resenha r
        INNER JOIN usuario u ON r.id_usuario = u.id_usuario
        INNER JOIN livro l ON r.id_livro = l.id_livro
        WHERE r.id_resenha = ?
    ");
    $stmt->bind_param('i', $_GET['id']); // 'i' = integer
} else {
    // Buscar todos — usado na listagem de resenhas publicadas
    $stmt = $conexao->prepare("
        SELECT r.*, u.nome AS nome_usuario, l.titulo AS titulo_livro
        FROM resenha r
        INNER JOIN usuario u ON r.id_usuario = u.id_usuario
        INNER JOIN livro l ON r.id_livro = l.id_livro
        ORDER BY r.id_resenha DESC
    ");
}

// Executa a query preparada e recupera o resultado do banco
$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];

if ($resultado->num_rows > 0) {
    // while — usado no projeto para percorrer os registros retornados pelo MySQLi
    while ($linha = $resultado->fetch_assoc()) {
        $tabela[] = $linha; // adiciona cada linha ao array (equivale ao push do JS)
    }
    $retorno['status']   = 'ok';
    $retorno['mensagem'] = 'Consulta efetuada.';
    $retorno['data']     = $tabela;
} else {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao ha registros';
}

// Fecha o statement e a conexão antes de enviar o JSON (Boa prática da Aula 8 - Q5)
$stmt->close();
$conexao->close();

header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);
