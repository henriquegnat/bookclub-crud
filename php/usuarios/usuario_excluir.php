<?php
require_once __DIR__.'/comum.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder('nok','Use POST.');
$id=filter_var($_POST['id_usuario'] ?? null,FILTER_VALIDATE_INT);
if (!$id || $id<1) responder('nok','ID inválido.');
$stmt=$conexao->prepare('DELETE FROM usuario WHERE id_usuario=?');
$stmt->bind_param('i',$id);
if (!$stmt->execute()) responder('nok',$stmt->errno===1451?'Não é possível excluir: este leitor possui registros vinculados.':'Não foi possível excluir.');
responder('ok',$stmt->affected_rows?'Leitor excluído.':'Leitor não encontrado.');
