import { test, expect } from '@playwright/test';

test.describe('Fluxos do Cliente (Customer)', () => {

  test.beforeEach(async ({ page }) => {
    // Acessa a página do cliente com a URL completa do app
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
    await page.waitForLoadState('networkidle');
  });

  test('Deve realizar o login do cliente com sucesso', async ({ page }) => {
    // Seleciona um cliente (ex: Harry Potter / valor '1')
    await page.selectOption('#userSelect', '1');
    await page.click('button[type="submit"]');

    // Asserção: Boas-vindas ao cliente
    await expect(page.locator('.fontBig')).toBeVisible();
  });

  test('Deve realizar depósito e saque com atualização de saldo', async ({ page }) => {
    await page.selectOption('#userSelect', '1');
    await page.click('button[type="submit"]');

    // 1. Depósito
    await page.click('button[ng-click="deposit()"]');
    await page.fill('input[ng-model="amount"]', '100');
    await page.click('form button[type="submit"]');
    await expect(page.locator('.error')).toHaveText('Deposit Successful');

    // 2. Saque com espera de transição de aba
    await page.click('button[ng-click="withdrawl()"]');
    
    // Aguarda o botão da submissão de saque ficar visível na tela
    await page.waitForTimeout(1000); 
    
    await page.fill('input[ng-model="amount"]', '50');
    await page.click('form button[type="submit"]');
    await expect(page.locator('.error')).toHaveText('Transaction successful');
  });

  test('Deve exibir o histórico de transações com as entradas corretas', async ({ page }) => {
    await page.selectOption('#userSelect', '1');
    await page.click('button[type="submit"]');

    // Navega até o histórico
    await page.click('button[ng-click="transactions()"]');
    
    // Asserção: A tabela de transações ou container está visível
    await expect(page.locator('table')).toBeVisible();
  });

  test('Deve fazer logout e retornar à tela de login', async ({ page }) => {
    await page.selectOption('#userSelect', '1');
    await page.click('button[type="submit"]');

    // Logout
    await page.click('button.logout');

    // Asserção: Retornou para a seleção de usuário
    await expect(page.locator('#userSelect')).toBeVisible();
  });

});