/*
  Import customized Playwright test and expect.

  Data structure:
  - test: function enhanced with our custom fixtures
  - expect: assertion function
*/
const {test,expect} = require('../Fixtures/pages.fixture');
const {sortingData} = require('../TestData/sortingData');


test.describe('Data-driven product sorting tests',() =>{
  test.beforeEach(async ({loginPage})=>{
    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;

    if (!username || !password){
      throw new Error('SAUCE_USERNAME or SAUCE_PASSWORD is missing.');
    }
    await loginPage.open();
    await loginPage.login(username,password);
    await loginPage.verifySuccessfulLogin();

  });
  for (const sortCase of sortingData){
    test(sortCase.testName, { tag: sortCase.tags }, async ({ inventoryPage }, testInfo) => {
      await inventoryPage.selectSortOption(sortCase.option);
    if (sortCase.dataType === 'price'){
      const {priceTexts, actualPrices} = await inventoryPage.getPriceData();
      const expectedPrices = [...actualPrices].sort((a,b) =>
      sortCase.direction === 'ascending'
      ? a-b
      : b-a
    );
    expect(actualPrices).toEqual(expectedPrices);

    await testInfo.attach(sortCase.testName + ' results',
    {
      body:[
         'Test: ' + priceTexts.join(', '),
         'Actual: '+ actualPrices.join(', '),
         'Expected: '+ expectedPrices.join(', '),
      ].join('\n'),
      contentType: 'text/plain',
    });
  }
  else {
    const actualNames = await inventoryPage.getProductNames();
    const expectedNames = [...actualNames].sort((a,b) =>
    sortCase.direction === 'ascending'
    ? a.localeCompare(b)
    : b.localeCompare(a)
  );
  expect(actualNames).toEqual(expectedNames);
await testInfo.attach(sortCase.testName+ ' results',
  {
    body:[
       'Actual: '+ actualNames.join(', '),
       'Expected: '+ expectedNames.join(', '),
    ].join('\n'),
    contentType: 'text/plain',
  }
);
}
});
}
});
