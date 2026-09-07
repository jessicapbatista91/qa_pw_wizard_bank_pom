import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can search customer by first name', async ({ page }) => {
  const managerPage = new ManagerPage(page);
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  // Busca pelo primeiro nome de um cliente padrão
  await managerPage.searchCustomerInput.fill('Harry');
  
  // Valida que o nome "Harry" aparece na tabela
  await expect(page.getByRole('cell', { name: 'Harry', exact: true })).toBeVisible();
});