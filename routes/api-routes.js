// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
// const Sequelize = require('sequelize');

// Routes
// =============================================================
module.exports = function(app) {
// Andre's original routes start here, need to be tested and/or modified based on sequelize methods or response data needed - Jenny
// These routes are still under test ! See routes in the bottom for those tested by JC and Russel

// 6 routes tested - Andre Barreto 02/09

/////////////////////  PLEASE DONT DELETE ANY COMMENTED OUR ROUTES, I AM WORKING ON THEM AND WILL CLEAN UP CODE LATER> TKS
 
 // POST route for creating a new User
 app.post("/api/user", function(req, res) {
  console.log(req.body);
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
  db.User.create({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }).then(function(dbUser) {
    // We have access to the todo dbUser as an argument inside of the callback function
    res.json(dbUser);
  });
});


//DELETE route to delete a user based on user id
app.delete("/api/user/:id", function(req, res) {
  // Delete the User with the id available to us in req.params.id
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});


  // GET route for getting users based on username
  app.get("/api/user/:username", function(req, res) {
    // Find one User with the id in req.params.id and return them to the user with res.json
    console.log(req.body);
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // GET route for getting podcasts based on query parameter Title
  app.get("/api/search/:title", function(req, res) {
    
    // findAll returns all entries based on parameter for query
    //in this case looking in table Podcasts for those matching title from req.
    db.Podcast.findAll({
      where: {
        title: req.params.title
      },
    })
      .then(function(dbPodcastTitle) {
        res.json(dbPodcastTitle);
      });
  });
  //end of GET route for podcasts based on title


  // GET route for getting podcasts based on query parameter Author
  app.get("/api/searchau/:author", function(req, res) {
    
    // findAll returns all entries based on parameter for query
    //in this case looking in table Podcasts for those matching author from req.
    db.Podcast.findAll({
      where: {
        author: req.params.author
      },
    })
      .then(function(dbPodcastAuthor) {
        res.json(dbPodcastAuthor);
      });
  });
  //end of GET route for podcasts based on Author



 

  // POST route for saving a new collection to a specific user
  // as per Russel's request this route will be left for later due to the need of username entered  and clarifications
  //Do not use yet
  app.post("/api/collections", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Collection.create({
      // deleted this because foreign key taken care of by sequelize
      // user_id : req.body.user_id,
      collection_name: req.body.collection_name,
      description: req.body.description
    })
      .then(function(dbCollection) {

        //Russell's rec at the start of class to add, need to clarify
        dbCollection.addUser(req.body.enteredUsername);
        // need to do a find to match userId
      })

      .then(function(dbCollection) {
        // We have access to the new one as an argument inside of the callback function
        res.json(dbCollection);
      });
  });


  
// tested in Postman 2/10 - Jenny 
// for finding all collections by user id, return as JSON, with cascading [include:] model, to show Podcast data in the same response
app.get("/api/:user/collections", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.user
      },
      include: [
        {
          model: db.Collection,
          
          include: [
            {
              model: db.Podcast,
            }
          ]
        }
      ]
    }).then(function(CollectionsData) {
      res.json(CollectionsData);
    });
  });


  // 2 new API routes below created and tested in Postman 2/8 - Jenny

  // for adding a podcast for a specific collection (if you try to add the same one more than once, seems to not create duplicate, which is good)
  app.post("/api/collections/:collectionid/add/:podcastid", function(req, res) {
    console.log(req.body);
    var foundPodcast;
    var foundCollection;

    // purpose of route is to add a podcast to a collection and establish association from podcast to the collection
    // need to find collection from :id
    // need to know what podcast we're adding, and associate collection with a podcast
    db.Collection.findOne({
      where: {
        // use .params if it's in url, .body is the object that's send along with request
        id: req.params.collectionid
      }
    }).then(function(colData) {
      foundCollection = colData;
      db.Podcast.findOne({
        where: {
          id: req.params.podcastid
        }
      }).then(function(podData) {
        foundPodcast = podData;

        if (foundPodcast && foundCollection) {
          // Podcast part of "addPodcast" sequelize method is table name
          foundCollection
            .addPodcast(foundPodcast)

            .then(function() {
              res.send("added podcast to collection");
            });
        }
      });
    });
  });

  // displays collection info (and any podcasts in them) by id as JSON
  app.get("/api/collections/:id", function(req, res) {
    db.Collection.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Podcast
          // code below (currently commented out) is for determining which columns exactly to show in displayed podcast data. Need to read sequelize documentation for how to use
          // through: {
          // attributes: ['createdAt', 'startedAt', 'finishedAt'],
          // }
        }
      ]
    }).then(function(podcastData) {
      res.json(podcastData);
    });
  });
// closing bracket for the module.exports function
};
