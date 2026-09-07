import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can search customer by postal code', async ({ page }) => {
  const managerPage = new ManagerPage(page);
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  // Busca pelo CEP do Harry Potter
  await managerPage.searchCustomerInput.fill('E725JB');
  
  // Valida que o CEP "E725JB" aparece na tabela
  await expect(page.getByRole('cell', { name: 'E725JB', exact: true })).toBeVisible();
});