//install MySQL and Inquirer npm packages (after npm init is ran)
var mysql = require("mysql");
var inquirer = require("inquirer");


//create mysql connection object
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: 'Cmac@1983',
    database: "bamazon_db"
})

//connect to MySQL
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected at: " + connection.threadId);
    runSearch();
});

function runSearch() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data)
        BuyOrSell(data)
    })
};

function BuyOrSell(dbData) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "itemId",
                message: "What Item Id would you like to purchase?",
                validate: function (val) {
                    return !isNaN(val)
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: function (val) {
                    return !isNaN(val)
                },
            }

        ]).then(function (answers) {
            console.log(answers)
            // lowerInventory(dbData, custOrder) {
            var orderId = answers.itemId;
            var stockInfo = getItemfromDb(dbData, orderId);
            var stockQuantity = stockInfo.stock_quantity;
            var name = stockInfo.product_name;
            var price = stockInfo.price * 1;
            var purchaseQuantity = answers.quantity * 1;
            var totalPrice = price * purchaseQuantity;
            // var item = getItemfromDb(dbData, id);
            // console.log(price);
            // console.log(totalPrice);
            // console.log(purchaseQuantity)


            // }

            if (stockQuantity >= parseInt(purchaseQuantity)) {
                console.log("Your total for " + "(" + purchaseQuantity + ")" + " - " + name + " is:" + " $" + totalPrice);
                var changedValue = stockQuantity - purchaseQuantity;
                console.log("changedVal:  ", changedValue)
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: changedValue },
                    { item_id: orderId }
                ], function (err, res) {
                    if (err) throw err;
                    runSearch()
                });

            } else {
                console.log("Not enough in inventory");
                runSearch()
            }
            // connection.end();
        })

}

function getItemfromDb(dbData, id) {
    var item;
    for (var i = 0; i < dbData.length; i++) {
        // console.log("ID:  ", id);
        // console.log("i:  ", i);
        // console.log(i===id);
        if (dbData[i].item_id === parseInt(id)) {
            item = dbData[i]
        }
    }
    // console.log("ITEM:", item);
    return item;
}
