// Test 2: updateCheckoutTable() function
describe("updateCheckoutTable()", () => {
    it("should update the checkout table with items from the inventory", () => {
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
  
      const inventoryData = [
        { name: "item1", quantity: 5, price: 10 },
        { name: "item2", quantity: 8, price: 15 },
      ];
  
      updateCheckoutTable(inventoryData);
  
      const rows = document.querySelectorAll("#checkoutTable tr");
      expect(rows.length).toBe(3); // Header row + 2 data rows
  
      const lastRow = rows[rows.length - 1];
      expect(lastRow.innerHTML).toContain("item2");
      expect(lastRow.innerHTML).toContain("8");
      expect(lastRow.innerHTML).toContain("$15");
      expect(lastRow.innerHTML).toContain('data-name="item2"');
      expect(lastRow.innerHTML).toContain('max="8"');
    });
  
    it("should not add any rows to the table if inventory data is empty", () => {
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
  
      const inventoryData = [];
  
      updateCheckoutTable(inventoryData);
  
      const rows = document.querySelectorAll("#checkoutTable tr");
      expect(rows.length).toBe(1); // Only header row should be present
    });
  });
  