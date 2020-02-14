
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");


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

    // to use handlebars, moved route to html-routes file 

    db.Collection.findAll({

      include: [
        {
          model: db.Podcast
        }
      ]
    })
    .then(function(dbCollectionsData) {
      const data = {
        // going to pass the dbCollectionsData results to the render for handlebars (results as key)
        // would show all collections results (all col data)
        // map gets rid of the sequelize metadata that messes things up
        results: dbCollectionsData.map(result=>result.get({plain:true}))
      };
      console.log(data);
      return res.render("collections", data);
    });
  });

  //view/search page
   // can rename the url paths however we want (the name inside render is the name of the handlebars file)
  app.get("/search", function(req, res) {
    return res.render("search");
  });


};
