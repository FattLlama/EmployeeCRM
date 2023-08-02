require("text-encoding-utf-8"); // Import the polyfill

const { JSDOM } = require("jsdom");
const { getInventoryData } = require("./checkout");

// Set up the JSDOM environment before running the tests
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;

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
