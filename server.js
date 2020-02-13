//  This file is the initial starting point for the Node/Express server.

// Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// helper function for using {{inc @index}} in collections page to index each podcast entry. Helper needed to start at 1 instead of 0
// https://stackoverflow.com/questions/22103989/adding-offset-to-index-when-looping-through-items-in-handlebars
var Handlebars = require('handlebars');

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// add additional routes for api as needed

// Syncing our sequelize models and then starting our Express app
// =============================================================

// removed ({ force: true }) from db.sequelize.sync to not drop tables (like our seeded database one) once the server is restarted. Need to double check it doesn't have unintended consequences
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});