const mongoose = require('mongoose');
const  {Schema} = mongoose;

const employeeSchema = new Schema({
    employee_name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    employee_age: {
        type: Number,
        required: true
    },
    employee_salary: {
        type: Number,
        required: true
    }
})

const employee = mongoose.model('employee',employeeSchema);
employee.createIndexes();
module.exports = employee;