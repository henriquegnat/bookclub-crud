<?php
require_once __DIR__.'/comum.php';
if (isset($_GET['id'])) {
    $id=filter_var($_GET['id'],FILTER_VALIDATE_INT);
    if (!$id || $id<1) responder('nok','ID inválido.');
    $stmt=$conexao->prepare('SELECT id_usuario,nome,email,meta_leitura,data_cadastro FROM usuario WHERE id_usuario=?');
    $stmt->bind_param('i',$id);
} else {
    $stmt=$conexao->prepare('SELECT id_usuario,nome,email,meta_leitura,data_cadastro FROM usuario ORDER BY id_usuario DESC');
}
$stmt->execute();
$dados=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
responder('ok','Consulta efetuada.',$dados);
