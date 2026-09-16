import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Deve adicionar cliente e validar presença na tabela', async ({ page }) => {
  const managerPage = new ManagerPage(page);

  // Gera dados dinâmicos
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');

  // Valida o alerta de sucesso
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Customer added successfully');
    await dialog.accept();
  });

  await managerPage.addCustomer(firstName, lastName, postCode);

  // Validação adicional: Vai para a aba de clientes e verifica se o nome aparece na tabela
  await managerPage.customersTab.click();
  await managerPage.searchCustomerInput.fill(firstName);
  
  const customerRow = page.locator('tr', { hasText: firstName });
  await expect(customerRow).toBeVisible();
});