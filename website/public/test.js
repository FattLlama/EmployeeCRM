// checkout.test.js
const fetch = require("node-fetch");
const { getInventoryData } = require("./checkout");

jest.mock("node-fetch");

describe("Test 1 - getInventoryData", () => {
  test("should fetch inventory data successfully", async () => {
    // Mock the fetch function to return a resolved Promise with mocked data
    const mockedInventoryData = [{ name: "Item 1", quantity: 10, price: 5.99 }];
    const mockResponse = { json: jest.fn().mockResolvedValue(mockedInventoryData) };
    fetch.mockResolvedValue(mockResponse);

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual(mockedInventoryData);
  });

  test("should handle errors when fetching inventory data", async () => {
    // Mock the fetch function to return a rejected Promise with an error
    const mockError = new Error("Fetch error");
    fetch.mockRejectedValue(mockError);

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual([]);
  });
});
