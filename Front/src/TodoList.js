import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, makeStyles, IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  card: {
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  completedIcon: {
    color: 'green',
    
  },
}));


const TodoList = () => {

  const classes = useStyles();
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState('');
  const [todoTime, setTodoTime] = useState('');

  /* ============== Add ToDo List =================*/
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoItem.trim() !== '' && todoTime.trim() !== '') {
      const newTodo = {
        item: todoItem,
        time: todoTime,
      };

     
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((data) => {
          
          setTodoList(data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });

      setTodoItem('');
      setTodoTime('');
    }
  };

 /* ============== Add ToDo List Complete =================*/

  /* ============== Task Complete Checkbox handle =================*/
  const handleCompleteTodo = (completed,id) => {
   
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !completed })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
      setTodoList(data);
       
      })
      .catch(err => console.error('Error updating todo:', err));
  };

    /* ============== Task Complete Checkbox Complete =================*/

  /* ============== Display ToDo List on Load =================*/

  useEffect(() => {
    // Fetch the todo data from the server
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => setTodoList(data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  /* ============== Display ToDo List on Load Complete=================*/


  /* ============== Handle Delete Todos =================*/

  const handleDeleteTodo = (id,index) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    })  
      .catch(err => console.error('Error deleting todo:', err));

    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };
  /* ============== Handle Delete Todos Complete=================*/

  /* ============== Main App Start=================*/
  return (
    <div className={classes.root}>
      <form onSubmit={handleAddTodo}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} sm={6}>

            <TextField
              label="To-Do Item"
              value={todoItem}
              onChange={(e) => setTodoItem(e.target.value)}
              fullWidth
              className={classes.textField}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Time"
              value={todoTime}
              onChange={(e) => setTodoTime(e.target.value)}
              fullWidth
              className={classes.textField}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      {todoList.map((todo, index) => (
        <Card key={index} className={classes.card}>
          <CardContent>
            
            <Typography variant="h6"><b>Task: </b>{todo.item}</Typography>
            <Typography variant="subtitle1"><b>Time: </b>{todo.time}</Typography>
          </CardContent>

       

          <IconButton
      onClick={() => handleCompleteTodo(todo.completed,todo._id)}
      aria-label="Complete"
      disabled={todo.completed}
    >
      <CheckCircleIcon className={todo.completed ? classes.completedIcon : ''}/>{todo.completed ? 'completed ' : ' Incomplete '}
    </IconButton>


          <IconButton
            className={classes.deleteButton}
            onClick={() => handleDeleteTodo(todo._id,index)}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
        </div>
  );
};

export default TodoList;

