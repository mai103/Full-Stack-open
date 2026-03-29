const todos = [
    {id: "1", title:"eat healthy", completed:false},
    {id: "2", title:"sleep well", completed:true}
];

export const getAllTodos = async() =>{
    return todos;
};


export const getTodoByID =async(id) =>{
    return todos.find((todo) => todo.id === id);
};


export const createTodo = async(todoData) => {
    const newTodo ={
        id: Math.floor(Math.random()*1000000).toString(),
        ...todoData,
        completed: false,
    };
    todos.push(newTodo);
    return newTodo;
};

export const deleteTodo = async (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
};