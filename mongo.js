import mongoose from "mongoose";

if (process.argv.length < 3){
    console.log("give password as an argument");
    process.exit();    
};

const password = process.argv[2];
const mongourl = `mongodb+srv://maiahmed_db_user:${password}@cluster0.ktddd1y.mongodb.net/phonebook?appName=Cluster0`;

mongoose.connect(mongourl, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


const Person =mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(p =>{
            console.log(`${p.name} ${p.number}`)            
        })
        mongoose.connection.close()
    })
}


if(process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result =>{
        console.log(`added ${name} number ${number} to phonebook`)
        
        mongoose.connection.close()
    })
}



