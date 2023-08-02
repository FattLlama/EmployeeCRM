// test.js (Mocha test file)

const assert = require('assert');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon');

const checkout = require('./checkout.js'); // Replace the path with the actual location of checkout.js

// Sample inventory data for testing
const sampleInventoryData = [
  { name: 'Item 1', quantity: 10, price: 5.0 },
  { name: 'Item 2', quantity: 15, price: 8.0 },
  // Add more sample items as needed
];

// Test 1: getInventoryData()
describe('getInventoryData()', () => {
  it('should fetch inventory data from the server', async () => {
    // Stub the fetch function to return sample inventory data
    const fetchStub = sinon.stub(fetch, 'Promise');
    fetchStub.resolves({
      json: () => Promise.resolve(sampleInventoryData),
    });

    // Call the function and check the returned data
    const inventoryData = await checkout.getInventoryData();
    assert.deepStrictEqual(inventoryData, sampleInventoryData);

    // Restore the fetch function to its original implementation
    fetchStub.restore();
  });

  it('should handle errors and return an empty array on failure', async () => {
    // Stub the fetch function to throw an error
    const fetchStub = sinon.stub(fetch, 'Promise');
    fetchStub.rejects(new Error('Fetch error'));

    // Call the function and check the returned data
    const inventoryData = await checkout.getInventoryData();
    assert.deepStrictEqual(inventoryData, []);

    // Restore the fetch function to its original implementation
    fetchStub.restore();
  });
});

// Test 2: updateCheckoutTable(inventoryData)
describe('updateCheckoutTable(inventoryData)', () => {
  it('should update the checkout table with inventory data', () => {
    // Create a fake DOM environment using jsdom
    const dom = new JSDOM(fs.readFileSync(path.resolve(__dirname, 'checkoutsystem.html'), 'utf-8'), {
      runScripts: 'dangerously',
    });

    global.document = dom.window.document;
    global.fetch = fetch; // Replace with actual fetch if needed

    // Call the function with sample inventory data
    checkout.updateCheckoutTable(sampleInventoryData);

    // Verify the table content after updating
    const checkoutTable = document.getElementById('checkoutTable');
    assert.strictEqual(checkoutTable.rows.length, sampleInventoryData.length + 1); // +1 for the header row

    // Additional checks can be made for table row contents if needed
  });
});

// Test 3: placeOrder()
describe('placeOrder()', () => {
  it('should place an order and update the checkout table, quantity inputs, and total price', async () => {
    // Stub the fetch function to return updated inventory data
    const fetchStub = sinon.stub(fetch, 'Promise');
    fetchStub.resolves({
      ok: true,
      json: () => Promise.resolve(sampleInventoryData), // Returning sample data for updated inventory
    });

    // Fake DOM environment
    const dom = new JSDOM(fs.readFileSync(path.resolve(__dirname, 'checkoutsystem.html'), 'utf-8'), {
      runScripts: 'dangerously',
    });

    global.document = dom.window.document;
    global.fetch = fetch; // Replace with actual fetch if needed

    // Call the function with some quantity inputs selected
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs[0].value = '5'; // Selecting 5 items of the first product

    // Stubbing the updateCheckoutTable function to track its usage and arguments
    const updateCheckoutTableStub = sinon.stub(checkout, 'updateCheckoutTable');

    // Stubbing the updateTotalPrice function to track its usage
    const updateTotalPriceStub = sinon.stub(checkout, 'updateTotalPrice');

    // Stubbing the alert function to prevent showing an actual alert popup
    const alertStub = sinon.stub(window, 'alert');

    // Call the function
    await checkout.placeOrder();

    // Verify the results
    assert.ok(fetchStub.calledOnce); // Ensure fetch is called
    assert.ok(updateCheckoutTableStub.calledOnceWith(sampleInventoryData)); // Ensure updateCheckoutTable is called with updated data
    assert.ok(updateTotalPriceStub.calledOnce); // Ensure updateTotalPrice is called
    assert.ok(alertStub.calledOnceWith('Order placed successfully!')); // Ensure alert is called with the success message

    // Additional checks can be made to validate the functionality of updating quantity inputs and total price.

    // Restore the stubs
    fetchStub.restore();
    updateCheckoutTableStub.restore();
    updateTotalPriceStub.restore();
    alertStub.restore();
  });

  it('should handle error and show an alert message on failure', async () => {
    // Stub the fetch function to return an error response
    const fetchStub = sinon.stub(fetch, 'Promise');
    fetchStub.resolves({
      ok: false,
    });

    // Fake DOM environment
    const dom = new JSDOM(fs.readFileSync(path.resolve(__dirname, 'checkoutsystem.html'), 'utf-8'), {
      runScripts: 'dangerously',
    });

    global.document = dom.window.document;
    global.fetch = fetch; // Replace with actual fetch if needed

    // Stub the alert function to track its usage and arguments
    const alertStub = sinon.stub(window, 'alert');

    // Call the function
    await checkout.placeOrder();

    // Verify the result
    assert.ok(alertStub.calledOnceWith('Error placing order. Please try again.')); // Ensure alert is called with the error message

    // Restore the stubs
    fetchStub.restore();
    alertStub.restore();
  });
});
