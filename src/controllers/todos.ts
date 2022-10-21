import { RequestHandler } from "express";

import { Todo } from "./../models/todo";

const TODOS: Todo[] = [
  { id: '1', text: "Complete Course" },
  { id: '2', text: "Go to the gym" },
  { id: '3', text: "Pick up guest at 6AM" },
  { id: '4', text: "Complete pending works" },
];

//----------Create Todo---------------------------------------
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo((TODOS.length + 1).toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: "Create todo successfully", createTodo: newTodo });
};

//----------Show Todos---------------------------------------
export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todo: TODOS });
};

//----------Update Todo---------------------------------------
export const updateTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string }).text;

    if(updatedText.trim().length === 0){
        // throw new Error('Enter Something...')
        res.json({ message: 'Enter Something...' })
    }

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
        // throw new Error ('Could not found todo!');
        res.json({ message: 'Could not found Todo!' })
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.json({ message: 'Updated!', updateTodo: TODOS[todoIndex] });
}

//----------Delete Todo---------------------------------------
export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
        // throw new Error('Could not found todo!');
        res.json({ message: 'Could not found Todo!' })
    }

    TODOS.splice(todoIndex, 1);

    res.json({ message: 'Todo Delete Successfully'});

}