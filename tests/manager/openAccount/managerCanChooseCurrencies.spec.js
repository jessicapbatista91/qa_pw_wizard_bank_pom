import { test, expect } from '@playwright/test';
import { ManagerPage } from '../../../src/pages/manager/ManagerPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const managerPage = new ManagerPage(page);

  // 1. Open the Open account page
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');

  // 2. Select currency Dollar
  // Usamos { label: 'Dollar' } para garantir que ele clique no texto visível da opção
  await managerPage.currencySelect.selectOption({ label: 'Dollar' });
  
  // 3. Assert the drop-dwon has value Dollar
  // Usamos expressão regular /Dollar/ porque o Angular às vezes salva o value como "string:Dollar" internamente
  await expect(managerPage.currencySelect).toHaveValue(/Dollar/);

  // 4. Select currency Pound
  await managerPage.currencySelect.selectOption({ label: 'Pound' });
  
  // 5. Assert the drop-dwon has value Pound
  await expect(managerPage.currencySelect).toHaveValue(/Pound/);

  // 6. Select currency Rupee
  await managerPage.currencySelect.selectOption({ label: 'Rupee' });
  
  // 7. Assert the drop-dwon has value Rupee
  await expect(managerPage.currencySelect).toHaveValue(/Rupee/);
});