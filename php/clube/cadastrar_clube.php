<?php
require_once __DIR__ . '/../conexao.php';

$retorno = ['status' => '', 'mensagem' => '', 'data' => []];

function gerarCodigo() {
    $letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $codigo = '';
    for ($i = 0; $i < 6; $i++) {
        $codigo .= $letras[random_int(0, strlen($letras) - 1)];
    }
    return $codigo;
}

$nome_clube = trim($_POST['nome_clube'] ?? '');
$tema       = trim($_POST['tema'] ?? '');


$id_criador = (int) ($_POST['id_criador'] ?? 0);
if ($id_criador < 1) {
    $id_criador = null;
}

if ($nome_clube === '' || $tema === '') {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Preencha o nome e o tema do clube!';
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}


$capacidade_max = 10;
$status         = 'Ativo';


$codigo = '';
for ($tentativa = 0; $tentativa < 10; $tentativa++) {
    $candidato = gerarCodigo();
    $stmt = $conexao->prepare('SELECT id_clube FROM clube WHERE codigo = ?');
    $stmt->bind_param('s', $candidato);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $existe = $resultado->num_rows > 0;
    $stmt->close();
    if (!$existe) {
        $codigo = $candidato;
        break;
    }
}

if ($codigo === '') {
    $retorno['status']   = 'nok';
    $retorno['mensagem'] = 'Nao foi possivel gerar um codigo unico.';
    $conexao->close();
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}

$stmt = $conexao->prepare(
    'INSERT INTO clube(nome_clube, tema, codigo, capacidade_max, status, data_criacao, id_criador)
     VALUES (?, ?, ?, ?, ?, CURDATE(), ?)'
);

$stmt->bind_param('sssisi', $nome_clube, $tema, $codigo, $capacidade_max, $status, $id_criador);
$stmt->execute();

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