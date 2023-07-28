function updateCheckoutTable() {
  fetch('/get_inventory')
    .then(response => response.json())
    .then(inventoryData => {
      const checkoutForm = document.getElementById('checkoutForm');
      const checkoutTable = document.getElementById('checkoutTable');
      const totalPriceSpan = document.getElementById('totalPrice');

      checkoutTable.innerHTML = ''; // Clear the existing table

      let totalPrice = 0;

      for (const item of inventoryData) {
        const itemName = item.name;
        const itemStock = item.quantity;
        const itemPrice = item.price;

        const row = checkoutTable.insertRow();
        const checkboxCell = row.insertCell();
        const itemNameCell = row.insertCell();
        const itemStockCell = row.insertCell();
        const itemPriceCell = row.insertCell();
        const quantityCell = row.insertCell();

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'item';
        checkbox.value = itemName;
        checkboxCell.appendChild(checkbox);

        itemNameCell.innerText = itemName;
        itemStockCell.innerText = itemStock;
        itemPriceCell.innerText = `$${itemPrice.toFixed(2)}`;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '0';
        quantityInput.max = itemStock.toString();
        quantityInput.value = '0';
        quantityInput.oninput = () => calculateTotal();
        quantityCell.appendChild(quantityInput);
      }

      function calculateTotal() {
        totalPrice = 0;

        const checkboxes = document.getElementsByName('item');
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            const itemName = checkboxes[i].value;
            const quantity = parseInt(checkboxes[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[0].value);
            const item = inventoryData.find(item => item.name === itemName);
            if (item) {
              totalPrice += quantity * item.price;
            }
          }
        }

        totalPriceSpan.innerText = totalPrice.toFixed(2);
      }

      checkoutForm.onchange = calculateTotal;
    })
    .catch(error => console.error('Error fetching inventory data:', error));
}

// Rest of the code remains the same

function placeOrder() {
  const selectedItems = [];
  const checkboxes = document.getElementsByName('item');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const itemName = checkboxes[i].value;
      const quantity = parseInt(checkboxes[i].parentElement.nextElementSibling.children[0].value);
      selectedItems.push({ itemName, quantity });
    }
  }

  fetch('/get_inventory')
    .then(response => response.json())
    .then(inventoryData => {
      for (const selectedItem of selectedItems) {
        const item = inventoryData.find(item => item.name === selectedItem.itemName);
        if (item) {
          item.quantity -= selectedItem.quantity;
        }
      }

      fetch('/update_inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inventory: JSON.stringify(inventoryData) })
      })
        .then(response => response.json())
        .then(message => {
          updateCheckoutTable();
          alert(message);
        })
        .catch(error => console.error('Error placing order:', error));
    })
    .catch(error => console.error('Error fetching inventory data:', error));
}

updateCheckoutTable();


