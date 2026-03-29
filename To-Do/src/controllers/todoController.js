import * as db from "../models/todoDB.js";
import NotFoundError from "../errors/NotFoundError.js";

//get all todos
export const getAllTodosController = async(req, res) => {
    let todos = await db.getAllTodos();
    const {title} = req.query;

    if(title){
        todos = todos.filter((todo) => todo.title.toLowerCase().includes(title.toLowerCase()));
    }
    res.json(todos);
};


//get todo by id
export const getTodoByIDController =async(req,res) => {
    const {id} =req.params;

    const todo = await db.getTodoByID(id);

    if(!todo){
        throw new NotFoundError(`The todo with your ${id} is not found!`);
    }

    res.json(todo);
};


//create new todo
export const createTodoController =async(req,res) => {
    const{title} =req.body;

    if(!title){
        return res.status(400).json({error: 'Title is required!'});
    }

    const newTodo =await db.createTodo({title});
    res.status(201).json(newTodo);
}


//update todo
export const updateTodoController =async(req,res) =>{
    const {id} =req.params;
    const {title, completed} =req.body;

    const todo = await db.getTodoByID(id);

     if(!todo){
        throw new NotFoundError(`The todo with your ${id} is not found to be upadted!`);
    }

    if(title !== undefined) todo.title =title;
    if(completed !== undefined) todo.completed = completed;

    res.json(todo);
};


//delete todo
export const deleteTodoController =async(req,res) =>{
    const {id} =req.params;

    const allTodos = await db.getAllTodos();
    const index = allTodos.findIndex((todo) => todo.id === id);

    if(index === -1){
        throw new NotFoundError(`The todo with your ${id} is not found to be deleted!`);
    }

    allTodos.splice(index, 1);
    res.status(204).send();
}