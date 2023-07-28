const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, function() {
  console.log("Listening on port 3000...");
});

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // Add this line to parse JSON data

app.post("/update_inventory", function (req, res) {
  const in_inventory = req.body.inventory;

  // Write the inventory to the file.
  fs.writeFileSync("inventory.json", in_inventory, "utf8");

  // Log whether or not the write was successful.
  if (fs.existsSync("inventory.json")) {
    res.send(JSON.stringify("Order placed successfully!"));
  } else {
    res.send(JSON.stringify("Error placing order"));
  }
});

app.get("/get_inventory", function (req, res) {
  let inventory;
  try { inventory = fs.readFileSync("inventory.json", "utf8"); }
  catch {}

  // If the file does not exist, send an empty array.
  if (!inventory) {
    inventory = "[]";
  }

  res.send(inventory);
});
