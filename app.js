const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
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

app.post('/todo/add', (req, res, next) => {
  const todo = {
    text: req.body.text,
    body: req.body.body
  };
  Todos.insert(todo, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo Added...');
  });
  res.redirect('/');
});

app.delete('/todo/delete/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)};
  Todos.deleteOne(query, (err, response) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo Removed');
    res.sendStatus(200);
  });
});

app.get('/todo/edit/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)};
  Todos.find(query).next((err, todo) => {
    if (err) {
      return console.log(err);
    }
    res.render('edit', {
      todo: todo
    });
  });
});

app.post('/todo/edit/:id', (req, res, next) => {
  const query = {_id: ObjectID(req.params.id)};
  const todo = {
    text: req.body.text,
    body: req.body.body
  };
  Todos.updateOne(query, {$set:todo}, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo Updated...');
  });
  res.redirect('/');
});
