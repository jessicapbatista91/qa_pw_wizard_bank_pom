import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can open account', async ({ page }) => {
  const managerPage = new ManagerPage(page);

  // 1. Acessa a página do gerente
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');

  // Pré-requisito: Cria um cliente e valida a mensagem do alerta
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });
  await managerPage.addCustomer('Hermione', 'Granger', '54321');

  // 2. Escuta o alerta de criação de conta e valida
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Account created successfully');
    await dialog.accept();
  });

  // 3. Abre a conta usando o método da classe
  await managerPage.openAccount('Hermione Granger', 'Dollar');
});