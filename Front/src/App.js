
import './App.css';
import { Button, Container, } from '@material-ui/core';
import Navbar from './Navbar';
import Todo from './TodoList';

function App() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  return (
   <>
   <Navbar/>
   
   <Container maxWidth="md">
   <h1 className="title">Today's Date</h1>
      <p className="date">{formattedDate}</p>
   <Todo/>
    </Container>
   </>
  );
}

export default App;
