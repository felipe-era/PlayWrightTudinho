const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('GET - Buscar lista de produtos', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  // Verifica o status da resposta
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const data = await response.json();
  //console.log(data);

  expect(data).toHaveProperty('products');
  expect(Array.isArray(data.products)).toBeTruthy();
  expect(data.products.length).toBeGreaterThan(0);
});

test('GET - Salvando a lista de produtos da API em JSON', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const data = await response.json();

  // Salvar dados no arquivo JSON
  fs.writeFileSync('fixtures/apiRetorno/lista_produtos.json', JSON.stringify(data, null, 2));

  console.log('Dados salvos em fixtures/lista_produtos.json');
});

test('GET - Buscar detalhes de usuário por email via GET e salvar resposta', async ({ request }) => {
  const email = 'abcdxxea@gmail.com';
  const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
    params: { email },
  });

  expect(response.status()).toBe(200);

  const userDetails = await response.json();

  fs.writeFileSync('fixtures/apiRetorno/usuario_cadastrado.json', JSON.stringify(userDetails, null, 2));
  console.log(userDetails);
});

test('POST - Buscar produtos via POST e salvar resposta', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct', {
    form: {
      search_product: 'top', // Parâmetro de busca
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const produtos = await response.json();
  const fs = require('fs');
  fs.writeFileSync('fixtures/apiRetorno/busca_produtos.json', JSON.stringify(produtos, null, 2));
});

test('POST - Criar conta de usuário via POST e salvar resposta', async ({ request }) => {
  const userData = {
    name: 'Felipe Eduardoabc',
    email: 'abcdxxea@gmail.com',
    password: 'senha1231',
    title: 'Mr',
    birth_date: '10',
    birth_month: '05',
    birth_year: '1990',
    firstname: 'João',
    lastname: 'Silva',
    company: 'Empresa XYZ',
    address1: 'Rua 123',
    address2: 'Bairro Exemplo',
    country: 'Brazil',
    zipcode: '12345',
    state: 'Distrito Federal',
    city: 'Brasília',
    mobile_number: '11999999999',
  };

  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: userData,
  });

  expect(response.status()).toBe(200);

  const resultado = await response.text();
  fs.writeFileSync('fixtures/apiRetorno/cria_usuario.json', JSON.stringify({ message: resultado }, null, 2));
  console.log(resultado);
});

test('PUT - Atualizar conta corretamente via PUT', async ({ request }) => {
  const updatedUserData = {
    name: "Felipe Eduardo Atualizado",
    email: "abcdxxea@gmail.com",
    password: "senha1231",
    title: "Mr",
    birth_date: "10",
    birth_month: "05",
    birth_year: "1990",
    firstname: "Felipe",
    lastname: "Eduardo",
    company: "Empresa XYZ",
    address1: "Rua Atualizada 456",
    address2: "Bairro Exemplo",
    country: "Brazil",
    zipcode: "12345",
    state: "Distrito Federal",
    city: "Brasília",
    mobile_number: "61999999999"
  };

  const response = await request.put('https://automationexercise.com/api/updateAccount', {
    form: updatedUserData,
  });

  expect(response.status()).toBe(200);

  const resultado = await response.json();
  expect(resultado.message).toContain('User updated');

  fs.writeFileSync('fixtures/apiRetorno/valida_UpdateUserResponse.json', JSON.stringify(resultado, null, 2));

  console.log(resultado);
});

test('PUT - Testa método PUT em Brands List e verificar resposta', async ({ request }) => {
  const response = await request.put('https://automationexercise.com/api/brandsList');

  expect(response.status()).toBe(200);

  const resultado = await response.json();
  expect(resultado.message).toContain('This request method is not supported');
  expect(resultado.responseCode).toBe(405);

  fs.writeFileSync('fixtures/apiRetorno/valida_put.json', JSON.stringify(resultado, null, 2));
  // console.log(resultado);
});

test('DELETE - Excluir conta de usuário via DELETE e salvar resposta', async ({ request }) => {
  const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: {
      email: 'abcdxxea@gmail.com',
      password: 'senha1231'
    }
  });

  expect(response.status()).toBe(200);

  const resultado = await response.json();

  expect(resultado.message).toContain('Account deleted');

  // Salvar resposta no arquivo JSON
  fs.writeFileSync('fixtures/apiRetorno/valida_delete.json', JSON.stringify(resultado, null, 2));

  // Exibir resposta para conferência rápida
  console.log(resultado);
});