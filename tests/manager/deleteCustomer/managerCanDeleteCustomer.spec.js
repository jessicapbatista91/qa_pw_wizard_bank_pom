import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can delete customer', async ({ page }) => {
  const managerPage = new ManagerPage(page);
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');

  // 1. Busca por um cliente específico (ex: Neville)
  await managerPage.searchCustomerInput.fill('Neville');
  
  // 2. Garante que ele está na tabela antes de deletar
  await expect(page.getByRole('cell', { name: 'Neville', exact: true })).toBeVisible();

  // 3. Clica no botão de deletar daquela linha
  await managerPage.deleteCustomerBtn.click();

  // 4. Limpa a busca e procura de novo para garantir que sumiu
  await managerPage.searchCustomerInput.clear();
  await managerPage.searchCustomerInput.fill('Neville');
  
  // 5. Valida que não há mais nenhum registro com esse nome
  await expect(page.getByRole('cell', { name: 'Neville', exact: true })).toHaveCount(0);
});