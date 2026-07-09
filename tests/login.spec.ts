import { test, expect } from '@playwright/test';

test('Deve realizar o login e cadastrar um produto com sucesso no Agente Moda', async ({ request }) => {
  
  console.log('🔄 Iniciando teste automatizado...');

  // 1. FAZ O LOGIN DINÂMICO PARA CAPTURAR O TOKEN REAL DO DOCKER
  const loginResponse = await request.post('http://localhost:3001/sessions', {
    data: {
      email: 'isaias@teste.com', // Garanta que este usuário existe no seu banco
      password: '123'            // A senha correspondente
    }
  });

  // Valida se o login deu bom (Status 200)
  expect(loginResponse.status()).toBe(200);
  
  const loginBody = await loginResponse.json();
  const tokenGerado = loginBody.token;
  
  console.log('🔑 Token JWT obtido com sucesso via automação!');

  // 2. CADASTRA O PRODUTO USANDO O TOKEN EXTRAÍDO ANTERIORMENTE
  const productResponse = await request.post('http://localhost:3001/products', {
    headers: {
      'Authorization': `Bearer ${tokenGerado}`,
      'Content-Type': 'application/json'
    },
    data: {
      name: 'Camiseta Playwright Liso',
      price: 79.90,
      stock: 50
    }
  });

  // Aceita tanto 200 quanto 201 dependendo do padrão do seu controller
  expect([200, 201]).toContain(productResponse.status());

  const productBody = await productResponse.json();
  
  // Validação final: o banco do Docker atribuiu um ID ao produto?
  expect(productBody).toHaveProperty('id');
  
  console.log(`✅ Sucesso! Produto "${productBody.name}" cadastrado com ID: ${productBody.id}`);
});

test('Não deve permitir cadastrar um produto se o token não for informado', async ({ request }) => {
  console.log('🔒 Testando cenário de segurança (Sem Token)...');

  // Tentando fazer o POST sem passar o objeto "headers" com o Authorization
  const productResponse = await request.post('http://localhost:3001/products', {
    data: {
      name: 'Produto Hacker',
      price: 999.90,
      stock: 1
    }
  });

  // O Playwright deve esperar um status 401 (Unauthorized) do seu middleware auth.js
  expect(productResponse.status()).toBe(401);

  const responseBody = await productResponse.json();
  
  // Opcional: Validar se a mensagem de erro retornada é a correta
  expect(responseBody).toHaveProperty('message');
  
  console.log('✅ Sucesso! A API barrou a requisição sem token corretamente.');
});

