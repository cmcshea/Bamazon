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
    // console.log("Connected at: " + connection.threadId);
    menuOptions();
});

//Asking the manager to choose an option

function menuOptions() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (answers) {
        switch(answers.menu){
        case "View Products for Sale": productsForSale();
        break;
        case "View Low Inventory": lowInventory();
        break;
        case "Add to Inventory": addInventory();
        break;
        case "Add New Product": addProduct();
        }
    });
};

function productsForSale(){
        connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data)
        // BuyOrSell(data)
    });
};

// function runSearch() {
//     connection.query("SELECT * FROM products", function (err, data) {
//         if (err) throw err;
//         console.table(data)
//         // BuyOrSell(data)
//     })
// };