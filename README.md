# 📚 BookClub — Plataforma de Gestão Literária e Comunidade de Leitura

> **Atividade Prática – Desenvolvimento de Aplicação Web (Módulo III)**  
> Persistência em Banco de Dados: **FRONT > BACK > BANCO** utilizando **HTML, CSS, JavaScript (`fetch` + `FormData`), PHP (MySQLi com Prepared Statements) e MySQL**.

---

## 📖 1. Visão Geral do Projeto

O **BookClub** é uma aplicação web funcional e interativa concebida para incentivar hábitos de leitura, catalogação de obras e engajamento em comunidades literárias. 

O projeto integra diretamente o modelo lógico e físico desenvolvido na disciplina de **Banco de Dados** com a arquitetura em três camadas da disciplina de **Desenvolvimento Web**, armazenando todos os registros de forma persistente no **MySQL** (via XAMPP/phpMyAdmin).

---

## 🏗️ 2. Arquitetura: FRONT > BACK > BANCO

A aplicação segue a estrutura em três camadas apresentada no Módulo III (Aulas 7, 8 e 9), onde o front-end nunca acessa o banco de dados diretamente:

| Camada | Tecnologia | Responsabilidade |
| :--- | :--- | :--- |
| **FRONT** | HTML5, CSS3, Bootstrap 5 e JavaScript (`fetch` + `FormData`) | Exibir a interface, capturar os dados digitados, enviar a requisição ao PHP e atualizar a tela com o resultado. |
| **BACK** | PHP 8+ com extensão **MySQLi** | Receber a requisição (`$_POST` e `$_GET`), validar os dados, executar os comandos SQL com **Prepared Statements** (`prepare`, `bind_param`, `execute`) e devolver a resposta padronizada em JSON (`{ status, mensagem, data }`). |
| **BANCO** | MySQL / MariaDB (XAMPP / phpMyAdmin) | Armazenar os dados de forma persistente nas tabelas relacionais do banco `bookclub`. |

---

## 🎯 3. Objetivos Acadêmicos Atendidos

* **Operações CRUD Completas de Ponta a Ponta**:
  * **C (Create)**: Cadastro de novos registros via `fetch(..., { method: 'POST', body: FormData })` → `INSERT INTO`;
  * **R (Read)**: Consulta e listagem dinâmica dos registros via `fetch()` GET → `SELECT` (com `INNER JOIN` nas chaves estrangeiras);
  * **U (Update)**: Busca do registro por ID (`?id=X`) e atualização via `FormData` → `UPDATE ... WHERE id = ?`;
  * **D (Delete)**: Exclusão controlada com confirmação do usuário → `DELETE FROM ... WHERE id = ?`.
* **Segurança e Padronização**:
  * Uso de **Prepared Statements** (`prepare()` e `bind_param()`) em todas as operações que recebem dados do usuário, prevenindo **SQL Injection**;
  * Conexão centralizada em arquivo `conexao.php` incluído via `include_once()`;
  * Retorno padronizado em JSON com `json_encode(['status' => 'ok'|'nok', 'mensagem' => '...', 'data' => [...]])`.

---

## 👥 4. Divisão dos Módulos (1 Integrante = 1 CRUD)

| Módulo / CRUD | Tabela MySQL | Responsável | Descrição |
| :--- | :---: | :--- | :--- |
| **1. Gêneros Literários** | `genero` | *Julia Moura Ruela* | CRUD e categorização de gêneros literários (Fantasia, Ficção Científica, Romance, etc.). |
| **2. Leitores (Usuários)** | `usuario` | *Yasmin Luz de Araújo* | CRUD de perfis de leitores, e-mails, datas de cadastro e metas anuais de leitura. |
| **3. Catálogo de Livros** | `livro` | *Leticia Hellen Prata de Souza* | CRUD de livros do acervo com título, autor, gênero (`id_genero`), páginas e ano de publicação. |
| **4. Clubes de Leitura** | `clube` | *Sabrina Bernardi Ferreira* | CRUD de clubes de leitura com nome, tema, código de acesso, capacidade, status e criador. |
| **5. Avaliações & Resenhas**| `resenha` | *Henrique Gnatkovski de Almeida* | CRUD de resenhas críticas com leitor (`id_usuario`), livro (`id_livro`), nota (1 a 5), alerta de spoiler (`contem_spoiler`) e data de publicação automática (`data_publicacao`). |

