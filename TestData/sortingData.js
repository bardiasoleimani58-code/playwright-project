const sortingData = [{
  testName: 'sort prices low to high',
  option: 'lohi',
  dataType: 'price',
  direction: 'ascending',
  tags: ['@smoke', '@sorting'],
},
{
  testName: 'sort prices high to low',
  option: 'hilo',
  dataType: 'price',
  direction: 'descending',
  tags: ['@regression', '@sorting'],
},
{
  testName: 'sort names A to Z',
  option: 'az',
  dataType: 'name',
  direction: 'ascending',
  tags: ['@regression', '@sorting'],
},
{
  testName: 'sort names Z to A',
  option: 'za',
  dataType: 'name',
  direction: 'descending',
  tags: ['@regression', '@sorting'],
}
];
module.exports = { sortingData };
