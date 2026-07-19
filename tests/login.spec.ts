import { test, expect } from '@playwright/test';

test('Deve garantir a integridade do ciclo de vida do produto (POST, PUT, DELETE) e limpeza de dados', async ({ request }) => {
  console.log('🚀 Iniciando Teste de Ciclo de Vida E2E...');

  // 1. SETUP: Autenticação
  const loginResponse = await request.post('http://localhost:3001/sessions', {
    data: { email: 'isaias@teste.com', password: '123' }
  });
  const { token } = await loginResponse.json();
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  // 2. CREATE: Cadastra o produto
  const createResponse = await request.post('http://localhost:3001/products', {
    headers,
    data: { name: 'Produto Sênior Original', price: 100.00, stock: 10 }
  });
  expect(createResponse.status()).toBe(201);
  const product = await createResponse.json();
  const productId = product.id; 

  console.log(`🔹 Produto criado com ID: ${productId}. Iniciando atualizações...`);

  // 3. UPDATE (PUT): ID passado na URL, conforme o seu routes.js
  const updateResponse = await request.put(`http://localhost:3001/products/${productId}`, { 
    headers,
    data: { 
      name: 'Produto Sênior Atualizado', 
      price: 150.00, 
      stock: 5 
    }
  });
  expect([200, 204]).toContain(updateResponse.status());

  // 4. TEARDOWN (DELETE): ID passado na URL, conforme o seu routes.js
  console.log(`🧹 Iniciando Teardown: Removendo ID ${productId} do banco...`);
  const deleteResponse = await request.delete(`http://localhost:3001/products/${productId}`, {
    headers
  });
  expect([200, 204]).toContain(deleteResponse.status());

  console.log('✅ Ciclo de vida validado e banco de dados limpo com sucesso!');
});