<?php
require_once __DIR__.'/comum.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder('nok','Use POST.');
$id=filter_var($_POST['id_usuario'] ?? null,FILTER_VALIDATE_INT);
if (!$id || $id<1) responder('nok','ID inválido.');
[$nome,$email,$meta]=validar();
$stmt=$conexao->prepare('UPDATE usuario SET nome=?,email=?,meta_leitura=? WHERE id_usuario=?');
$stmt->bind_param('ssii',$nome,$email,$meta,$id);
if (!$stmt->execute()) responder('nok',$stmt->errno===1062?'Este e-mail já está cadastrado.':'Não foi possível alterar.');
responder('ok','Dados atualizados.');
