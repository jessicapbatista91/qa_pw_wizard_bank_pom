// Arquivo: /src/pages/ManagerPage.js

export class ManagerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Locators das Abas de navegação
    this.addCustomerTab = page.locator('[ng-click="addCust()"]');
    this.openAccountTab = page.locator('[ng-click="openAccount()"]');
    this.customersTab = page.locator('[ng-click="showCust()"]');

    // Locators do formulário "Add Customer"
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerBtn = page.locator('form[name="myForm"] button[type="submit"]');

    // Locators do formulário "Open Account"
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processBtn = page.locator('button[type="submit"]');

    // Locators da tabela "Customers"
    this.searchCustomerInput = page.getByPlaceholder('Search Customer');
    // Pegamos o botão delete da primeira linha retornada na busca
    this.deleteCustomerBtn = page.locator('button[ng-click="deleteCust(cust)"]').first(); 
  }

  // --- Ações (Métodos) ---

  async goToManagerLogin() {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.addCustomerTab.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.addCustomerBtn.click();
  }

  async openAccount(customerName, currency) {
    await this.openAccountTab.click();
    await this.customerSelect.selectOption({ label: customerName });
    await this.currencySelect.selectOption({ label: currency });
    await this.processBtn.click();
  }

  async searchAndDeleteCustomer(firstName) {
    await this.customersTab.click();
    await this.searchCustomerInput.fill(firstName);
    await this.deleteCustomerBtn.click();
  }
}