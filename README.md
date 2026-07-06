# 🎭 Playwright API Automation - Backend Testing with Docker (Agente Moda API)

Este repositório contém uma suíte de testes automatizados de API desenvolvida com **Playwright** focado em testes de integração de backend. O principal objetivo do projeto é garantir a integridade, segurança e resiliência dos endpoints de autenticação (JWT) e cadastro de produtos da aplicação **Agente Moda**.

O projeto simula cenários reais de testes de integração ponta a ponta, validando as respostas do servidor, fluxos de autenticação protegidos por middlewares e persistência de dados diretamente contra uma API rodando conectada a um banco de dados relacional em ambiente isolado via **Docker**.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Mecanismo de Teste:** [Playwright](https://playwright.dev/) (API Request Context)
* **Backend Framework:** Node.js & Express
* **ORM / Banco de Dados:** Sequelize ORM & PostgreSQL
* **Autenticação:** JWT (JSON Web Tokens) com estratégia Bearer Token
* **Ambiente de Execução da API:** Docker (Container PostgreSQL)
* **Validação Manual Primária:** Insomnia

---

## ⚙️ Arquitetura do Ambiente & Resolução de Desafios

Durante o desenvolvimento da API e da suíte de testes, foram implementadas soluções de infraestrutura, arquitetura de software e redes locais para garantir a comunicação fluida e segura entre os componentes:

* **Isolamento de Infraestrutura:** Banco de dados PostgreSQL configurado e executado totalmente isolado dentro de um container Docker (`postgres-moda`).
* **Segurança de Rotas (Middlewares):** Implementação de um middleware de interceptação de rotas (`auth.js`) encarregado de extrair o cabeçalho `Authorization`, validar a assinatura da chave secreta (`agentemoda-secret`) do token JWT e garantir o controle de acesso à rota privada de produtos.
* **Leitura de Carga Útil (Payload JSON):** Configuração nativa do middleware `express.json()` no fluxo de entrada da aplicação, permitindo que o Express decodifique perfeitamente os corpos das requisições HTTP (`req.body`) enviados pelo Insomnia e Playwright.
* **Asserções Automatizadas Robustas:** Validação automática no Playwright simulando fluxos dinâmicos completos (o teste realiza o login em `/sessions`, captura o Token gerado em tempo real, injeta o cabeçalho Bearer no contexto e valida o status de sucesso `201 Created` na rota de `/products`).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você vai precisar do [Node.js](https://nodejs.org/), [Git](https://git-scm.com/) e do [Docker](https://www.docker.com/) instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/ISAIASUNIC/playwright-api-automation.git](https://github.com/ISAIASUNIC/playwright-api-automation.git)
cd playwright-api-automation