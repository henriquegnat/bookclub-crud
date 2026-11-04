<?php // php/conexao.php
// Configuração para o MAMP (Mac): porta 8889, senha root, banco bookclub
$servidor   = '127.0.0.1';
$porta      = 8889;
$usuario    = 'root';
$senha      = 'root';
$nome_banco = 'bookclub';

// Faz o mysqli lançar exceções (permite usar try/catch nos outros arquivos)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conexao = new mysqli($servidor, $usuario, $senha, $nome_banco, $porta);
    $conexao->set_charset('utf8mb4');
} catch (Throwable $e) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode([
        'status'   => 'nok',
        'mensagem' => 'Falha na conexao: ' . $e->getMessage(),
        'data'     => []
    ]);
    exit;
}
