let selectedItems = []; // an array of items with their checkbox ticked (handleChecboxClick)
let localInventory = [];     // whenever loadItems() is called, take the chance to store the response locally
let actionsErrors;

window.onload = function () {

    loadItems();

    // Once the page is loaded, assign variables from elements here
    actionsErrors = document.getElementById("actions_errors");
    const addItemForm = document.getElementById("add_item_form");
    const orderMoreForm = document.getElementById("order_more_form");
    const quantityAdjustmentForm = document.getElementById("quantity_adjustment_form");
    const priceAdjustmentForm = document.getElementById("price_adjustment_form");

    // listener event for add_item_form
    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submission
        
        const formData = new FormData(addItemForm);
        // const urlData = new URLSearchParams(formData);
        
        // make sure the item doesn't exist (at least locally)
        let exists = false;
        for (let i = 0; i < localInventory.length; i++) {
            if (localInventory[i].name == formData.get("item_name")) {
                exists = true;
            }
        }

        // if the item does not exist, add the item
        if (!exists) {
            localInventory.push({ name: formData.get("item_name"),
                                price: formData.get("item_price"),
                                status: "Not available",
                                quantity: 0,
                                ordered: 0,

                                });
            updateItems();
        }
        else {
            // if it does exist, show the error in the error section of the page
            actionsErrors.innerHTML = "Error adding " + formData.get("item_name") + ", item already exists";
        }

    });

    orderMoreForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submission
        
        const formData = new FormData(orderMoreForm);
        let amount = formData.get("order_amt");
        for (let i = 0; i < selectedItems.length; i++) {
            for (let j = 0; j < localInventory.length; j++) {
                if (selectedItems[i] == localInventory[j].name) {
                    localInventory[j].ordered = amount;
                    break;
                }
            }
        }
        selectedItems = [];
        updateItems();
    });

    quantityAdjustmentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submission
       
        const formData = new FormData(quantityAdjustmentForm);
        let amount = formData.get("quantity_num");
        for (let i = 0; i < selectedItems.length; i++) {
            for (let j = 0; j < localInventory.length; j++) {
                if (selectedItems[i] == localInventory[j].name) {
                    localInventory[j].quantity = amount;
                    break;
                }
            }
        }
        selectedItems = [];
        updateItems();
    });

    priceAdjustmentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent default form submission
        
        const formData = new FormData(priceAdjustmentForm);
        let amount = formData.get("price_num");
        for (let i = 0; i < selectedItems.length; i++) {
            for (let j = 0; j < localInventory.length; j++) {
                if (selectedItems[i] == localInventory[j].name) {
                    localInventory[j].price = amount;
                    break;
                }
            }
        }
        selectedItems = [];
        updateItems();
    });

}

// send localInventory to the server to update inventory.json
function updateItems() {

    const requestBody = {inventory: JSON.stringify(localInventory)};
    // console.log("Stringified: " + localInventoryString);
    const urlData = new URLSearchParams(requestBody);

    // console.log(urlData);

    fetch('/update_inventory', {
        method: "POST",
        body: urlData,
      })
    .then(response => response.json())
    .then(data => {
        console.log("Updated inventory");
    })
    .catch(error => {
        console.log(error);
    });

    loadItems();

}

function loadItems() {
    // fetch items from inventory.json and call showItems with the response
    fetch('/get_inventory', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data != "") {
            localInventory = data;
        }
        showItems(data);
    })
    .catch(error => {
        console.log(error);
    });

}

function showItems(inventory) {
    const table = document.getElementById("inventoryTableBody");
    const selectedItemRow = document.getElementById("selected_item_row");

    table.innerHTML = "";

    for (item of inventory) {
        let row = "<tr><td>" + 
        "<input type=\"checkbox\" value=\"" + item.name + "\"/>" + item.name + "</td>" +
        "<td>" + item.availability + "</td>" +
        "<td>" + item.quantity + "</td>" +
        "<td>" + item.price + "</td></tr>";
        table.innerHTML += row;
    }

    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    console.log(checkboxes);
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", handleCheckboxClick);
    }
    if (selectedItems.length == 0) {
        selectedItemRow.hidden = true;
    }

}

function clearInventory() {

    localInventory = [];
    selectedItems = [];
    updateItems();

}

function handleCheckboxClick(event) {

    let selectedItemRow = document.getElementById("selected_item_row");

    // Get the value of the checkbox that was clicked.
    const checkbox = event.target;
    const value = checkbox.value;
  
    // If the checkbox is checked, add the value to the array of items.
    if (checkbox.checked) {
        console.log("Selected " + value)
        selectedItems.push(value);
    } else {
        // If the checkbox is unchecked, remove the value from the array of items.
        console.log("De-selected " + value)
        selectedItems.splice(selectedItems.indexOf(value), 1);
    }
    console.log("Selected items: " + selectedItems);
    if (selectedItems.length == 0) {
        selectedItemRow.hidden = true;
    }
    else {
        selectedItemRow.hidden = false;
    }
}

function removeItem() {
    for (let i = 0; i < selectedItems.length; i++) {
        for (let j = 0; j < localInventory.length; j++) {
            if (selectedItems[i] == localInventory[j].name) {
                localInventory.splice(j, 1);
                break;
            }
        }
    }
    selectedItems = [];
    updateItems();
}

