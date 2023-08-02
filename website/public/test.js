// public/test.js
const fetchMock = require("jest-fetch-mock");
const { getInventoryData } = require("./checkout");

jest.mock("node-fetch", () => fetchMock);

describe("Test 1 - getInventoryData", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should fetch inventory data successfully", async () => {
    // Mock the response from the server
    const mockedInventoryData = [{ name: "Item 1", quantity: 10, price: 5.99 }];
    fetchMock.mockResponseOnce(JSON.stringify(mockedInventoryData));

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual(mockedInventoryData);
  });

  test("should handle errors when fetching inventory data", async () => {
    // Mock the fetch function to return a rejected Promise with an error
    fetchMock.mockRejectOnce(new Error("Fetch error"));

    // Call the function and assert the result
    const result = await getInventoryData();
    expect(result).toEqual([]);
  });
});
