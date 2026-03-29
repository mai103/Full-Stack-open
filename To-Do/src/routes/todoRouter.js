import {Router} from "express";
import { getAllTodosController, getTodoByIDController, createTodoController, updateTodoController, deleteTodoController } from "../controllers/todoController.js";


const toDoRouter =Router();

//1. get all todos
toDoRouter.get("", getAllTodosController);


//2.get a todo by id
toDoRouter.get("/:id", (req, res, next) => {
    console.log(`Checking request for your ID: ${req.params.id}`);
    next();
}, getTodoByIDController
);


//3.Create Todo
toDoRouter.post("/", createTodoController);


//4.update a todo
toDoRouter.put("/:id", updateTodoController);


//5.delete a todo
toDoRouter.delete("/:id", deleteTodoController);


export default toDoRouter;