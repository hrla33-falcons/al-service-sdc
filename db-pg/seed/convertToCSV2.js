// jshint esversion:6

const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const generateFakeProduct = require('./generateFakeProduct2');


const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'data', title: 'data' }
  ]
});

let recSeeder = (batch) => {
    let recSeeds = [];
    for (let i = 1; i <= 10000; i++) {
        recSeeds.push(generateFakeProduct((batch - 1) * 10000 + i));
    }
    return recSeeds;
};

let batches = 0;
let append = () => {
  if (batches < 1000) {
    batches += 1;
    console.log(batches);
    let data = recSeeder(batches);
    csvWriter.writeRecords(data).then(() => append());
  } else {
    console.timeEnd('writeCSV');
    console.log('The CSV file was written successfully');
  }
};

console.time('writeCSV');
append();

