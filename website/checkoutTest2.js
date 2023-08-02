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
      checkoutTable.insertRow = jest.fn();
  
      // Call the updateCheckoutTable function with the mock data
      updateCheckoutTable(mockInventoryData);
  
      // Check the expected outcome
      assert.strictEqual(checkoutTable.insertRow.mock.calls.length, mockInventoryData.length);
    });
  });