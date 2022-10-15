const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors') 

connectToMongo();

const app = express();
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/employee',require('./routes/employee'))


app.listen(port , () =>{
    console.log(`Settyl backend listening at http://localhost:${port}`);
})

