# 🎭 Playwright API Automation - Backend Testing with Docker

Este repositório contém uma suíte de testes automatizados de API desenvolvida com **Playwright** e **TypeScript**. O principal objetivo do projeto é garantir a integridade, segurança e resiliência dos endpoints de autenticação de uma aplicação conteinerizada.

O projeto simula cenários reais de testes de integração, validando as respostas do servidor e contratos de dados diretamente contra uma API rodando em ambiente isolado via **Docker**.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Mecanismo de Teste:** [Playwright](https://playwright.dev/) (API Request Context)
* **Linguagem:** TypeScript
* **Ambiente de Desenvolvimento:** Node.js
* **Ambiente de Execução da API:** Docker & Docker Compose
* **Validação Manual Primária:** Insomnia

---

## ⚙️ Arquitetura do Ambiente & Resolução de Desafios

Durante o desenvolvimento da suíte de testes, foram implementadas soluções de infraestrutura e redes locais para garantir a comunicação fluida entre a máquina hospedeira e os containers:
* **Mapeamento de Portas:** Vinculação e exposição correta da porta da API (`3001`).
* **Protocolo de Rede:** Ajuste de resolução de DNS para forçar o tráfego via IPv4 (`127.0.0.1`), contornando restrições de loopback IPv6 (`::1`) nativas do Node.js moderno ao se comunicar com o Docker.
* **Asserções Robustas:** Validação rigorosa de respostas JSON (*case-sensitive*) e Status Codes HTTP.

---

## 🚀 Como Executar o Projeto

### Prerrequisitos
Antes de começar, você vai precisar do [Node.js](https://nodejs.org/), [Git](https://git-scm.com/) e do [Docker](https://www.docker.com/) instalados em sua máquina.

### 1. Clonar o Repositório
```bash
git clone [https://.github/workflows/playwright.yml](https://github.com/ISAIASUNIC/playwright-api-automation.git)
cd NOME_DO_REPOSITORIO