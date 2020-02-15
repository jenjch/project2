# Project 2

CastCall: Podcast Community

# Homework 13 - Banh Mi Log

The aim of this project is to create a Node Express app, using a mySQL database and Handlebars to serve the html page. This app follows the MVC (Model-View-Controller) design pattern and utilizes ORM (Object-Relational Mapping).

## User Story

```
AS A Podcast Listener/Fan
I WANT to be able to find podcasts and sort my favorites 
SO THAT I can use to create collections with my favorites and share it with friends and family

```

## Composition of Application

Once deployed, the app allows users to add names of banh mi, which renders them on the left side of the page along with a "devour" button. Once the devour button is clicked, it will move the banh mi entry to the right side of the page. 

The mySQL database is updated with each action. 

## Process

I followed the MVC design to first set up the folder structure (config, controllers, db, models, public, views, etc.). I then created the standard server.js, connection.js and sql files, and worked on the ORM, models js and controller files. The "Cats App" activity was used as a reference. The front end javascript and handlebars were fleshed out in order to test the application further. I added some validation on both the frontend Javascript and the backend controller to not accept empty entries (only spaces).

The dependencies for the application are listed in the package.JSON file and a gitignore file is used to to skip and prevent upload of the node_modules folder to GitHub. 

The password for the mySQL connection is stored on a separate pw.js file and included in the gitignore file to prevent upload to GitHub. 

Heroku deployment required the setup of a JawsDB remote database and modifying the connection.js file. Procfile was also added to the root directory to resolve Heroku "cannot find module server.js" errors.

## Deployment

The completed application is available for download on Github: 
https://github.com/jenjch/banhMiLog

The deployed application is hosted on Heroku:
https://project2-020420.herokuapp.com/  

## License

MIT license Copyright (c) 2020 
https://choosealicense.com/licenses/mit/ 

