<?php
// ==============================================================================
// NOTA PARA O PROFESSOR:
// Na nossa equipe temos integrantes usando Windows com XAMPP (porta 3306 e
// senha vazia) e integrantes usando MacBook/macOS com MAMP (porta 8889 e
// senha 'root').
//
// Para evitar conflito e não precisar alterar a porta/senha manualmente toda vez
// que alguém baixa o projeto pelo Git, este arquivo testa as configurações
// da equipe em sequência e conecta automaticamente na que estiver ativa
// (XAMPP ou MAMP).
// ==============================================================================

$nome_banco = 'bookclub';

$tentativas = [
    // 1. XAMPP padrão (Windows): porta 3306, usuário root, senha vazia
    ['host' => '127.0.0.1', 'porta' => 3306, 'usuario' => 'root', 'senha' => ''],

    // 2. MAMP padrão (Mac/MacBook): porta 8889, usuário root, senha 'root'
    ['host' => '127.0.0.1', 'porta' => 8889, 'usuario' => 'root', 'senha' => 'root'],

    // 3. MAMP com senha vazia ou XAMPP na 8889
    ['host' => '127.0.0.1', 'porta' => 8889, 'usuario' => 'root', 'senha' => ''],

    // 4. MAMP na porta 3306 (com senha 'root')
    ['host' => '127.0.0.1', 'porta' => 3306, 'usuario' => 'root', 'senha' => 'root'],

    // 5. Porta secundária 3307 (MariaDB / XAMPP secundário)
    ['host' => '127.0.0.1', 'porta' => 3307, 'usuario' => 'root', 'senha' => ''],

    // 6. Tentativas via 'localhost' (caso o sistema operacional exija socket)
    ['host' => 'localhost', 'porta' => 3306, 'usuario' => 'root', 'senha' => ''],
    ['host' => 'localhost', 'porta' => 8889, 'usuario' => 'root', 'senha' => 'root']
];

$conexao = null;

// Desativa avisos e exceções temporariamente para testar as portas em silêncio
$modo_anterior = mysqli_report(MYSQLI_REPORT_OFF);

foreach ($tentativas as $cfg) {
    $teste = @new mysqli($cfg['host'], $cfg['usuario'], $cfg['senha'], $nome_banco, $cfg['porta']);
    if (!$teste->connect_error) {
        $conexao = $teste;
        break; // Conectou com sucesso! Sai do loop e segue a execução.
    }
}

// Restaura as configurações normais de relatório
mysqli_report($modo_anterior);

// Se nenhuma das configurações deu certo (servidor MySQL desligado)
if (!$conexao || $conexao->connect_error) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status'   => 'nok',
        'mensagem' => 'Não foi possível conectar ao banco de dados. Verifique se o MySQL no XAMPP ou MAMP está ligado e se o banco "bookclub" foi importado.',
        'data'     => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$conexao->set_charset('utf8mb4');
