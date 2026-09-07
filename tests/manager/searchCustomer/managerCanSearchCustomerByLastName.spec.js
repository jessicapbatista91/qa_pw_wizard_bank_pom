import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can search customer by last name', async ({ page }) => {
  const managerPage = new ManagerPage(page);
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  // Busca pelo sobrenome
  await managerPage.searchCustomerInput.fill('Potter');
  
  // Valida que o sobrenome "Potter" aparece na tabela
  await expect(page.getByRole('cell', { name: 'Potter', exact: true })).toBeVisible();
});