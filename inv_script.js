// fs for reading file
const fs = require("fs");

function loadInventory() {
    // console.log("loadInventory called");
    // var invString = localStorage.getItem("inventoryList");
    let invString = fs.readFileSync("inventory.json");
    let invList = JSON.parse(invString)
    if (invList) {
        let invTable = document.getElementById("inventoryTable");
        invTable.innerHTML = "<tr>\n" +
            "<th scope=\"col\">Item</th>\n" +
            "<th scope=\"col\">Availability</th>\n" +
            "<th scope=\"col\">Qty</th>\n" + 
            "<th scope=\"col\">Unit Price</th>\n" +
        "</tr>";
        for (let i = 0; i < invList.length; i++) {
            invTable.innerHTML += 
                "<tr><td>" + invList[i].name + "</td>" +
                "<td>" + invList[i].availability + "</td>" +
                "<td>" + invList[i].quantity + "</td>" +
                "<td>" + invList[i].price + "</td></tr>";
        }
    } 
    else {
        // load default inventory
        let defList = [];
        let defItem = { name: "default item", 
                        price: "$0.00",
                        quantity: 0,
                        availability: 'n' };
        defList.push(defItem);
        fs.writeFileSync("inventory.json", JSON.stringify(defList));
    }
}

function addItem() {
    // console.log("Add item called");
    let invString = fs.readFileSync("inventory.json");
    let invList = JSON.parse(invString)
    let nameBox = document.getElementById("add_item_name");
    let priceBox = document.getElementById("add_item_price");

    let exists = false;
    for (let i in invList.lenghth) {
        let invObj = invList[i];
        if (invObj.name == nameBox.value) {
            exists = true;
        }
    }

    if (!exists) {
        let newItem = { name: nameBox.value,
                    price: priceBox.value, 
                    quantity: 0,
                    availability: 'n' };
        invList.push(newItem);
        let newInvString = JSON.stringify(invList);
        fs.writeFileSync("inventory.json", JSON.stringify(invList));
        console.log("Added item: " + nameBox.value);
    }
    loadInventory();
}