function loadInventory() {
    // console.log("loadInventory called");
    var invList = localStorage.getItem("inventoryList");
    if (invList) {
        let invTable = document.getElementById("inventoryTable");
        for (let i = 0; i < invList.length(); i++) {
            invTable.innerHTML += 
                "<tr><td>" + invList[i].name + "</td>" +
                "<td>" + invList[i].availability + "/<td>" +
                "<td>" + invList[i].quantity + "</td>" +
                "<td>" + invList[i].price + "</td></tr>";
        }
    }
}

function addItem() {
    // console.log("Add item called");
    var invList = localStorage.getItem("inventoryList");
    let nameBox = document.getElementById("add_item_name");
    let priceBox = document.getElementById("add_item_price");
    if (!invList) {
        localStorage.setItem("inventoryList", []);
    }

    const nameCheck = (jsonObject) => jsonObject.name === nameBox.value

    if (! invList.some(nameCheck)) {
        invList.push("{ name: " + nameBox.value + 
                    ", price: " + priceBox.value + 
                    ", quantity: 0, availability, n}")
    }
    loadInventory();
}