// test.js
const fetchMock = require("jest-fetch-mock");
const {
  getInventoryData,
  updateCheckoutTable,
  placeOrder,
} = require("./public/checkout");

describe("getInventoryData()", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return inventory data from the server", async () => {
    const mockInventoryData = [
      {
        "name": "joww",
        "price": "122.99",
        "status": "Not available",
        "quantity": 12,
        "ordered": 0
      },
      {
        "name": "jowwe",
        "price": "122.99",
        "status": "Not available",
        "quantity": 12123,
        "ordered": 0
      },
      {
        "name": "jowfde",
        "price": "55.99",
        "status": "Not available",
        "quantity": 0,
        "ordered": 0
      },
      {
        "name": "jow",
        "price": "55.99",
        "status": "Not available",
        "quantity": 56,
        "ordered": 0
      },
      {
        "name": "Dookie Shirts",
        "price": "420",
        "status": "Not available",
        "quantity": "20",
        "ordered": 0
      }
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockInventoryData));

    const inventoryData = await getInventoryData();
    expect(inventoryData).toEqual(mockInventoryData);
  });

  it("should return an empty array if there is an error fetching inventory data", async () => {
    fetchMock.mockRejectOnce(new Error("Fetch error"));

    const inventoryData = await getInventoryData();
    expect(inventoryData).toEqual([]);
  });
});

  