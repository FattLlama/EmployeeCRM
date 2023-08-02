// Test 3: placeOrder() function
describe("placeOrder()", () => {
    it("should place an order successfully", async () => {
      // Assuming fetch is mocked to return a success response
      jest.spyOn(window, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [
          { name: "item1", quantity: 3, price: 10 },
          { name: "item2", quantity: 6, price: 15 },
        ],
      });
  
      document.body.innerHTML = `
        <form id="checkoutForm">
          <input type="number" data-name="item1" class="quantity-input" value="2" />
          <input type="number" data-name="item2" class="quantity-input" value="4" />
          <span id="totalPrice">0.00</span>
        </form>
      `;
  
      // Mock updateCheckoutTable and updateTotalPrice functions as they are external dependencies
      window.updateCheckoutTable = jest.fn();
      window.updateTotalPrice = jest.fn();
  
      await placeOrder();
  
      // Verify the functions were called
      expect(window.updateCheckoutTable).toHaveBeenCalledWith([
        { name: "item1", quantity: 3, price: 10 },
        { name: "item2", quantity: 6, price: 15 },
      ]);
      expect(window.updateTotalPrice).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Order placed successfully!");
    });
  
    it("should handle an error when placing an order", async () => {
      // Assuming fetch is mocked to return an error response
      jest.spyOn(window, "fetch").mockResolvedValue({ ok: false });
  
      document.body.innerHTML = `
        <form id="checkoutForm">
          <input type="number" data-name="item1" class="quantity-input" value="2" />
          <input type="number" data-name="item2" class="quantity-input" value="4" />
          <span id="totalPrice">0.00</span>
        </form>
      `;
  
      // Mock updateCheckoutTable and updateTotalPrice functions as they are external dependencies
      window.updateCheckoutTable = jest.fn();
      window.updateTotalPrice = jest.fn();
  
      await placeOrder();
  
      // Verify the functions were not called
      expect(window.updateCheckoutTable).not.toHaveBeenCalled();
      expect(window.updateTotalPrice).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Error placing order. Please try again.");
    });
  });
  