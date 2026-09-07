import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can add customer', async ({ page }) => {
  const managerPage = new ManagerPage(page);

  // 1. Acessa a página diretamente como gerente
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');

  // 2. Escuta o alerta de sucesso e valida a mensagem
  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Customer added successfully');
    dialog.accept();
  });

  // 3. Usa o método da classe para adicionar o cliente
  await managerPage.addCustomer('Harry', 'Potter', '12345');
});