const fetchMock = require("jest-fetch-mock");

// Import the functions we want to test
const {
  getInventoryData,
  updateCheckoutTable,
  updateTotalPrice,
} = require("./checkout");

// Mock the fetch function for testing
global.fetch = fetchMock;

// Test 1: Test getInventoryData function
test("should fetch inventory data successfully", async () => {
  const mockInventoryData = [
    { name: "Item 1", quantity: 10, price: 5.99 },
    { name: "Item 2", quantity: 5, price: 10.99 },
    // Add more mock data if needed
  ];

  fetchMock.mockResponseOnce(JSON.stringify(mockInventoryData));

  // Call the getInventoryData function
  const inventoryData = await getInventoryData();

  // Check the expected outcome
  expect(inventoryData).toEqual(mockInventoryData);
});

// Test 2: Test updateCheckoutTable function
test("should update the checkout table with inventory data", () => {
  const mockInventoryData = [
    { name: "Item 1", quantity: 10, price: 5.99 },
    { name: "Item 2", quantity: 5, price: 10.99 },
    // Add more mock data if needed
  ];

  // Mock the document element and its methods
  document.body.innerHTML = `
    <table id="checkoutTable">
      <tr>
        <th>Item</th>
        <th>Stock</th>
        <th>Unit Price</th>
        <th>Quantity</th>
      </tr>
    </table>
  `;

  updateCheckoutTable(mockInventoryData);

  // Check the expected outcome
  const rows = document.querySelectorAll("#checkoutTable tr");
  expect(rows.length - 1).toBe(mockInventoryData.length); // -1 to account for the header row
});

// Test 3: Test updateTotalPrice function
test("should calculate the total price based on selected quantities", () => {
  // Mock the document elements and their properties
  document.body.innerHTML = `
    <table id="checkoutTable">
      <tr>
        <th>Item</th>
        <th>Stock</th>
        <th>Unit Price</th>
        <th>Quantity</th>
      </tr>
      <tr>
        <td>Item 1</td>
        <td>10</td>
        <td>$5.99</td>
        <td><input type="number" min="0" max="10" value="2" data-price="5.99" data-name="Item 1" class="quantity-input" /></td>
      </tr>
      <tr>
        <td>Item 2</td>
        <td>5</td>
        <td>$10.99</td>
        <td><input type="number" min="0" max="5" value="3" data-price="10.99" data-name="Item 2" class="quantity-input" /></td>
      </tr>
    </table>
    <p>Total Price: $<span id="totalPrice">0.00</span></p>
  `;

  updateTotalPrice();

  // Check the expected outcome
  const expectedTotalPrice = 2 * 5.99 + 3 * 10.99;
  expect(parseFloat(document.getElementById("totalPrice").innerText)).toBe(expectedTotalPrice);
});

