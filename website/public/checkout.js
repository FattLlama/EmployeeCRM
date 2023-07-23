function updateCheckoutTable() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutTable = document.getElementById('checkoutTable');
    const totalPriceSpan = document.getElementById('totalPrice');
  
    while (checkoutTable.rows.length > 1) {
      checkoutTable.deleteRow(-1);
    }
  
    let totalPrice = 0;
  
    for (const item of inventoryData) {
      const itemName = item.name;
      const itemStock = item.stock;
      const itemPrice = item.price;
  
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
  
  // Function to place the order and update the inventory in local storage
  function placeOrder() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
  
    for (let i = 1; i < checkoutTable.rows.length; i++) {
      const quantity = parseInt(checkoutTable.rows[i].cells[3].getElementsByTagName('input')[0].value);
      const itemName = checkoutTable.rows[i].cells[0].innerText;
  
      for (const item of inventoryData) {
        if (item.name === itemName) {
          item.stock -= quantity;
          break;
        }
      }
    }
  
    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
    updateCheckoutTable();
    alert('Order placed successfully!');
  }
  
  // Call the updateCheckoutTable function on page load to initialize the checkout table
  updateCheckoutTable();