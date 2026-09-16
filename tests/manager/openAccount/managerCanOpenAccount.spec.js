import { test, expect } from '@playwright/test';

test('Assert the deposit can be opened', async ({ page }) => {
  // 1. Navega para a página do cliente
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  
  // 2. Aguarda a rede ficar ociosa para garantir o carregamento completo do Angular
  await page.waitForLoadState('networkidle');

  // 3. Seleciona o usuário e realiza o login
  await page.selectOption('#userSelect', '1');
  await page.click('button[type="submit"]');

  // 4. Aguarda o botão de depósito estar visível e clica nele
  await page.waitForSelector('button[ng-click="deposit()"]');
  await page.click('button[ng-click="deposit()"]');

  // 5. Aguarda especificamente o formulário de depósito ser renderizado na tela
  await page.waitForSelector('form[ng-submit="deposit()"]');

  // 6. Validação: Confirma que o campo de input para digitar o valor está visível
  await expect(page.locator('input[ng-model="amount"]')).toBeVisible();
});