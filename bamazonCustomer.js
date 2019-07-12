//install MySQL and Inquirer npm packages (after npm init is ran)
var mysql = require("mysql");
var inquirer = require("inquirer");



//connect to MySQL

//Run app in order to display all items for sale, including id, name, and prices

//prompt user with 2 messages:
//1) ask them ID of product they would like to buy
//2) ask how many units they would like to buy

//Once order is placed, app checks if store has enough in stock (from stock_quantity)
//if not, display "Insufficent quantity!" and prevent order from going through

//If enough in stock, update SQL database to reflect remaining quantity

//When purchase is complete, show customer total cost