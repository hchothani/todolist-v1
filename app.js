const express = require("express");
const https = require("https");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

var items = [];
let workItems = [];

app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

let day = date.getDate();

  res.render("list.ejs", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  console.log(req.body);
  let item = req.body.newItem;

if(req.body.submit === "Work"){
  workItems.push(item);
  res.redirect("/work");
}
else{
  items.push(item);
  res.redirect("/")
}

})

app.get("/work", function(req, res) {
  res.render("list.ejs", {
    listTitle: "Work",
    newListItems: workItems
  });
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about.ejs")
})

app.listen(3000, function() {
  console.log("Server Started");
});
