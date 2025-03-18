import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import config from '../../utils/config';

const email_user = faker.internet.email();

test('CT001 - Registra novo usuário', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

  await page.pause();

  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('FelipeNome');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email_user);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.locator('#days').selectOption('8');
  await page.locator('#months').selectOption('3');
  await page.locator('#years').selectOption('1993');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Felipe first name');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Edu lastname');
  await page.getByRole('textbox', { name: 'Last name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('oi');
  await page.getByRole('textbox', { name: 'Company', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua 3');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Brazil');
  await page.getByRole('textbox', { name: 'State *' }).press('Tab');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Brasilia');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).press('Tab');
  await page.locator('#zipcode').fill('7500000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
});

test('CT002 - Login com usuário válido', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email_user);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as FelipeNome')).toBeVisible();
});

test('CT003 - Login com usuário inválido', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('usuarioinv@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Your email or password is')).toBeVisible();
});

test('CT004 - Logout com usuário logado', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email_user);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Logged in as FelipeNome')).toBeVisible();
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page.getByText('Login to your account Login')).toBeVisible();
});

test('CT005 - Registrar usuário com email já cadastrado', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('FelipeNome');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email_user);
  await page.getByRole('button', { name: 'Signup' }).click();
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
});

test('CT006 - Formulario para entrar em contato', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Contact us' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(faker.person.firstName());
  await page.getByRole('textbox', { name: 'Email', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill(faker.internet.email());
  await page.getByRole('textbox', { name: 'Subject' }).click();
  await page.getByRole('textbox', { name: 'Subject' }).fill('Below contact form is for testing purpose.');
  await page.getByRole('textbox', { name: 'Your Message Here' }).click();
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill('Below contact form is for testing purpose.');
  await page.getByRole('button', { name: 'Submit' }).click();

  page.once('dialog', async dialog => {
    console.log(`Mensagem: ${dialog.message()}`);
    await dialog.accept();
  });
});

test('CT007 - Valida a página de caso de testes', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Test Cases' }).click();
  await expect(page.getByText('Below is the list of test')).toBeVisible();
  await page.getByRole('link', { name: 'Test Case 1: Register User' }).click();
  await expect(page.getByText('Test Case 1: Register User 1')).toBeVisible();
  await page.getByRole('link', { name: 'Test Case 1: Register User' }).click();
  await page.getByRole('link', { name: 'Test Case 2: Login User with' }).click();
  await expect(page.getByText('Test Case 2: Login User with correct email and password 1. Launch browser 2.')).toBeVisible();
  await page.getByRole('link', { name: 'Test Case 2: Login User with' }).click();
  await expect(page.getByText('Test Cases Below is the list')).toBeVisible();
});

test('CT008 - Valida página de produtos e os detalhes de um produto', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.getByText('All Products  Added! Your')).toBeVisible();
  await page.locator('.choose > .nav > li > a').first().click();
  await expect(page.getByText(' Added! Your product has been added to cart. View Cart Continue Shopping Blue')).toBeVisible();
  await page.getByText('Blue Top Category: Women >').click();
});

test('CT009 - Pesquisa de produtos', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('Blue');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByText('Searched Products  Added!')).toBeVisible();
  await page.getByText('Sleeves Top and Short - Blue').first().click();
});

test('CT010 - Verifica a inscrição para novidades', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.keyboard.press('End');
  await page.getByRole('textbox', { name: 'Your email address' }).click();
  await page.getByRole('textbox', { name: 'Your email address' }).fill('fsafasffa@gmail.com');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByText('You have been successfully')).toBeVisible();

});

test('CT011 - Verifica inscrição na página do carrinho', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByRole('textbox', { name: 'Your email address' }).click();
  await page.getByRole('textbox', { name: 'Your email address' }).fill('fsafasffa@gmail.com');
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByText('You have been successfully')).toBeVisible();
});

test('CT012 - Adiciona produtos ao carrinho', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
});

test('CT013 - Valida a quantidade de produtos no carrinho', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
});

