"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("./../models/todo");
const TODOS = [
    { id: '1', text: "Complete Course" },
    { id: '2', text: "Go to the gym" },
    { id: '3', text: "Pick up guest at 6AM" },
    { id: '4', text: "Complete pending works" },
];
//----------Create Todo---------------------------------------
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo((TODOS.length + 1).toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Create todo successfully", createTodo: newTodo });
};
exports.createTodo = createTodo;
//----------Show Todos---------------------------------------
const getTodos = (req, res, next) => {
    res.json({ todo: TODOS });
};
exports.getTodos = getTodos;
//----------Update Todo---------------------------------------
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    if (updatedText.trim().length === 0) {
        // throw new Error('Enter Something...')
        res.json({ message: 'Enter Something...' });
    }
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        // throw new Error ('Could not found todo!');
        res.json({ message: 'Could not found Todo!' });
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
//----------Delete Todo---------------------------------------
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        // throw new Error('Could not found todo!');
        res.json({ message: 'Could not found Todo!' });
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo Delete Successfully' });
};
exports.deleteTodo = deleteTodo;
