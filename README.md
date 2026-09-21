# 📚 BookClub — Plataforma de Gestão Literária e Comunidade de Leitura

> **Atividade Prática – Desenvolvimento de Aplicação Web**  
> Aplicação dos conceitos de front-end e operações fundamentais de CRUD utilizando o `LocalStorage` do navegador para persistência de dados.

---

## 📖 1. Visão Geral do Projeto

O **BookClub** é uma aplicação web funcional e interativa concebida para incentivar hábitos de leitura, catalogação de obras e engajamento em comunidades literárias. 

O projeto conecta diretamente o modelo conceitual desenvolvido na disciplina de **Banco de Dados** com a disciplina de **Desenvolvimento Web**, demonstrando na prática o ciclo de vida completo da informação no ambiente de front-end.

---

## 🎯 2. Objetivos Acadêmicos

* **Operações CRUD Completas**: Implementar de forma 100% funcional as 4 operações fundamentais para cada entidade:
  * **C (Create)**: Cadastro de novos registros via formulários validados;
  * **R (Read)**: Consulta e listagem dinâmica dos registros em tabela;
  * **U (Update)**: Edição e atualização de registros existentes;
  * **D (Delete)**: Exclusão controlada de registros.
* **Persistência Client-Side com LocalStorage**:
  * Utilização de listas de objetos em JavaScript;
  * Serialização com `JSON.stringify()` e armazenamento via `localStorage.setItem()`;
  * Recuperação via `localStorage.getItem()` e conversão com `JSON.parse()`.
* **Organização e Domínio**: Cada integrante do grupo é responsável por um CRUD completo, demonstrando domínio total do código para a banca.
* **Interface Amigável e Responsiva**: Construída com **Bootstrap 5**, proporcionando clareza visual, facilidade de uso e elegância sem complexidade desnecessária.

---

## 👥 3. Divisão dos Módulos (1 Integrante = 1 CRUD)

| Módulo / CRUD | Entidade | Responsável | Descrição |
| :--- | :---: | :---: | :--- |
| **1. Gêneros Literários** | `GENERO` | *Julia Moura Ruela* | CRUD e categorização de gêneros (Fantasia, Ficção, Romance, etc.). |
| **2. Leitores (Usuários)** | `USUARIO` | *Yasmin Luz de Araújo* | CRUD de perfis de leitores, e-mails e metas anuais de leitura. |
| **3. Catálogo de Livros** | `LIVRO` | *Leticia Hellen Prata de Souza* | CRUD de livros de acervo com título, autor, gênero, páginas e ano de publicação. |
| **4. Clubes de Leitura** | `CLUBE` | *Sabrina Bernardi Ferreira* | CRUD de clubes de leitura com nome, tema e status de atividade. |
| **5. Avaliações & Resenhas**| `RESENHA` | *Henrique Gnatkovski de Almeida* | CRUD de resenhas críticas, com usuário, livro, nota e spoiler|

---

## 📋 4. Detalhamento das Entidades e Atributos

### 📚 Módulo 1: Gêneros Literários (`GENERO`)
* **Campos**: `id`, `nome`, `descricao`
* **Funcionalidade**: Responsável pela classificação temática das obras e direcionamento dos interesses dos clubes.

### 👤 Módulo 2: Leitores / Usuários (`USUARIO`)
* **Campos**: `id`, `nome`, `email`, `meta_leitura`
* **Funcionalidade**: Manutenção dos dados dos leitores da comunidade e acompanhamento de metas literárias anuais.

### 📖 Módulo 3: Catálogo de Livros (`LIVRO`)
* **Campos**: `id`, `titulo`, `autor`, `genero`, `paginas`, `ano`
* **Funcionalidade**: Cadastro central de títulos literários que alimentam as discussões dos clubes e as avaliações.

### 👥 Módulo 4: Clubes de Leitura (`CLUBE`)
* **Campos**: `id`, `nome_clube`, `tema`, `status` (Ativo/Em Pausa/Encerrado)
* **Funcionalidade**: Criação e gestão de grupos temáticos com acompanhamento de status.

### ⭐ Módulo 5: Avaliações & Resenhas (`RESENHA`)
* **Campos**: `id`, `livro`, `leitor`, `nota` (1 a 5), `texto_resenha`, `recomenda` (Sim/Não)
* **Funcionalidade**: Registro das impressões de leitura, notas avaliativas e recomendações de livros para a comunidade.

---

## 💻 5. Tecnologias Utilizadas

* **HTML5**: Estruturação semântica das páginas e formulários;
* **CSS3**: Estilização complementar e refinamentos de layout;
* **Bootstrap 5**: Framework CSS para componentes (Navbar, Modais, Cards, Tabelas e Grid responsivo);
* **JavaScript (ES6+) Nativo**: Lógica de manipulação de DOM, eventos e persistência via LocalStorage, sem frameworks pesados.

---

## 🚀 6. Como Executar a Aplicação

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` diretamente em qualquer navegador web moderno (Google Chrome, Firefox, Microsoft Edge).
4. **Dica de Teste**: Para verificar o funcionamento do `LocalStorage` do zero, teste em uma janela anônima ou limpe os dados do navegador através do DevTools (`F12` > *Application* > *Local Storage*).
