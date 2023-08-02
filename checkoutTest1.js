describe("Test getInventoryData function", () => {
    it("should fetch inventory data successfully", async () => {
      const mockInventoryData = [
        { name: "Item 1", quantity: 10, price: 5.99 },
        { name: "Item 2", quantity: 5, price: 10.99 },
        // Add more mock data if needed
      ];
  
      // Mock the fetch function to return the mock data
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockInventoryData),
      });
  
      // Call the getInventoryData function
      const inventoryData = await getInventoryData();
  
      // Check the expected outcome
      assert.deepStrictEqual(inventoryData, mockInventoryData);
    });
  });