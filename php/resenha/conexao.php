<?php // php/conexao.php
// ============================================================================
// ARQUIVO: conexao.php (Baseado na Seção 8.3 da Apostila - Página 10)
// OBJETIVO: Criar a conexão com o banco 'bookclub' usando MySQLi.
// Este arquivo é incluído em todos os outros arquivos PHP com include_once().
// ============================================================================

// Variáveis de conexão
$servidor   = 'localhost:3306'; // host:porta do MySQL no XAMPP
$usuario    = 'root';           // usuário do MySQL
$senha      = '';               // senha (vazia no XAMPP padrão)
$nome_banco = 'bookclub';       // nome do banco de dados do grupo

// Criar a conexão
$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);

// Verificar se a conexão falhou
if ($conexao->connect_error) {
    header('Content-type: application/json; charset=utf-8');
    echo json_encode([
        'status'   => 'nok',
        'mensagem' => 'Falha na conexão: ' . $conexao->connect_error,
        'data'     => []
    ]);
    exit; // para a execução aqui
}

// Definir charset da conexão para aceitar acentos e caracteres especiais
$conexao->set_charset('utf8mb4');
