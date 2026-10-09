const { expect } = require ('@playwright/test');

class InventoryPage{
  constructor(page){
    this.page = page;
    this.sortMenu = page.locator('[data-test="product-sort-container"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');

  }

  async selectSortOption(optionValue){
    await this.sortMenu.selectOption(optionValue);
    await expect(this.sortMenu).toHaveValue(optionValue);
  }

  async getPriceData(){
    const priceTexts = await this.productPrices.allTextContents();
    const actualPrices = priceTexts.map(
      price => Number(price.replace('$', ''))
    );
    return { priceTexts, actualPrices };
  }

  async getProductNames(){
    const productNames = await this.productNames.allTextContents();
    expect(productNames.length).toBeGreaterThan(1);
    return productNames;
  }


}

module.exports = { InventoryPage };
