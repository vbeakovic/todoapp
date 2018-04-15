# Intro

This is a node.js project that is part of the [Projects in ExpressJS Video](https://www.packtpub.com/web-development/projects-expressjs-video) course published by [Pack publishing](https://www.packtpub.com/)

# Differences

* Using yarn instead of bower

  * since yarn installed bootstrap, jquery and popper a bit differently than bower (as node modules) I took a different approach
    to reference the libraries. See app.js, header.ejs and footer.ejs for details for details [used this question and answers from Stackoveflow as reference] (https://stackoverflow.com/questions/26773767/purpose-of-installing-twitter-bootstrap-through-npm/35580597#35580597)
  
* to connect to MongoDB had to change the sintax

  * from db = database;
  * to  db = database.db('todoapp');
