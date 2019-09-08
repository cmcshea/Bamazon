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

function menuOptions() {
    inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]);

}

// function runSearch() {
//     connection.query("SELECT * FROM products", function (err, data) {
//         if (err) throw err;
//         console.table(data)
//         // BuyOrSell(data)
//     })
// };