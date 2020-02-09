
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the routes just handles the HTML page that the user gets sent to. Can be edited as we name/define the different handlebar pages
  
  //home route (with options/navigations for seach podcasts/create collections vs. view/search collections) 
  // can rename the url paths however we want (the name inside render is the name of the handlebars file)
  app.get("/", function(req, res) {
    return res.render("index");
  });

  //search podcasts/create collections page
  // can rename the url paths however we want (the name inside render is the name of the handlebars file)
  app.get("/podcasts", function(req, res) {
    return res.render("podcasts");
  });

  //view/search collections page
   // can rename the url paths however we want (the name inside render is the name of the handlebars file)
  app.get("/collections", function(req, res) {
    return res.render("collections");
  });

  //view/search page
   // can rename the url paths however we want (the name inside render is the name of the handlebars file)
  app.get("/search", function(req, res) {
    return res.render("search");
  });


};
