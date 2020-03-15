//import {Request,Response,NextFunction} from 'express'
//I can integrate them into one type
import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = []; // [{},{},{} ....]

//export const createTodo = (req:Request,res:Response,next:NextFunction)=>{}
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text; // type casting which says "req.body = {text:string}"
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res
    .status(201)
    .json({ messgage: "Ok, it works and make the todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    //it means I cannot find the target index
    throw new Error("could not find todo"); // it would be use the app.use((err,req,res,next)=>{res.status(500).json({message:err.message})})
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ messgae: "Updated", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("could not find todo");
  }

  TODOS.splice(todoIndex, 1); // from todoIndex, erase one element
  res.json({ message: "Todo deleted" });
};
