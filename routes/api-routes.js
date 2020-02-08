
// JC - may want to import this connection set up in the config file for path below
let connectionConfig = require("../config/config.JSON")
let connectObj = JSON.parse(connectionConfig);
// JSON.parse to convert jSON string to javascript
// i.e use connectObj.development (but make sure to update the password to not "null"!) in config file as path for testing on local connection.
// don't think you need to add multiple const path = since it was giving an already defined variable type error after starting with node 


// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
const Sequelize = require('sequelize');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the users
  app.get("/api/user", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbUser) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbUser);
    });
  });



// POST route for saving a new User
app.post("/api/user", function(req, res) {
  console.log(req.body);
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
  db.User.create({
    username : req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }).then(function(dbUser) {
    // We have access to the new todo as an argument inside of the callback function
    res.json(dbUser);
  });
});

   // POST route for saving a new collection
   app.post("/api/collection", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Collection.create({
      user_id : req.body.user_id,
      collection_name: req.body.collection_name,
      description: req.body.description
    }).then(function(dbCollection) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCollection);
    });
  });

   // POST route for saving a new podcast
   app.post("/api/podcast", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Podcast.create({
      title: req.body.title,
      description : req.body.description,
      artist : req.body.artist,
      podcastURL : req.body.podcastURL,
      artworkURL : req.body.artworkURL,
      itunes_id : req.body.itunes_id,
      author : req.body.author,
      imageURL : req.body.imageURL

    }).then(function(dbPodcast) {
      // We have access to the new Podcast as an argument inside of the callback function
      res.json(dbPodcast);
    });
  });


 // the async function showCollectionUser will identify the collections belonging to specific usernames
const path = 'mysql://user12:12user@localhost:3306/mydb';
const sequelize = new Sequelize(path, {
    operatorsAliases: false,
    logging: false
});

let User = sequelize.define('user', {
    username: Sequelize.STRING
});

let Collections = sequelize.define('collections', {
    description: Sequelize.STRING
});

User.hasMany(Collections);
Collectioins.belongsTo(User);

async function showCollectionUser() {

    let collection = await Collectioins.findOne({ include: [User] });

    console.log(`${collections.collection_name} belongs to ${User.username}`);

    sequelize.close();
}

showCollectionUser();

//---------------------------------------------------
  //test api route
  const path = 'api/collection';
  
  const sequelize = new Sequelize(path, {
      operatorsAliases: false,
      logging: false
  });
  
  let Note = sequelize.define('notes', {
      description: Sequelize.STRING
  });
  
  Collection.findById(req.body.id).then((note) => {
      console.log(note.get({ plain: true }));
      console.log('********************')
      console.log(`id: ${note.id}, description: ${note.description}`);
  }).finally(() => {
      sequelize.close();
  });


  // DELETE route for deleting Collection. We can get the id of the collectioin we want to delete from
  // req.params.id
  app.delete("/api/collection/:id", function(req, res) {

  });

  // PUT route for updating Collection. We can get the updated Collection from req.body
  app.put("/api/collection", function(req, res) {

  });
};
