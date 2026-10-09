const { test: base, expect} = require ('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { InventoryPage } = require('../Pages/InventoryPage');


const test = base.extend ({
    loginPage: async ({ page}, use) => {
      const loginPage = new LoginPage(page);
      await use (loginPage);
    },
    inventoryPage: async ({ page}, use) => {
      const inventoryPage = new InventoryPage(page);
      await use(inventoryPage);
    }
});

module.exports = {test, expect };
