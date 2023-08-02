const assert = require('assert');
const { JSDOM } = require('jsdom');

// Import the JavaScript files
const checkoutJsCode = require('./checkout.js');
const checkoutHtmlCode = `
<!DOCTYPE html>
<html>
  <body>
    <table id="checkoutTable"></table>
    <p>Total Price: $<span id="totalPrice">0.00</span></p>
  </body>
</html>
`;

describe("Checkout System Unit Tests", () => {
  let dom;

  // Set up a virtual DOM environment before each test
  beforeEach(() => {
    dom = new JSDOM(checkoutHtmlCode, { runScripts: 'dangerously' });
    global.document = dom.window.document;
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve([]),
    });
    global.alert = () => {}; // Mock the alert function to avoid errors
  });

  // Test 1
  it("should fetch inventory data successfully", async () => {
    // Assign the functions from the imported code
    const { getInventoryData } = checkoutJsCode;

    const mockInventoryData = [
      { name: "Item 1", quantity: 10, price: 5.99 },
      { name: "Item 2", quantity: 5, price: 10.99 },
      // Add more mock data if needed
    ];

    // Mock the fetch function to return the mock data
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve(mockInventoryData),
    });

    // Call the getInventoryData function
    const inventoryData = await getInventoryData();

    // Check the expected outcome
    assert.deepStrictEqual(inventoryData, mockInventoryData);
  });

  // Test 2
  it("should update the checkout table with inventory data", () => {
    // Assign the functions from the imported code
    const { updateCheckoutTable } = checkoutJsCode;

    const mockInventoryData = [
      { name: "Item 1", quantity: 10, price: 5.99 },
      { name: "Item 2", quantity: 5, price: 10.99 },
      // Add more mock data if needed
    ];

    // Call the updateCheckoutTable function with the mock data
    updateCheckoutTable(mockInventoryData);

    // Check the expected outcome
    const rowCount = dom.window.document.getElementById("checkoutTable").rows.length;
    assert.strictEqual(rowCount, mockInventoryData.length + 1); // +1 to account for the header row
  });

  // Test 3
  it("should calculate the total price based on selected quantities", () => {
    // Assign the functions from the imported code
    const { updateTotalPrice } = checkoutJsCode;

    // Mock the quantity inputs
    dom.window.document.body.innerHTML = `
    <input type="number" min="0" max="10" value="2" data-price="5.99" data-name="Item 1" class="quantity-input" />
    <input type="number" min="0" max="10" value="3" data-price="10.99" data-name="Item 2" class="quantity-input" />
    `;

    // Call the updateTotalPrice function with the mock data
    updateTotalPrice();

    // Check the expected outcome (change the value according to the expected total price)
    const expectedTotalPrice = 2 * 5.99 + 3 * 10.99;
    assert.strictEqual(
      parseFloat(dom.window.document.getElementById("totalPrice").innerText),
      expectedTotalPrice
    );
  });
});
