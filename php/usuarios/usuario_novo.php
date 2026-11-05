<?php
require_once __DIR__.'/comum.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responder('nok','Use POST.');
[$nome,$email,$meta] = validar();
$stmt=$conexao->prepare('INSERT INTO usuario (nome,email,meta_leitura,data_cadastro) VALUES (?,?,?,CURDATE())');
$stmt->bind_param('ssi',$nome,$email,$meta);
if (!$stmt->execute()) responder('nok',$stmt->errno===1062?'Este e-mail já está cadastrado.':'Não foi possível cadastrar.');
responder('ok','Leitor cadastrado com sucesso.',['id_usuario'=>$conexao->insert_id]);