---

## 📋 5. Detalhamento das Tabelas e Atributos dos CRUDs

### 📚 Módulo 1: Gêneros Literários (`genero`)
* **Colunas**: `id_genero` (PK), `nome`, `descricao`
* **Funcionalidade**: Classificação temática das obras literárias cadastradas no catálogo.

### 👤 Módulo 2: Leitores / Usuários (`usuario`)
* **Colunas**: `id_usuario` (PK), `nome`, `email`, `meta_leitura`, `data_cadastro`
* **Funcionalidade**: Gestão dos leitores da comunidade e acompanhamento de metas literárias anuais.

### 📖 Módulo 3: Catálogo de Livros (`livro`)
* **Colunas**: `id_livro` (PK), `titulo`, `autor`, `id_genero` (FK), `paginas`, `ano_publicacao`
* **Funcionalidade**: Cadastro central de títulos literários que alimentam os clubes e as resenhas.

### 👥 Módulo 4: Clubes de Leitura (`clube`)
* **Colunas**: `id_clube` (PK), `nome_clube`, `tema`, `codigo`, `capacidade_max`, `status` (`Ativo`, `Em Pausa`, `Encerrado`), `data_criacao`, `id_criador` (FK)
* **Funcionalidade**: Criação e administração de grupos temáticos de leitura.

### ⭐ Módulo 5: Avaliações & Resenhas (`resenha`)
* **Colunas**: `id_resenha` (PK), `id_usuario` (FK), `id_livro` (FK), `nota` (1 a 5), `texto_resenha`, `contem_spoiler` (`0` ou `1`), `data_publicacao` (gerada automaticamente no PHP com `date('Y-m-d')`)
* **Funcionalidade**: Publicação de resenhas com filtro visual de desfoque (`blur`) para textos marcados com spoiler.

---

## 📂 6. Estrutura de Pastas do Projeto

```text
BookClub/
├── index.html          # Página inicial com menu de navegação e atalhos
├── css/
│   └── style.css       # Estilos globais complementares ao Bootstrap 5
├── home/               # Páginas HTML de cada módulo do sistema
│   ├── clubes.html
│   ├── generos.html
│   ├── livros.html
│   ├── resenhas.html
│   └── usuarios.html
├── js/                 # Scripts Front-end (fetch + FormData + manipulação de DOM)
│   ├── clubes.js
│   ├── generos.js
│   ├── livros.js
│   ├── resenhas.js
│   └── usuarios.js
└── php/                # Scripts Back-end em PHP (MySQLi + Prepared Statements + JSON)
    ├── clube/
    ├── generos/
    ├── leitores/
    ├── livros/
    └── resenha/
        ├── conexao.php
        ├── resenha_get.php
        ├── resenha_novo.php
        ├── resenha_alterar.php
        ├── resenha_excluir.php
        ├── usuario_get.php
        └── livro_get.php
```

---

## 🚀 7. Como Executar a Aplicação no XAMPP

1. **Inicie os serviços no XAMPP Control Panel**:
   * Inicie os módulos **Apache** e **MySQL**.
2. **Importe o Banco de Dados**:
   * Acesse `http://localhost/phpmyadmin` no navegador;
   * Crie o banco de dados **`bookclub`** (ou importe diretamente o arquivo `bookclub.sql` com as tabelas e registros de exemplo).
3. **Coloque o projeto na pasta `htdocs`**:
   * Certifique-se de que a pasta do projeto esteja em `C:\xampp\htdocs\BookClub` (ou `D:\xampp\htdocs\BookClub`).
4. **Acesse pelo navegador**:
   * Abra **`http://localhost/BookClub/index.html`** em qualquer navegador (Chrome, Edge, Firefox ou janela anônima — como os dados estão no MySQL, eles permanecem salvos em qualquer navegador!).
