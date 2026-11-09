-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/11/2026 às 18:46
-- Versão do servidor: 10.4.32-Maria
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Criação e seleção do banco de dados: `bookclub`
--
CREATE DATABASE IF NOT EXISTS `bookclub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bookclub`;

-- --------------------------------------------------------

-- Estrutura para tabela `checkin_leitura`
--

CREATE TABLE IF NOT EXISTS `checkin_leitura` (
  `id_checkin` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_livro` int(10) UNSIGNED NOT NULL,
  `paginas_lidas` smallint(5) UNSIGNED NOT NULL,
  `data_checkin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `checkin_leitura`
--

INSERT INTO `checkin_leitura` (`id_checkin`, `id_usuario`, `id_livro`, `paginas_lidas`, `data_checkin`) VALUES
(1, 1, 2, 30, '2026-10-05'),
(2, 1, 2, 25, '2026-10-06'),
(3, 1, 2, 40, '2026-10-07'),
(4, 2, 1, 20, '2026-10-05'),
(5, 2, 1, 35, '2026-10-06'),
(6, 3, 10, 15, '2026-10-06'),
(7, 3, 10, 22, '2026-10-07'),
(8, 4, 4, 50, '2026-10-05'),
(9, 4, 4, 45, '2026-10-06'),
(10, 4, 4, 60, '2026-10-07'),
(11, 5, 6, 28, '2026-10-06'),
(12, 5, 6, 32, '2026-10-07'),
(13, 7, 3, 18, '2026-10-05'),
(14, 7, 3, 24, '2026-10-06'),
(15, 8, 3, 10, '2026-10-05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `clube`
--

CREATE TABLE IF NOT EXISTS `clube` (
  `id_clube` int(10) UNSIGNED NOT NULL,
  `nome_clube` varchar(100) NOT NULL,
  `tema` varchar(100) DEFAULT NULL,
  `codigo` char(6) NOT NULL COMMENT 'Codigo unico alfanumerico de ingresso (RF-05)',
  `capacidade_max` tinyint(3) UNSIGNED NOT NULL,
  `status` enum('Ativo','Em Pausa','Encerrado') NOT NULL DEFAULT 'Ativo',
  `data_criacao` date NOT NULL,
  `id_criador` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `clube`
--

INSERT INTO `clube` (`id_clube`, `nome_clube`, `tema`, `codigo`, `capacidade_max`, `status`, `data_criacao`, `id_criador`) VALUES
(1, 'Fantasia & Cafe', 'Fantasia epica', 'FAN3C1', 10, 'Ativo', '2026-09-05', 1),
(2, 'Turma 2A - Lit. Brasileira', 'Classicos brasileiros', 'LIT2A9', 40, 'Ativo', '2026-09-02', 6),
(3, 'Distopias Modernas', 'Futuros sombrios', 'DIS777', 8, 'Ativo', '2026-09-10', 5),
(4, 'Sci-Fi aos Domingos', 'Ficcao cientifica classica', 'SCI0F1', 5, 'Em Pausa', '2026-09-15', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clube_membro`
--

CREATE TABLE IF NOT EXISTS `clube_membro` (
  `id_clube` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `papel` enum('Criador','Membro') NOT NULL DEFAULT 'Membro',
  `data_entrada` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `clube_membro`
--

INSERT INTO `clube_membro` (`id_clube`, `id_usuario`, `papel`, `data_entrada`) VALUES
(1, 1, 'Criador', '2026-09-05'),
(1, 2, 'Membro', '2026-09-06'),
(1, 3, 'Membro', '2026-09-07'),
(2, 2, 'Membro', '2026-09-08'),
(2, 6, 'Criador', '2026-09-02'),
(2, 7, 'Membro', '2026-09-03'),
(2, 8, 'Membro', '2026-09-03'),
(3, 1, 'Membro', '2026-09-11'),
(3, 4, 'Membro', '2026-09-12'),
(3, 5, 'Criador', '2026-09-10'),
(4, 4, 'Criador', '2026-09-15'),
(4, 5, 'Membro', '2026-09-16');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estante_livro`
--

CREATE TABLE IF NOT EXISTS `estante_livro` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_livro` int(10) UNSIGNED NOT NULL,
  `estado_leitura` enum('Quero Ler','Lendo','Lido','Abandonado') NOT NULL,
  `data_alteracao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `estante_livro`
--

INSERT INTO `estante_livro` (`id_usuario`, `id_livro`, `estado_leitura`, `data_alteracao`) VALUES
(1, 1, 'Lido', '2026-09-20'),
(1, 2, 'Lendo', '2026-10-01'),
(2, 1, 'Lendo', '2026-10-02'),
(2, 3, 'Quero Ler', '2026-09-25'),
(3, 10, 'Lendo', '2026-10-03'),
(4, 4, 'Lendo', '2026-10-04'),
(4, 9, 'Quero Ler', '2026-09-30'),
(5, 2, 'Lido', '2026-09-28'),
(5, 6, 'Lendo', '2026-10-05'),
(7, 3, 'Lendo', '2026-10-01'),
(8, 3, 'Abandonado', '2026-10-06'),
(8, 8, 'Quero Ler', '2026-10-02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `genero`
--

CREATE TABLE IF NOT EXISTS `genero` (
  `id_genero` int(10) UNSIGNED NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `genero`
--

INSERT INTO `genero` (`id_genero`, `nome`, `descricao`) VALUES
(1, 'Fantasia', 'Mundos imaginarios, magia e criaturas fantasticas'),
(2, 'Ficcao Cientifica', 'Ciencia, tecnologia e futuros possiveis'),
(3, 'Romance', 'Historias centradas em relacoes afetivas'),
(4, 'Distopia', 'Sociedades futuras opressivas e controladas'),
(5, 'Suspense', 'Misterio, investigacao e tensao'),
(6, 'Classico Brasileiro', 'Obras consagradas da literatura brasileira');

-- --------------------------------------------------------

--
-- Estrutura para tabela `livro`
--

CREATE TABLE IF NOT EXISTS `livro` (
  `id_livro` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `id_genero` int(10) UNSIGNED NOT NULL,
  `paginas` smallint(5) UNSIGNED NOT NULL,
  `ano_publicacao` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `livro`
--

INSERT INTO `livro` (`id_livro`, `titulo`, `autor`, `id_genero`, `paginas`, `ano_publicacao`) VALUES
(1, 'O Hobbit', 'J. R. R. Tolkien', 1, 310, 1937),
(2, '1984', 'George Orwell', 4, 328, 1949),
(3, 'Dom Casmurro', 'Machado de Assis', 6, 256, 1899),
(4, 'Duna', 'Frank Herbert', 2, 688, 1965),
(5, 'Orgulho e Preconceito', 'Jane Austen', 3, 424, 1813),
(6, 'Fahrenheit 451', 'Ray Bradbury', 4, 215, 1953),
(7, 'Assassinato no Expresso do Oriente', 'Agatha Christie', 5, 256, 1934),
(8, 'Memorias Postumas de Bras Cubas', 'Machado de Assis', 6, 368, 1881),
(9, 'Fundacao', 'Isaac Asimov', 2, 255, 1951),
(10, 'A Sociedade do Anel', 'J. R. R. Tolkien', 1, 576, 1954);

-- --------------------------------------------------------

--
-- Estrutura para tabela `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id_login` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(100) NOT NULL COMMENT 'Senha em texto (exigencia da atividade)',
  `data_criacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `login`
--

INSERT INTO `login` (`id_login`, `id_usuario`, `login`, `senha`, `data_criacao`) VALUES
(1, 1, 'henrique.almeida', 'senha123', '2026-08-10'),
(2, 2, 'julia.ruela', 'senha123', '2026-08-11'),
(3, 3, 'leticia.souza', 'senha123', '2026-08-11'),
(4, 4, 'sabrina.ferreira', 'senha123', '2026-08-12'),
(5, 5, 'yasmin.araujo', 'senha123', '2026-08-12'),
(6, 6, 'prof.carlos', 'senha123', '2026-08-20'),
(7, 7, 'ana.lima', 'senha123', '2026-09-01'),
(8, 8, 'pedro.souza', 'senha123', '2026-09-01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ofensiva`
--

CREATE TABLE IF NOT EXISTS `ofensiva` (
  `id_ofensiva` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `sequencia_atual` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `maior_sequencia` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `escudos` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Maximo 3 (RF-03)',
  `data_ultimo_checkin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `ofensiva`
--

INSERT INTO `ofensiva` (`id_ofensiva`, `id_usuario`, `sequencia_atual`, `maior_sequencia`, `escudos`, `data_ultimo_checkin`) VALUES
(1, 1, 3, 7, 1, '2026-10-07'),
(2, 2, 2, 5, 0, '2026-10-06'),
(3, 3, 2, 3, 0, '2026-10-07'),
(4, 4, 3, 14, 2, '2026-10-07'),
(5, 5, 2, 21, 3, '2026-10-07'),
(6, 6, 0, 1, 0, NULL),
(7, 7, 2, 4, 0, '2026-10-06'),
(8, 8, 1, 1, 0, '2026-10-05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `permissao`
--

CREATE TABLE IF NOT EXISTS `permissao` (
  `id_permissao` int(10) UNSIGNED NOT NULL,
  `nome` varchar(30) NOT NULL,
  `descricao` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `permissao`
--

INSERT INTO `permissao` (`id_permissao`, `nome`, `descricao`) VALUES
(1, 'Leitor', 'Registra leituras, mantem ofensiva, avalia livros e participa de clubes'),
(2, 'Aluno', 'Responde quizzes e consulta resultados'),
(3, 'Professor', 'Cria clubes de turma e quizzes e acompanha resultados dos alunos'),
(4, 'Administrador', 'Gerencia o catalogo e modera resenhas e comentarios');

-- --------------------------------------------------------

--
-- Estrutura para tabela `questao`
--

CREATE TABLE IF NOT EXISTS `questao` (
  `id_questao` int(10) UNSIGNED NOT NULL,
  `id_quiz` int(10) UNSIGNED NOT NULL,
  `enunciado` varchar(300) NOT NULL,
  `alternativa_a` varchar(150) NOT NULL,
  `alternativa_b` varchar(150) NOT NULL,
  `alternativa_c` varchar(150) NOT NULL,
  `alternativa_d` varchar(150) NOT NULL,
  `gabarito` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `questao`
--

INSERT INTO `questao` (`id_questao`, `id_quiz`, `enunciado`, `alternativa_a`, `alternativa_b`, `alternativa_c`, `alternativa_d`, `gabarito`) VALUES
(1, 1, 'Quem e o narrador de Dom Casmurro?', 'Bentinho', 'Escobar', 'Jose Dias', 'Capitu', 'A'),
(2, 1, 'Qual e o apelido dado a Capitu pelos olhos?', 'Olhos de ressaca', 'Olhos de gato', 'Olhos de mel', 'Olhos de fogo', 'A'),
(3, 1, 'Qual personagem e o melhor amigo de Bentinho?', 'Escobar', 'Jose Dias', 'Padre Cabral', 'Tio Cosme', 'A'),
(4, 2, 'Quem narra Memorias Postumas de Bras Cubas?', 'Um defunto autor', 'Virgilia', 'Quincas Borba', 'Lobo Neves', 'A'),
(5, 2, 'Qual e o nome do amor de juventude de Bras Cubas?', 'Virgilia', 'Capitu', 'Marcela', 'Eugenia', 'A'),
(6, 2, 'Qual a inovacao tecnica de Machado na obra?', 'Narrador defunto', 'Verso livre', 'Narrador omisciente', 'Narracao em 2a pessoa', 'A'),
(7, 3, 'Quem e o lider supremo em 1984?', 'Grande Irmao', 'Napoleao', 'O Comandante', 'Big Boss', 'A'),
(8, 3, 'Qual e o nome do protagonista?', 'Winston Smith', 'Julia', 'O\'Brien', 'Syme', 'A'),
(9, 3, 'Como se chama a lingua oficial criada pelo Partido?', 'Novilingua', 'Esperanto', 'Duplopensar', 'Latim novo', 'A');

-- --------------------------------------------------------

--
-- Estrutura para tabela `quiz`
--

CREATE TABLE IF NOT EXISTS `quiz` (
  `id_quiz` int(10) UNSIGNED NOT NULL,
  `id_professor` int(10) UNSIGNED NOT NULL,
  `id_livro` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(120) NOT NULL,
  `prazo` date NOT NULL,
  `pontuacao_max` smallint(5) UNSIGNED NOT NULL DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `quiz`
--

INSERT INTO `quiz` (`id_quiz`, `id_professor`, `id_livro`, `titulo`, `prazo`, `pontuacao_max`) VALUES
(1, 6, 3, 'Quiz - Dom Casmurro', '2026-10-20', 100),
(2, 6, 8, 'Quiz - Bras Cubas', '2026-10-27', 100),
(3, 6, 2, 'Quiz - 1984', '2026-11-03', 60);

-- --------------------------------------------------------

--
-- Estrutura para tabela `resenha`
--

CREATE TABLE IF NOT EXISTS `resenha` (
  `id_resenha` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_livro` int(10) UNSIGNED NOT NULL,
  `nota` tinyint(3) UNSIGNED NOT NULL,
  `texto_resenha` text NOT NULL,
  `contem_spoiler` tinyint(1) NOT NULL DEFAULT 0,
  `data_publicacao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `resenha`
--

INSERT INTO `resenha` (`id_resenha`, `id_usuario`, `id_livro`, `nota`, `texto_resenha`, `contem_spoiler`, `data_publicacao`) VALUES
(1, 1, 1, 5, 'Aventura classica, perfeita para comecar na fantasia.', 0, '2026-09-21'),
(2, 5, 2, 5, 'Leitura perturbadora e muito atual. O final me deixou sem palavras.', 1, '2026-09-29'),
(3, 2, 3, 4, 'Machado de Assis brilhante. A duvida sobre Capitu rende ate hoje.', 1, '2026-10-01'),
(4, 4, 4, 5, 'Worldbuilding impressionante, mas exige paciencia no comeco.', 0, '2026-10-03'),
(5, 7, 3, 3, 'Linguagem dificil no inicio, mas a historia prende.', 0, '2026-10-04'),
(6, 3, 5, 4, 'Romance com ironia afiada e personagens marcantes.', 0, '2026-10-05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tentativa_quiz`
--

CREATE TABLE IF NOT EXISTS `tentativa_quiz` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_quiz` int(10) UNSIGNED NOT NULL,
  `acertos` tinyint(3) UNSIGNED NOT NULL,
  `total_questoes` tinyint(3) UNSIGNED NOT NULL,
  `nota` decimal(3,1) NOT NULL COMMENT '(acertos / total) x 10 (RF-12)',
  `xp_ganho` smallint(5) UNSIGNED NOT NULL COMMENT '10 XP por acerto (RF-12)',
  `data_tentativa` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tentativa_quiz`
--

INSERT INTO `tentativa_quiz` (`id_usuario`, `id_quiz`, `acertos`, `total_questoes`, `nota`, `xp_ganho`, `data_tentativa`) VALUES
(2, 1, 3, 3, 10.0, 30, '2026-10-09'),
(7, 1, 3, 3, 10.0, 30, '2026-10-08'),
(7, 2, 2, 3, 6.7, 20, '2026-10-12'),
(7, 3, 3, 3, 10.0, 30, '2026-10-14'),
(8, 1, 2, 3, 6.7, 20, '2026-10-08'),
(8, 2, 1, 3, 3.3, 10, '2026-10-12'),
(8, 3, 2, 3, 6.7, 20, '2026-10-14');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `meta_leitura` smallint(5) UNSIGNED NOT NULL DEFAULT 12 COMMENT 'Meta anual de livros',
  `data_cadastro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `meta_leitura`, `data_cadastro`) VALUES
(1, 'Henrique Gnatkovski de Almeida', 'henrique.gnatkovski@bookclub.com', 24, '2026-08-10'),
(2, 'Julia Moura Ruela', 'julia.ruela@bookclub.com', 18, '2026-08-11'),
(3, 'Leticia Hellen Prata de Souza', 'leticia.souza@bookclub.com', 12, '2026-08-11'),
(4, 'Sabrina Bernardi Ferreira', 'sabrina.ferreira@bookclub.com', 20, '2026-08-12'),
(5, 'Yasmin Luz de Araujo', 'yasmin.araujo@bookclub.com', 30, '2026-08-12'),
(6, 'Carlos Eduardo Menezes', 'carlos.menezes@escola.edu.br', 15, '2026-08-20'),
(7, 'Ana Beatriz Lima', 'ana.lima@aluno.edu.br', 10, '2026-09-01'),
(8, 'Pedro Henrique Souza', 'pedro.souza@aluno.edu.br', 8, '2026-09-01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_permissao`
--

CREATE TABLE IF NOT EXISTS `usuario_permissao` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_permissao` int(10) UNSIGNED NOT NULL,
  `data_concessao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario_permissao`
--

INSERT INTO `usuario_permissao` (`id_usuario`, `id_permissao`, `data_concessao`) VALUES
(1, 1, '2026-08-10'),
(1, 4, '2026-08-10'),
(2, 1, '2026-08-11'),
(3, 1, '2026-08-11'),
(4, 1, '2026-08-12'),
(5, 1, '2026-08-12'),
(6, 1, '2026-08-20'),
(6, 3, '2026-08-20'),
(7, 1, '2026-09-01'),
(7, 2, '2026-09-01'),
(8, 1, '2026-09-01'),
(8, 2, '2026-09-01');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `checkin_leitura`
--
ALTER TABLE `checkin_leitura`
  ADD PRIMARY KEY (`id_checkin`),
  ADD KEY `fk_ck_usuario` (`id_usuario`),
  ADD KEY `fk_ck_livro` (`id_livro`);

--
-- Índices de tabela `clube`
--
ALTER TABLE `clube`
  ADD PRIMARY KEY (`id_clube`),
  ADD UNIQUE KEY `uk_clube_codigo` (`codigo`),
  ADD KEY `fk_clube_criador` (`id_criador`);

--
-- Índices de tabela `clube_membro`
--
ALTER TABLE `clube_membro`
  ADD PRIMARY KEY (`id_clube`,`id_usuario`),
  ADD KEY `fk_cm_usuario` (`id_usuario`);

--
-- Índices de tabela `estante_livro`
--
ALTER TABLE `estante_livro`
  ADD PRIMARY KEY (`id_usuario`,`id_livro`),
  ADD KEY `fk_el_livro` (`id_livro`);

--
-- Índices de tabela `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id_genero`),
  ADD UNIQUE KEY `uk_genero_nome` (`nome`);

--
-- Índices de tabela `livro`
--
ALTER TABLE `livro`
  ADD PRIMARY KEY (`id_livro`),
  ADD KEY `fk_livro_genero` (`id_genero`);

--
-- Índices de tabela `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD UNIQUE KEY `uk_login_login` (`login`),
  ADD UNIQUE KEY `uk_login_usuario` (`id_usuario`);

--
-- Índices de tabela `ofensiva`
--
ALTER TABLE `ofensiva`
  ADD PRIMARY KEY (`id_ofensiva`),
  ADD UNIQUE KEY `uk_ofensiva_usuario` (`id_usuario`);

--
-- Índices de tabela `permissao`
--
ALTER TABLE `permissao`
  ADD PRIMARY KEY (`id_permissao`),
  ADD UNIQUE KEY `uk_permissao_nome` (`nome`);

--
-- Índices de tabela `questao`
--
ALTER TABLE `questao`
  ADD PRIMARY KEY (`id_questao`),
  ADD KEY `fk_qs_quiz` (`id_quiz`);

--
-- Índices de tabela `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id_quiz`),
  ADD KEY `fk_qz_professor` (`id_professor`),
  ADD KEY `fk_qz_livro` (`id_livro`);

--
-- Índices de tabela `resenha`
--
ALTER TABLE `resenha`
  ADD PRIMARY KEY (`id_resenha`),
  ADD KEY `fk_rs_usuario` (`id_usuario`),
  ADD KEY `fk_rs_livro` (`id_livro`);

--
-- Índices de tabela `tentativa_quiz`
--
ALTER TABLE `tentativa_quiz`
  ADD PRIMARY KEY (`id_usuario`,`id_quiz`),
  ADD KEY `fk_tq_quiz` (`id_quiz`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uk_usuario_email` (`email`);

--
-- Índices de tabela `usuario_permissao`
--
ALTER TABLE `usuario_permissao`
  ADD PRIMARY KEY (`id_usuario`,`id_permissao`),
  ADD KEY `fk_up_permissao` (`id_permissao`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `checkin_leitura`
--
ALTER TABLE `checkin_leitura`
  MODIFY `id_checkin` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `clube`
--
ALTER TABLE `clube`
  MODIFY `id_clube` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `genero`
--
ALTER TABLE `genero`
  MODIFY `id_genero` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `livro`
--
ALTER TABLE `livro`
  MODIFY `id_livro` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `ofensiva`
--
ALTER TABLE `ofensiva`
  MODIFY `id_ofensiva` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `permissao`
--
ALTER TABLE `permissao`
  MODIFY `id_permissao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `questao`
--
ALTER TABLE `questao`
  MODIFY `id_questao` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id_quiz` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `resenha`
--
ALTER TABLE `resenha`
  MODIFY `id_resenha` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `checkin_leitura`
--
ALTER TABLE `checkin_leitura`
  ADD CONSTRAINT `fk_ck_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`),
  ADD CONSTRAINT `fk_ck_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `clube`
--
ALTER TABLE `clube`
  ADD CONSTRAINT `fk_clube_criador` FOREIGN KEY (`id_criador`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `clube_membro`
--
ALTER TABLE `clube_membro`
  ADD CONSTRAINT `fk_cm_clube` FOREIGN KEY (`id_clube`) REFERENCES `clube` (`id_clube`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cm_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `estante_livro`
--
ALTER TABLE `estante_livro`
  ADD CONSTRAINT `fk_el_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_el_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `livro`
--
ALTER TABLE `livro`
  ADD CONSTRAINT `fk_livro_genero` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`);

--
-- Restrições para tabelas `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `ofensiva`
--
ALTER TABLE `ofensiva`
  ADD CONSTRAINT `fk_of_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `questao`
--
ALTER TABLE `questao`
  ADD CONSTRAINT `fk_qs_quiz` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE;

--
-- Restrições para tabelas `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `fk_qz_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`),
  ADD CONSTRAINT `fk_qz_professor` FOREIGN KEY (`id_professor`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `resenha`
--
ALTER TABLE `resenha`
  ADD CONSTRAINT `fk_rs_livro` FOREIGN KEY (`id_livro`) REFERENCES `livro` (`id_livro`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rs_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `tentativa_quiz`
--
ALTER TABLE `tentativa_quiz`
  ADD CONSTRAINT `fk_tq_quiz` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_tq_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Restrições para tabelas `usuario_permissao`
--
ALTER TABLE `usuario_permissao`
  ADD CONSTRAINT `fk_up_permissao` FOREIGN KEY (`id_permissao`) REFERENCES `permissao` (`id_permissao`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_up_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
