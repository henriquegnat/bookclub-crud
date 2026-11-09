<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../conexao.php';
function responder($status, $mensagem, $data = []) {
    echo json_encode(['status'=>$status,'mensagem'=>$mensagem,'data'=>$data], JSON_UNESCAPED_UNICODE);
    exit;
}
function validar() {
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $meta = filter_var($_POST['meta_leitura'] ?? null, FILTER_VALIDATE_INT);
    if ($nome === '' || strlen($nome)>400 || !filter_var($email,FILTER_VALIDATE_EMAIL) || strlen($email)>120 || $meta === false || $meta < 0 || $meta > 65535) responder('nok','Informe nome, e-mail válido e meta anual inteira maior ou igual a zero.');
    return [$nome,$email,$meta];
}
