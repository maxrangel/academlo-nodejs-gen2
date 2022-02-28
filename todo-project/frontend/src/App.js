import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Components
import Form from './components/form/form.component';
import TodoList from './components/todo-list/todo-list.component';

import './App.css';

const App = () => {
	// State
	const [todos, setTodos] = useState([]);
	const [socket, setSocket] = useState(null);

	const addTodo = async todo => {
		await axios.post(`http://localhost:4000/api/v1/todos`, {
			content: todo.content,
		});

		socket.emit('new-todo', todo);

		setTodos(prevState => [...prevState, todo]);
	};

	const fetchTodos = async () => {
		const res = await axios.get('http://localhost:4000/api/v1/todos');

		const resTodos = res.data.data.todos;
		setTodos(resTodos);
	};

	const editTodo = async (id, newContent) => {
		await axios.patch(`http://localhost:4000/api/v1/todos/${id}`, {
			content: newContent,
		});

		const todoData = { id, newContent };

		socket.emit('updated-todo', todoData);

		updateTodoStateHandler(todoData);
	};

	const deleteTodo = async id => {
		await axios.delete(`http://localhost:4000/api/v1/todos/${id}`);

		socket.emit('delete-todo', id);
		deleteTodosStateHandler(id);
	};

	const updateTodoStateHandler = ({ id, newContent }) => {
		setTodos(prevState => {
			const currentTodos = prevState;

			const todoIndex = currentTodos.findIndex(todo => +todo.id === +id);

			const updatedTodo = currentTodos[todoIndex];

			updatedTodo.content = newContent;

			currentTodos[todoIndex] = updatedTodo;

			return [...currentTodos];
		});
	};

	const deleteTodosStateHandler = id => {
		setTodos(prevState => {
			const currentTodos = prevState;

			const updatedTodos = currentTodos.filter(todo => +todo.id !== +id);

			return [...updatedTodos];
		});
	};

	// When component is mounted, fetch todos
	useEffect(() => {
		// Socket client server
		const socket = io('http://localhost:4000');

		socket.on('broadcast-todos', newData => {
			setTodos(prevState => [...prevState, newData]);
		});

		socket.on('deleted', todoId => {
			deleteTodosStateHandler(todoId);
		});

		socket.on('update', todoData => {
			console.log(todoData);
			updateTodoStateHandler(todoData);
		});

		fetchTodos();
		setSocket(socket);
	}, []);

	return (
		<div className="app">
			<Form onAddTodo={addTodo} />
			<TodoList onDeleteTodo={deleteTodo} onEditTodo={editTodo} items={todos} />
		</div>
	);
};

export default App;
