const {test,expect} = require('../Fixtures/pages.fixture');

 //*******************************************************************
//Group the tests with
//*******************************************************************
test.describe('Product sorting tests', () =>{


//*******************************************************************
// Runs before every test
//*******************************************************************
test.beforeEach(async ({loginPage}) => {

  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;

  if (!username || !password){
    throw new Error (
      'SAUCE_USERNAME or SAUCE_PASSWORD is missing.'
    )
  }
  await loginPage.open();
  await loginPage.login(username, password);
  await loginPage.verifySuccessfulLogin();
});


//*******************************************************************
//1st Test
//*******************************************************************
test('sort products by price low to high', async ({ inventoryPage }, testInfo) => {


  await inventoryPage.selectSortOption('lohi');

  const { priceTexts, actualPrices } = await inventoryPage.getPriceData();

  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  expect(actualPrices).toEqual(expectedPrices);
  await testInfo.attach('Low to High Prices', {
    body: [
      'Text: ' + priceTexts.join(', '),
      'Actual: ' + actualPrices.join(', '),
      'Expected: ' + expectedPrices.join(', '),
    ].join('\n'),
    contentType: 'text/plain',
  });
});


//*******************************************************************
//2nd Test
//*******************************************************************
test('sort products by price high to low', async ({ inventoryPage }, testInfo) => {


  await inventoryPage.selectSortOption('hilo');

  const { priceTexts, actualPrices } = await inventoryPage.getPriceData();

  const expectedPrices = [...actualPrices].sort((a, b) => b - a);

  expect(actualPrices).toEqual(expectedPrices);
  await testInfo.attach('High to Low Prices', {
    body: [
      'Text: ' + priceTexts.join(', '),
      'Actual: ' + actualPrices.join(', '),
      'Expected: ' + expectedPrices.join(', '),
    ].join('\n'),
    contentType: 'text/plain',
  });
});


//*******************************************************************
//3rd Test
//*******************************************************************
test('sort product names from A to Z', async ({ inventoryPage }, testInfo) => {


  await inventoryPage.selectSortOption('az');
  const actualNames = await inventoryPage.getProductNames();

  const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

  expect(actualNames).toEqual(expectedNames);

  await testInfo.attach('A to Z Names', {
    body: [
      'Actual: ' + actualNames.join(', '),
      'Expected: ' + expectedNames.join(', '),
    ].join('\n'),
    contentType: 'text/plain',
  });
});

//*******************************************************************
//4th Test
//*******************************************************************
test ('sort product names from Z to A',async({inventoryPage}, testInfo) => {


    await inventoryPage.selectSortOption('za');
    const actualNames = await inventoryPage.getProductNames();

    const expectedNames = [...actualNames].sort((a,b) =>b.localeCompare(a));
    expect(actualNames).toEqual(expectedNames);

    await testInfo.attach('Z to A Names: ',{
    body: [
        'Actual: ' + actualNames.join(', '),
        'Expected: ' + expectedNames.join(', '),
      ].join('\n'),
      contentType:'text/plain'
    });
  });
});
