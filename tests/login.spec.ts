
import { test, expect } from '@playwright/test';

// 1. DADOS DE TESTE (Data-Driven): Array com múltiplos cenários de falha (Edge Cases)
const invalidScenarios = [
  { 
    cenario: 'nome ausente ou vazio', 
    payload: { price: 150.00, stock: 10 } 
  },
  { 
    cenario: 'preço com valor negativo', 
    payload: { name: 'Produto Hacker', price: -50.00, stock: 10 } 
  },
  { 
    cenario: 'estoque em formato de texto', 
    payload: { name: 'Produto Bugado', price: 100.00, stock: 'dez' } 
  }
];

test.describe('Suíte Sênior: Validação Orientada a Dados (Data-Driven)', () => {
  let tokenJWT = '';

  // 2. SETUP (beforeAll): Roda apenas 1 vez antes de todos os testes para ganhar performance
  test.beforeAll(async ({ request }) => {
    console.log('🔄 Gerando token único para a suíte de testes...');
    const loginResponse = await request.post('http://localhost:3001/sessions', {
      data: { email: 'isaias@teste.com', password: '123' }
    });
    const loginBody = await loginResponse.json();
    tokenJWT = loginBody.token;
  });

  // 3. GERAÇÃO DINÂMICA DE TESTES: O Playwright cria um teste para cada item do array
  invalidScenarios.forEach(({ cenario, payload }) => {
    
    test(`Deve bloquear o cadastro de produto com ${cenario}`, async ({ request }) => {
      
      const response = await request.post('http://localhost:3001/products', {
        headers: {
          'Authorization': `Bearer ${tokenJWT}`,
          'Content-Type': 'application/json'
        },
        data: payload
      });

      // Valida que a API rejeitou a requisição (status não pode ser 200/201)
      // Aceitamos 400 (Bad Request), 422 (Unprocessable Entity) ou 500 (Internal Error do Sequelize)
      expect([400, 422, 500]).toContain(response.status());

      console.log(`🛡️ Segurança validada! Requisição com ${cenario} bloqueada corretamente.`);
    });
    
  });
});
