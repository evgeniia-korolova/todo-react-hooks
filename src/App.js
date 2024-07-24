
import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import AddTodo from './Components/AddTodo/AddTodo';
import TodoList from './Components/TodoList/TodoList';
import './App.css';


function App() {

	const [todos, setTodos] = useState([]);
	
	 useEffect(() => {
			const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
			setTodos(savedTodos);
		}, []);

 
  return (
		<div className='App'>
			<Header />
			<h2>All tasks : {todos.length}</h2>
			<AddTodo
				todos={todos}
				setTodos={setTodos}
			/>

			<TodoList
				todos={todos}
				setTodos={setTodos}
			/>
		</div>
  );
}

export default App;
