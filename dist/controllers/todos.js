"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../models/todo");
const TODOS = []; // [{},{},{} ....]
//export const createTodo = (req:Request,res:Response,next:NextFunction)=>{}
exports.createTodo = (req, res, next) => {
    const text = req.body.text; // type casting which says "req.body = {text:string}"
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res
        .status(201)
        .json({ messgage: "Ok, it works and make the todo", createdTodo: newTodo });
};
exports.getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        //it means I cannot find the target index
        throw new Error("could not find todo"); // it would be use the app.use((err,req,res,next)=>{res.status(500).json({message:err.message})})
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ messgae: "Updated", updatedTodo: TODOS[todoIndex] });
};
exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("could not find todo");
    }
    TODOS.splice(todoIndex, 1); // from todoIndex, erase one element
    res.json({ message: "Todo deleted" });
};
