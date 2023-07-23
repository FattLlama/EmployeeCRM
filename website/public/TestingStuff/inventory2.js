if (!localStorage.getItem('inventoryData')) {
    const initialData = [
      { name: 'DKRSTR Mesh Shorts', stock: 10, price: 20.0 },
      { name: 'No Fear Vintage Tees', stock: 15, price: 15.0 },
      { name: 'Daisy Co. Beanies', stock: 5, price: 10.0 }
    ];
    localStorage.setItem('inventoryData', JSON.stringify(initialData));
  }
  
  // Function to update the inventory table with data from local storage
  function updateInventoryTable() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const table = document.getElementById('inventoryTable');
  
    while (table.rows.length > 1) {
      table.deleteRow(-1);
    }
  
    for (const item of inventoryData) {
      const row = table.insertRow();
      row.insertCell().innerText = item.name;
      row.insertCell().innerText = item.stock;
      row.insertCell().innerText = `$${item.price.toFixed(2)}`;
    }
  }
  
  // Function to search for items in the inventory table
  function searchInventory() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('inventoryTable');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 1; i < rows.length; i++) {
      const itemName = rows[i].getElementsByTagName('td')[0].innerText.toLowerCase();
      rows[i].style.display = itemName.includes(input) ? '' : 'none';
    }
  }
  
  // Function to add an item to the inventory table and update local storage
  function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
  
    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
      alert('Please enter a valid price and quantity.');
      return;
    }
  
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    inventoryData.push({ name: itemName, stock: itemQuantity, price: itemPrice });
    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
  
    updateInventoryTable();
    document.getElementById('addItemForm').reset();
  }
  
  // Call the updateInventoryTable function on page load to initialize the table
  updateInventoryTable();

// Function to populate the delete item dropdown list
function populateDeleteItemDropdown() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const deleteItemDropdown = document.getElementById('deleteItem');
  
    // Clear the dropdown list
    deleteItemDropdown.innerHTML = '';
  
    for (const item of inventoryData) {
      const option = document.createElement('option');
      option.value = item.name;
      option.innerText = item.name;
      deleteItemDropdown.appendChild(option);
    }
  }
  
  // Function to delete an item from the inventory table and local storage
  function deleteItem() {
    const itemNameToDelete = document.getElementById('deleteItem').value;
  
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const updatedInventoryData = inventoryData.filter(item => item.name !== itemNameToDelete);
    localStorage.setItem('inventoryData', JSON.stringify(updatedInventoryData));
  
    // Update the inventory table and delete item dropdown
    updateInventoryTable();
    populateDeleteItemDropdown();
  }
  
  // Call the updateInventoryTable and populateDeleteItemDropdown functions on page load to initialize the table and dropdown
  updateInventoryTable();
  populateDeleteItemDropdown();

  function createPieChart() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const ctx = document.getElementById('inventoryChart').getContext('2d');
  
    const data = {
      labels: inventoryData.map(item => item.name),
      datasets: [{
        data: inventoryData.map(item => item.stock),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          // Add more colors for more items if needed
        ],
      }]
    };
  
    const options = {
      responsive: true,
    };
  
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  }
  
  // Function to update the pie chart
  function updatePieChart() {
    const inventoryData = JSON.parse(localStorage.getItem('inventoryData'));
    const ctx = document.getElementById('inventoryChart').getContext('2d');
  
    const data = {
      labels: inventoryData.map(item => item.name),
      datasets: [{
        data: inventoryData.map(item => item.stock),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          // Add more colors for more items if needed
        ],
      }]
    };
  
    const options = {
      responsive: true,
    };
  
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });
  }
  
  // Call the createPieChart function on page load to initialize the chart
  createPieChart();