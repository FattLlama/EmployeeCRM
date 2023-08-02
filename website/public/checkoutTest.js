const assert = require('assert');

// Your test suite
describe("Checkout System Unit Tests", () => {

  // Test 1
  it("should fetch inventory data successfully", async () => {
    const mockInventoryData = [
      { name: "Item 1", quantity: 10, price: 5.99 },
      { name: "Item 2", quantity: 5, price: 10.99 },
      // Add more mock data if needed
    ];

    // Mock the fetch function to return the mock data
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockInventoryData),
      });

    // Call the getInventoryData function
    const inventoryData = await getInventoryData();

    // Check the expected outcome
    assert.deepStrictEqual(inventoryData, mockInventoryData);
  });

  // Test 2
  it("should update the checkout table with inventory data", () => {
    const mockInventoryData = [
      { name: "Item 1", quantity: 10, price: 5.99 },
      { name: "Item 2", quantity: 5, price: 10.99 },
      // Add more mock data if needed
    ];

    // Create a dummy table element
    const checkoutTable = document.createElement("table");

    // Call the updateCheckoutTable function with the mock data
    updateCheckoutTable(mockInventoryData);

    // Check the expected outcome
    const rowCount = checkoutTable.rows.length;
    assert.strictEqual(rowCount, mockInventoryData.length + 1); // +1 to account for the header row
  });

  // Test 3
  it("should calculate the total price based on selected quantities", () => {
    // Mock the document elements and their properties
    const quantityInputs = [
      { value: "2", dataset: { price: "5.99" } },
      { value: "3", dataset: { price: "10.99" } },
      // Add more mock data if needed
    ];

    // Call the updateTotalPrice function with the mock data
    updateTotalPrice();

    // Check the expected outcome (change the value according to the expected total price)
    const expectedTotalPrice = 2 * 5.99 + 3 * 10.99;
    assert.strictEqual(
      parseFloat(document.getElementById("totalPrice").innerText),
      expectedTotalPrice
    );
  });
});

