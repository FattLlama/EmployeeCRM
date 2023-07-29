// Function to get inventory data from the server
async function getInventoryData() {
  try {
    const response = await fetch("/get_inventory");
    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    return [];
  }
}

// Function to update the checkout table with items from the inventory
function updateCheckoutTable(inventoryData) {
  const checkoutTable = document.getElementById("checkoutTable");

  // Remove any existing rows from the table
  while (checkoutTable.rows.length > 1) {
    checkoutTable.deleteRow(1);
  }

  // Add rows for each item in the inventory
  inventoryData.forEach((item) => {
    const newRow = checkoutTable.insertRow();
    newRow.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price}</td>
      <td><input type="number" min="0" max="${item.quantity}" value="0" data-price="${item.price}" data-name="${item.name}" class="quantity-input" /></td>
    `;
  });

  // Add event listeners to quantity inputs to update total price
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateTotalPrice);
  });
}

// Function to calculate the total price based on selected quantities
function updateTotalPrice() {
  let totalPrice = 0;
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    const quantity = parseInt(input.value);
    const price = parseFloat(input.dataset.price);
    totalPrice += quantity * price;
  });

  document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}

// Function to place the order
async function placeOrder() {
  const orderItems = [];
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    const name = input.dataset.name;
    const quantity = parseInt(input.value);

    if (quantity > 0) {
      orderItems.push({ name, quantity });
    }
  });

  const orderData = JSON.stringify({ orderItems });

  try {
    const response = await fetch("/update_inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData,
    });

    const message = await response.json();
    alert(message);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Error placing order. Please try again.");
  }
}

async function placeOrder() {
  const orderItems = [];
  const quantityInputs = document.querySelectorAll(".quantity-input");

  quantityInputs.forEach((input) => {
    const name = input.dataset.name;
    const quantity = parseInt(input.value);

    if (quantity > 0) {
      orderItems.push({ name, quantity });
    }
  });

  const orderData = JSON.stringify({ orderItems });

  try {
    const response = await fetch("/place_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData,
    });

    if (response.ok) {
      const updatedInventory = await response.json();

      // Update the checkout table with the updated inventory data
      updateCheckoutTable(updatedInventory);

      // Clear the quantity inputs
      quantityInputs.forEach((input) => {
        input.value = 0;
      });

      // Update the total price
      updateTotalPrice();

      alert("Order placed successfully!");
    } else {
      alert("Error placing order. Please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Error placing order. Please try again.");
  }
}

// Load the inventory data and set up the checkout table when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  const inventoryData = await getInventoryData();
  updateCheckoutTable(inventoryData);
});



