const assert = require("chai").assert;
const { getInventoryData, updateCheckoutTable, updateTotalPrice } = require("./checkout");

// Test 1
describe("Test getInventoryData function", () => {
  it("should fetch inventory data successfully", async () => {
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
});

// Test 2
describe("Test updateCheckoutTable function", () => {
  it("should update the checkout table with inventory data", () => {
    const mockInventoryData = [
      { name: "Item 1", quantity: 10, price: 5.99 },
      { name: "Item 2", quantity: 5, price: 10.99 },
      // Add more mock data if needed
    ];

    // Mock the document element and its methods
    const checkoutTable = document.createElement("table");
    checkoutTable.insertRow = () => {};

    // Call the updateCheckoutTable function with the mock data
    updateCheckoutTable(mockInventoryData);

    // Check the expected outcome
    assert.strictEqual(checkoutTable.rows.length, mockInventoryData.length + 1);
  });
});

// Test 3
describe("Test updateTotalPrice function", () => {
  it("should calculate the total price based on selected quantities", () => {
    // Mock the document elements and their properties
    const quantityInputs = [
      { value: "2", dataset: { price: "5.99" } },
      { value: "3", dataset: { price: "10.99" } },
      // Add more mock data if needed
    ];

    // Mock the getElementById method to return a mocked element
    global.document.getElementById = () => ({ innerText: "" });

    // Call the updateTotalPrice function with the mock data
    updateTotalPrice.apply(global);

    // Check the expected outcome (change the value according to the expected total price)
    const expectedTotalPrice = 2 * 5.99 + 3 * 10.99;
    assert.strictEqual(parseFloat(global.document.getElementById("totalPrice").innerText), expectedTotalPrice);
  });
});


