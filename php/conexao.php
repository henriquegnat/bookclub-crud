<?php
// Conexão compartilhada: ajuste a porta/senha conforme o XAMPP do grupo.
$servidor = '127.0.0.1';
$usuario = 'root';
$senha = '';
$nome_banco = 'bookclub';
$conexao = new mysqli($servidor, $usuario, $senha, $nome_banco);
if ($conexao->connect_error) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['status'=>'nok','mensagem'=>'Não foi possível conectar ao banco. Confira o XAMPP e php/conexao.php.','data'=>[]]);
    exit;
}
$conexao->set_charset('utf8mb4');
