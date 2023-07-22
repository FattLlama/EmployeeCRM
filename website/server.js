const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, function() {
    console.log("Listening on port 3000...");
});

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.post("/update_inventory", function (req, res) {

  const in_inventory = req.body.inventory;

  console.log("Received inventory:", in_inventory);

    // Write the inventory to the file.
    fs.writeFileSync("inventory.json", in_inventory, "utf8");
  
    // Log whether or not the write was successful.
    if (fs.existsSync("inventory.json")) {
      res.send(JSON.stringify("Item added successfully"));
    } else {
      res.send(JSON.stringify("Error adding item"));
    }
    

});

app.get("/get_inventory", function (req, res) {
  
  let inventory;
  try { inventory = fs.readFileSync("inventory.json", "utf8"); }
  catch {}

  // If the file does not exist, send an empty array.
  if (!inventory) {
    inventory = [];
    inventory = JSON.stringify(inventory);
  } 

  res.send(inventory);
});

/*

app.post("/add_item", function (req, res) {
    const itemName = req.body.item_name;
    const itemPrice = req.body.item_price;
  
    // Create a new JSON object for the item.
    let item = {
      name: itemName,
      price: itemPrice,
      availability: "Not available",
      quantity: 0,
    };
  
    // Read the inventory.json file.
    let inventory;
    try { inventory = fs.readFileSync("inventory.json", "utf8"); }
    catch {}

    // If the file does not exist, create a new file.
    if (!inventory) {
      inventory = [];
    } 
    else {
        inventory = JSON.parse(inventory);
    } 

    // Add the new item to the inventory.
    inventory.push(item);
  
    // Write the inventory to the file.
    fs.writeFileSync("inventory.json", JSON.stringify(inventory), "utf8");
  
    // Log whether or not the write was successful.
    if (fs.existsSync("inventory.json")) {
      res.send(JSON.stringify("Item added successfully"));
    } else {
      res.send(JSON.stringify("Error adding item"));
    }
});

app.get("/get_inventory", function (req, res) {
  
    let inventory;
    try { inventory = fs.readFileSync("inventory.json", "utf8"); }
    catch {}

    // If the file does not exist, create a new file.
    if (!inventory) {
      inventory = [];
      inventory = json.stringify(inventory);
    } 

    res.send(inventory);
});

app.get("/clear_inventory", function (req, res) {
    fs.writeFileSync("inventory.json", "[]", "utf8");
    res.send(JSON.stringify("Cleared inventory"));
});
*/