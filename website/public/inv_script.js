window.onload = function () {

    loadItems();

    const form = document.getElementById("add_item_form");
    clearButton = document.getElementById("clear_inventory_button");

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submission
        
        const formData = new FormData(form);
        const urlData = new URLSearchParams(formData);

        // console.log("fetching /add_item with data: " + urlData);

        fetch('/add_item', {
            method: 'POST',
            body: urlData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.item);
        })
        .catch(error => {
            console.log(error);
        });
        
        loadItems();

    });

}

function loadItems() {
    // get items from inventory.json and fill the table with them
    
    fetch('/get_inventory', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showItems(data);
    })
    .catch(error => {
        console.log(error);
    });

}

function showItems(inventory) {
    const table = document.getElementById("inventoryTable");

    table.innerHTML = "<tr><th scope=\"col\">Item</th><th scope=\"col\">Availability</th><th scope=\"col\">Qty</th><th scope=\"col\">Unit Price</th></tr>"

    for (let i = 0; i < inventory.length; i++) {
        table.innerHTML += 
            "<tr><td>" + inventory[i].name + "</td>" +
            "<td>" + inventory[i].availability + "</td>" +
            "<td>" + inventory[i].quantity + "</td>" +
            "<td>" + inventory[i].price + "</td></tr>";
    }
}

function clearInventory() {
    fetch('/clear_inventory', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
    loadItems();
}