test('CT014 - Faz o pedido e registra durante o checkout', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Nome tal tal');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(faker.internet.email());
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.locator('#days').selectOption('8');
  await page.locator('#months').selectOption('3');
  await page.locator('#years').selectOption('1993');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Felipe first name');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Edu lastname');
  await page.getByRole('textbox', { name: 'Last name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('oi');
  await page.getByRole('textbox', { name: 'Company', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua 3');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Brazil');
  await page.getByRole('textbox', { name: 'State *' }).press('Tab');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Brasilia');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).press('Tab');
  await page.locator('#zipcode').fill('7500000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
});

test('CT015 - Faz o pedido e registra após o checkout', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Nome tal tal');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('manodoceu@gmail.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.locator('#days').selectOption('8');
  await page.locator('#months').selectOption('3');
  await page.locator('#years').selectOption('1993');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Felipe first name');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Edu lastname');
  await page.getByRole('textbox', { name: 'Last name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('oi');
  await page.getByRole('textbox', { name: 'Company', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua 3');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Brazil');
  await page.getByRole('textbox', { name: 'State *' }).press('Tab');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Brasilia');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).press('Tab');
  await page.locator('#zipcode').fill('7500000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
});

test('CT016 - Faz o pedido e loga após o checkout', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('manodoceu@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill('tal');
  await page.locator('input[name="name_on_card"]').press('Tab');
  await page.locator('input[name="card_number"]').fill('123');
  await page.locator('input[name="card_number"]').press('Tab');
  await page.getByRole('textbox', { name: 'ex.' }).fill('123');
  await page.getByRole('textbox', { name: 'ex.' }).press('Tab');
  await page.getByRole('textbox', { name: 'MM' }).fill('22');
  await page.getByRole('textbox', { name: 'MM' }).press('Tab');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2222');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.getByText('Congratulations! Your order')).toBeVisible();
});

test('CT017 - Remover produtos do carrinho', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
  await page.locator('#product-2').getByRole('cell', { name: '' }).locator('a').click();
  await page.getByRole('cell', { name: '' }).locator('a').click();
  await expect(page.locator('#empty_cart')).toBeVisible();

});

test('CT018 - Visualizar categoria de produtos', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.locator('#accordian div').filter({ hasText: 'Women' }).nth(1).click();
  await page.getByRole('heading', { name: ' Women' }).click();
  await page.getByRole('link', { name: ' Women' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Saree' }).click();
  await page.getByRole('link', { name: ' Men' }).click();
  await expect(page.locator('#Men div')).toBeVisible();
  await page.getByRole('link', { name: ' Kids' }).click();
  await page.getByRole('link', { name: 'Dress' }).click();
  await expect(page.getByRole('heading', { name: 'Kids - Dress Products' })).toBeVisible();

});

test('CT019 - Visualizar e validar menu por marcas de produtos', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
  await expect(page.locator('.brands-name')).toBeVisible();
  await page.getByRole('link', { name: '(6) Polo' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible();

});

test('CT020 - Pesquisar produtos e validar carrinho após login', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();

  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('FelipeNome');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('a' + email_user);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.locator('#days').selectOption('8');
  await page.locator('#months').selectOption('3');
  await page.locator('#years').selectOption('1993');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Felipe first name');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Edu lastname');
  await page.getByRole('textbox', { name: 'Last name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('oi');
  await page.getByRole('textbox', { name: 'Company', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua 3');
  await page.getByLabel('Country *').selectOption('United States');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Brazil');
  await page.getByRole('textbox', { name: 'State *' }).press('Tab');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Brasilia');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).press('Tab');
  await page.locator('#zipcode').fill('7500000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).click();
  await page.getByRole('textbox', { name: 'Search Product' }).fill('top');
  await page.getByRole('button', { name: '' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="5"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);

});

test('CT021 - Adiciona uma avaliação para um produto', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Products' }).click();
  await page.locator('.choose > .nav > li > a').first().click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Felipe');
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Add Review Here!' }).click();
  await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('Muito bom');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Thank you for your review.')).toBeVisible();
});

test('CT022 - Adiciona produtos recomendados ao carrinho', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.click('[data-product-id="2"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await expect(page.locator('#cart_info')).toBeVisible();
  const itemsCount = await page.locator('#cart_info tbody tr').count();
  expect(itemsCount).toBe(2);
});

test('CT023 - Valida endereço na página de checkout', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Fefe');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('ab' + email_user);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('fe');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('fe');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua Marechal');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Miami');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Joia');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('750000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await expect(page.locator('#address_invoice').getByText('Rua Marechal')).toBeVisible();
  await page.locator('#address_invoice').getByText('Joia Miami').click();
  await page.locator('#address_invoice').getByText('India').click();
  await page.locator('#address_invoice').getByText('55555555').click();

});

test('CT024 - Baixar fatura após compra', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Fefe');
  await page.getByRole('textbox', { name: 'Name' }).press('Tab');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('ab' + email_user);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('fe');
  await page.getByRole('textbox', { name: 'First name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('fe');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Rua Marechal');
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill('Miami');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Joia');
  await page.locator('#zipcode').click();
  await page.locator('#zipcode').fill('750000');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('55555555');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.click('[data-product-id="1"]');
  await expect(page.getByText('Your product has been added')).toBeVisible();
  await page.getByRole('paragraph').filter({ hasText: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill('fefe');
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill('123123123');
  await page.getByRole('textbox', { name: 'ex.' }).click();
  await page.getByRole('textbox', { name: 'ex.' }).fill('123');
  await page.getByRole('textbox', { name: 'MM' }).click();
  await page.getByRole('textbox', { name: 'MM' }).fill('22');
  await page.getByRole('textbox', { name: 'YYYY' }).click();
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2222');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  const download = await downloadPromise;
});

test('CT025 - Verifique a rolagem para cima usando o botão Seta e a funcionalidade de rolagem para baixo', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.locator('footer')).toBeVisible();
  await page.click('#scrollUp');
  await expect(page.locator('header')).toBeVisible();
});

test('CT026 - Verifique a funcionalidade Rolar para cima sem o botão Seta e Rolar para baixo', async ({ page }) => {
  await page.goto(config.baseUrl);
  await page.waitForLoadState('load');
  await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.locator('footer')).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.locator('header')).toBeVisible();
});
