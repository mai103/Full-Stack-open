import express from "express";
import data from "./data.js"

const app = express();
const port =3001;
let Persons =[...data];

app.use(express.json());

app.get("/api/persons", (req, res) => {
    res.json(Persons);
})

//info page
app.get("/info", (req, res) =>{
    const date = new Date();
    const info = `
        <p>Phonebook has info ${Persons.length} people</p>
        <p>${date}</p>`
    
    res.send(info)
})

//get person by id
app.get("/api/persons/:id", (req, res) =>{
    const {id} = req.params;

    const person = Persons.find((person) => person.id === id);

    if (person){
        res.json(person);
    } else {
        res.status(404).json({error: "person not found"});
    }
})

//delete person 
app.delete("/api/persons/:id", (req, res)=>{
    const {id} = req.params;

    Persons = Persons.filter( p => p.id !== id );

    res.status(204).end();
})

//add new person
app.post("/api/persons", (req,res) =>{
    const newPerson = req.body;

    if(!newPerson.name || !newPerson.number){
        return res.status(400).json({error:"The name or number is missing"});
    }

    const existedName =Persons.find( p => p.name.toLowerCase() === newPerson.name.toLowerCase());
    if(existedName){
        return res.status(400).json({error: "name must be unique"})
    }

    const newId = Math.floor(Math.random() *10000000).toString();
    const newAddedPerson = {
        id: newId,
        name: newPerson.name,
        number: newPerson.number
    };

    Persons = Persons.concat(newAddedPerson);
    res.json(newAddedPerson);
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    
})