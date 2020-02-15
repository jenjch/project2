// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const nodemailer = require("nodemailer");

// transporter for email credentials for using nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "podcastAdmn@gmail.com",
    pass: "podcasts2020#"
  }
});

// Routes
// =============================================================
module.exports = function(app) {
  // user routes (and those requiring user information) were built but would be used for next iteration of project

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

  // GET route for finding all collections by user id, return as JSON, with cascading [include:] model, to show Podcast data in the same response
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
              model: db.Podcast
            }
          ]
        }
      ]
    }).then(function(CollectionsData) {
      res.json(CollectionsData);
    });
  });

  //-----------------GET route for getting podcasts based on query parameter Title or Author
  // depending on what radio button is selected on the search page.--------------------------

  app.get("/api/search/:query/:istitle", function(req, res) {
    // findAll returns all entries based on parameter for query
    //in this case looking in table Podcasts for those matching title/author from req.
    console.log(req.params);
    db.Podcast.findAll(
      req.params.istitle === "1"
        ? {
            where: {
              // adds wildcard
              title: {
                [Op.like]: `%${req.params.query}%`
              }
            }
          }
        : {
            where: {
              // adds wildcard
              author: {
                [Op.like]: `%${req.params.query}%`
              }
            }
          }
    ).then(function(dbPodcastTitle) {
      console.log(dbPodcastTitle);
      res.json(dbPodcastTitle);
    });
  });

  // POST route for saving a new collection
  app.post("/api/collections", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Collection.create({
      collection_name: req.body.collection_name,
      description: req.body.description
    }).then(function(dbCollection) {
      res.json(dbCollection);
    });
  });

  //DELETE route to delete a collection - used on the /collections page
  app.delete("/api/collections/:id", function(req, res) {
    // Delete the Collection with the id available to us in req.params.id
    db.Collection.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCollection) {
      res.json(dbCollection);
    });
  });

  // POST for adding a podcast to a specific collection (if you try to add the same one more than once, does not add duplicate, which is good)
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

  // GET for displaying collection info (and any podcasts in them) by id as JSON, with cascading [include:] model, to show Podcast data in the same response - not applied, and using a route in the html-routes instead
  app.get("/api/collections/:id", function(req, res) {
    db.Collection.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.Podcast
          // code below (commented out) is for restricting which columns to send if needed (default is to send all)
          // attributes: ['createdAt', 'startedAt', 'finishedAt'],
          // }
        }
      ]
    }).then(function(podcastData) {
      res.json(podcastData);
    });
  });

  // POST for sending email of collection data with nodemailer
  app.post("/api/send", function(req, res) {
    const mailOptions = {
      // default sender address
      from: "podcastAdmn@gmail.com",

      // pass user entered name and email info with front end POST from collections.js
      to: req.body.enteredEmail,
      subject:
        req.body.enteredName +
        ", here are some Podcast recommendations for you!", // Subject line

      // grabs the handlebars html (could also add bootstrap reference if wanted) from that same front end POST
      html: req.body.collectionBody + "<br> See more at <a href='https://project2-020420.herokuapp.com/collections'> My Podcast Collections</a>!"
    };

    // the response we're sending to front end to check for completion (that email was sent)
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
        res.send("failed");
      } else {
        console.log(info);
        res.send("success");
      }
    });
  });

  // closing bracket for the module.exports function
};
