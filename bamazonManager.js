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
    runSearch();
});

function runSearch() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        // console.table(data)
        menuOptions(data)
    })
};

//Asking the manager to choose an option

function menuOptions() {
    inquirer
        .prompt([
          {
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
        console.log("Products for Sale:")
        
        connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.table(data)

    });
};

function lowInventory() {
    console.log("Products with Low Inventory:")

    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        for(var i = 0; i < data.length; i++) {
            if(data[i].stock_quantity <=5){
                console.table(data[i])
            };
        };
    });
};

function addInventory() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "inventory",
        message: "Add more",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

    }])
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;

        for(var i = 0; i < data.length; i++) {
            if(data[i].stock_quantity <=5){
                console.table(data[i])
            };
        };
    });
};