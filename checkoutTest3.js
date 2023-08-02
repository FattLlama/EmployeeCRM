// Test 3
describe("Test updateTotalPrice function", () => {
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
      assert.strictEqual(parseFloat(document.getElementById("totalPrice").innerText), expectedTotalPrice);
    });
  });