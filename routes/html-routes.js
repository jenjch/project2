// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the routes handles the HTML page that the user gets sent to. Can rename the url paths however we want (the name inside render is the name of the handlebars file)

  //home route (which can navigate to seach podcasts vs. collections page via handlebars)
  app.get("/", function(req, res) {
    return res.render("index");
  });

  //collections page (all data loads upon page load, can send email and delete collection - routes in api-routes file)
  app.get("/collections", function(req, res) {
    // to use handlebars to display data, made this an html-route. Will load all Collections
    db.Collection.findAll({
      include: [
        {
          // podcast data in Collections available
          model: db.Podcast
        }
      ]
    }).then(function(dbCollectionsData) {
      const data = {
        // going to pass the dbCollectionsData results to the render for handlebars (results as key)
        // would show all Collections and Podcast data (designated col data)
        // map gets rid of the sequelize metadata that messes things up
        results: dbCollectionsData.map(result => result.get({ plain: true }))
      };
      console.log(data);
      return res.render("collections", data);
    });
  });

  //search page (which allows dispy of results and adding of podcasts to createdcollection)
  app.get("/search", function(req, res) {
    return res.render("search");
  });
};
