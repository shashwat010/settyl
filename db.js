const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shashwat:sABYNMG8rxlB58Vl@cluster0.bualkao.mongodb.net/?retryWrites=true&w=majority'

const connectToMongo = () =>{
    mongoose.connect(mongoURI, () =>{
        console.log('Connect To mongoose Successfully!');
    })
}

module.exports = connectToMongo;