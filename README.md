# Project 2

CastCall: Podcast Community

The aim of this project is to create a Node Express app, using a Sequelize ORM (Object-Relational Mapping), mySQL database, Handlebars, as well as an additional npm or third party API. This app follows the MVC (Model-View-Controller) design, utilizes Bootstrap and npm Nodemailer, and is deployed on Heroku.

## User Story

```
AS A Podcast Listener/Fan
I WANT to be able to find and explore podcasts 
SO THAT I can create collections with my favorites and share them with friends and family

```

## Composition of Application

The application is composed of 3 pages, a home/create collection page, a search podcasts/add to collection page, and a view collections page. The home page prompts the user to create a collection with name and description, and then redirects them to the podcast search page where they can search by Title or Author, and add various podcast results to the collection they just created. Once they are done, they can navigate to the view collections page, where they are able to browse all created collections, send collection data to a friend via email, and delete collections. 

The JawsDB database is seeded with specifically curated 1500+ entries of podcasts.The database is also updated with each user action (GET/POST/DELETE).  

## Process
dependencies:
    "axios": "^0.19.2",
    "eslint": "^6.8.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "fs": "0.0.1-security",
    "mysql2": "^2.1.0",
    "nodemailer": "^6.4.2",
    "path": "^0.12.7",
    "sequelize": "^5.21.4",
    "sequelize-cli": "^5.5.1"

Break down of roles and tasks (which evolved and changed through the process) to complete the deployed application -

Jenny : Server configuration of app from structure/primary files to Heroku deployment. Worked on back-end models, api-routes/html-routes to send/get data, and front-end JS, Handlebars, Bootstrap to display collections data. Implemented Nodemailer.

Andre : Created DB Models, seeders, and curated our API with over 1,500 podcasts from several sources. Worked on back-end (api-routes and JS) to manipulate and display data from databases.

Nathan : Responsible for front-end design of the website. Used HTML, CSS/Bootstrap, Handlebars, JS to display and manipulate query results.

Cohen : Worked in tandem with Nathan to help maintain a cohesive look with the use of CSS.

## Challenges

There are not many podcast APIs out there. We curated API data ourselves (since we were rejected for an API key due to rigid rules), plus we liked the idea of curating our own seeder database. Formatting and importing to the database proved difficult and generated many errors in the process.

Working through the sequelize models and correcting it to make sure it created the joined tables and associations we wanted required more attention than expected.

Paring down our scope earlier based on our concept, group goals, set backs, individual time constraints/availability/comfort with using and learning the technologies, and with troubleshooting would have been beneficial. During the concept stage, it is crucial to research/define specifically what is possible to achieve within project and group parameters.

As a result, some prep work was not implemented that would be used for future iterations of the application.

## Future Development

1. Utilize our User model/associations and Passport to allow session authentication.
2. Continue to add dynamic functionality to create, search, and share collections, including an     option to add others’ collections to your own profile. 
3. Enhanced UI/UX to support the iterative functionality of the app.
4. Add social media sharing options to promote the application.
5. Continue to curate podcast data to grow database and expand exploration of new podcasts.

## Deployment

The completed application is available for download on Github: 
https://github.com/jenjch/project2

The deployed application is hosted on Heroku:
https://project2-020420.herokuapp.com/  

## License

MIT license Copyright (c) 2020 
https://choosealicense.com/licenses/mit/ 

