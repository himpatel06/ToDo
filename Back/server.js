const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const todoSchema = new mongoose.Schema({
  item: String,
  time: String,
  completed: {
    type: Boolean,
    required: true
  },
});


const Todo = mongoose.model('Todo', todoSchema);

const sendTodo = [];

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(500).send(err));
});
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});
app.post('/todos', (req, res) => {
  const { item, time } = req.body;
 /* const newTodo = {
    item,
    time,
  };*/
 // sendTodo.push(newTodo);
//  res.json(newTodo);


  const todo = new Todo({ item, time,completed: false });
  todo.save()
    .then(() => {console.log("data entered!");
    Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(500).send(err));
  })
    .catch(err => res.status(500).send(err));

});



app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  Todo.findByIdAndUpdate(id, { completed }, { new: true })
    .then(()=> {
      Todo.find()
      .then(todos => res.json(todos))
      .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});


  

app.listen(5000, () => {
  console.log('Server started on port 3000');
});
