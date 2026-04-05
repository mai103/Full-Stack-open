import express from "express";
import Person from './models/person.js';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
    res.json(persons);
  });
})

//info page
app.get("/info", (req, res) =>{
    Person.countDocuments({})
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(error => next(error));
})

//get person by id
app.get("/api/persons/:id", (req, res) =>{
    Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(error => next(error));
})

//delete person 
app.delete("/api/persons/:id", (req, res)=>{
    Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
})

//add new person
app.post("/api/persons", (req,res) =>{
    const { name, number } = req.body;

  const person = new Person({ name, number });

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error));
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(
    req.params.id, 
    { name, number }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) res.json(updatedPerson);
      else res.status(404).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    // 3.19 + 3.20: إرجاع رسالة الخطأ الخاصة بـ Mongoose
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    
})