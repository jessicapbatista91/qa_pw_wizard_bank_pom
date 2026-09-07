import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can Login', async ({ page }) => {
  const managerPage = new ManagerPage(page);

  // 1. Open Wizard bank home page
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

  // 2. Click [Bank Manager Login]
  await managerPage.goToManagerLogin();

  // 3. Assert button [Add Customer] is visible
  await expect(managerPage.addCustomerTab).toBeVisible();

  // 4. Assert button [Open Account] is visible
  await expect(managerPage.openAccountTab).toBeVisible();

  // 5. Assert button [Customers] is visible
  await expect(managerPage.customersTab).toBeVisible();
});