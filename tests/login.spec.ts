import { test, expect } from '@playwright/test';

test('Deve validar que a API barra o acesso sem token', async ({ request }) => {
  const response = await request.get('/login');

  // 1. Transforma a resposta bruta em um objeto JavaScript (JSON)
  const responseBody = await response.json();
  console.log('Objeto JSON recebido:', responseBody);

  // 2. Valida se o status da resposta é 401 (Não Autorizado) ou 400 (Bad Request)
  // Ajuste o número se o seu back-end usar outro código de erro
  expect(response.status()).toBe(401); 

  // 3. Valida se a propriedade 'message' contém o texto exato retornado pelo back-end
  expect(responseBody.message).toBe('Token não informado');
});







