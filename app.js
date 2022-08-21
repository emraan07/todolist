const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// list of items
var listOfItems = [];
var workList = [];
// day of the week
// const date = new Date();
// const options = {
//     weekday : "long",
//     // year : "numeric",
//     month : "long",
//     day : "numeric" 
// }

// const today = date.toLocaleDateString("en-US", options)
// home route
app.get("/", function(req, res) {
    const day = date.getDate()
    res.render("list", {listTitle : day, newItem: listOfItems});
})
// work route
app.get("/work", function(req, res) {
    res.render("list", {listTitle : "Work List", newItem : workList})
})

// about route
app.get("/about", function(req, res) {
    res.render("about")
})
// contact route
app.get("/contact", function(req, res) {
    res.render("contact")
})
// form
app.post("/", function(req, res) {
    var item = req.body.item;
    if(req.body.list === "Work"){
        workList.push(item);
        res.redirect("/work")
    }else{
        listOfItems.push(item);
        res.redirect("/")
    }
    
})
app.listen(process.env.PORT || 3000, function() {
    console.log("Server running on port 3000");
})