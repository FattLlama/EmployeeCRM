// Function to load the JSON inventory data
async function loadInventoryData() {
  try {
    const response = await fetch('inventory.json');
    const inventoryData = await response.json();
    return inventoryData;
  } catch (error) {
    console.error('Error loading inventory data:', error);
    return [];
  }
}

// Function to update the checkout table with inventory data
async function updateCheckoutTable() {
  const inventoryData = await loadInventoryData();
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutTable = document.getElementById('checkoutTable');
  const totalPriceSpan = document.getElementById('totalPrice');

  while (checkoutTable.rows.length > 1) {
    checkoutTable.deleteRow(-1);
  }

  let totalPrice = 0;

  for (const item of inventoryData) {
    const itemName = item.name;
    const itemStock = item.quantity;
    const itemPrice = parseFloat(item.price);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '0';
    quantityInput.max = itemStock.toString();
    quantityInput.value = '0';
    quantityInput.oninput = () => calculateTotal();

    const row = checkoutTable.insertRow();
    row.insertCell().innerText = itemName;
    row.insertCell().innerText = itemStock;
    row.insertCell().innerText = `$${itemPrice.toFixed(2)}`;
    row.insertCell().appendChild(quantityInput);
  }

  function calculateTotal() {
    totalPrice = 0;

    for (let i = 1; i < checkoutTable.rows.length; i++) {
      const quantity = parseInt(checkoutTable.rows[i].cells[3].getElementsByTagName('input')[0].value);
      const unitPrice = parseFloat(checkoutTable.rows[i].cells[2].innerText.substring(1));
      totalPrice += quantity * unitPrice;
    }

    totalPriceSpan.innerText = totalPrice.toFixed(2);
  }

  calculateTotal();
}

// Function to place the order and update the inventory data
async function placeOrder() {
  const inventoryData = await loadInventoryData();
  const checkoutTable = document.getElementById('checkoutTable');

  for (let i = 1; i < checkoutTable.rows.length; i++) {
    const quantity = parseInt(checkoutTable.rows[i].cells[3].getElementsByTagName('input')[0].value);
    const itemName = checkoutTable.rows[i].cells[0].innerText;

    for (const item of inventoryData) {
      if (item.name === itemName) {
        if (item.quantity >= quantity) {
          item.quantity -= quantity;
          item.ordered += quantity;
        } else {
          alert('Insufficient stock for ' + itemName);
          return;
        }
        break;
      }
    }
  }

  // Save the updated inventory data back to the JSON file
  try {
    const response = await fetch('inventory.json', {
      method: 'PUT', // You may need to adjust this depending on the server setup
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventoryData),
    });
    if (!response.ok) {
      console.error('Failed to update inventory data:', response.status, response.statusText);
      return;
    }
    updateCheckoutTable();
    alert('Order placed successfully!');
  } catch (error) {
    console.error('Error updating inventory data:', error);
  }
}

// Call the updateCheckoutTable function on page load to initialize the checkout table
updateCheckoutTable();
