// public/test.js
const { getInventoryData } = require("./checkout");

describe("Test 1 - getInventoryData", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should fetch inventory data successfully", async () => {
    // Mock the response from the server
    const mockedInventoryData = [{ name: "Item 1", quantity: 10, price: 5.99 }];
    fetch.mockResponseOnce(JSON.stringify(mockedInventoryData));

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual(mockedInventoryData);
  });

  test("should handle errors when fetching inventory data", async () => {
    // Mock the fetch function to return a rejected Promise with an error
    fetch.mockRejectOnce(new Error("Fetch error"));

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual([]);
  });
});
