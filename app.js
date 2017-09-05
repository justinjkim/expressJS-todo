const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const tasks = [
  "call the doctor",
  "renew license plate"
]

const finished = [
  "print flyers",
  "register at DMV",
  "eat hot cheetos"
]

const app = express();

// use mustache engine
app.engine('mustache', mustacheExpress());

// hmm, what's diff b/w this and app.engine?
app.set('view engine', 'mustache');

app.set('views', './views');
app.set(express.static(__dirname + '/public'));

// app.use? specific for packages?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.render('index', {tasks, finished});
});

app.post('/', function(req, res) {
  let todo = req.body.todo;
  console.log(todo);
  tasks.push(' ' + todo);
  console.log(tasks);
  res.redirect('/');
});

app.post('/done', function(req, res) {
  let done = req.body.done;
  console.log(done);
  finished.push(done);
  console.log(finished);
  tasks.pop(this);
  res.redirect('/');
})

app.listen(3000, function(req, res) {
  console.log('Starting up Todo List app...');
});
