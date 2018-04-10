const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const bodyParser = require('body-parser');

// Port
const port = 3000;
// Mongo path
const url = 'mongodb://localhost:27017/todoapp';

// Initialize app
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// View setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to mongodb
MongoClient.connect(url, (err, database) => {
  if (err) throw err;
  console.log('MongoDB connected...');

  //db = database;
  db = database.db('todoapp');
  Todos = db.collection('todos');
  app.listen(port, () => {
    console.log('Server running on port ' + port);
  });
})

app.get('/', (req, res, next) => {
  Todos.find({}).toArray((err, todos) => {
    if (err) {
      return console.log(err);
    }
    console.log(todos);
    res.render('index', {
      todos: todos
    });
  });
});
