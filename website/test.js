// Test 1: getInventoryData() function
const fetchMock = require("jest-fetch-mock");
const { getInventoryData, updateCheckoutTable, placeOrder } = require("./public/checkout.js");
describe("getInventoryData()", () => {
    it("should return inventory data from the server", async () => {
      // Assuming fetch is mocked to return a sample inventory data
      jest.spyOn(window, "fetch").mockResolvedValue({
        json: async () => [{ name: "item1", quantity: 5, price: 10 }],
      });
  
      const inventoryData = await getInventoryData();
      expect(inventoryData).toEqual([{ name: "item1", quantity: 5, price: 10 }]);
    });
  
    it("should return an empty array if there is an error fetching inventory data", async () => {
      // Assuming fetch is mocked to throw an error
      jest.spyOn(window, "fetch").mockRejectedValue(new Error("Fetch error"));
  
      const inventoryData = await getInventoryData();
      expect(inventoryData).toEqual([]);
    });
  });
  