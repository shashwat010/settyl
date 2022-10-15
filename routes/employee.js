const express = require('express');
const request = require('request');
const {body, validationResult} = require('express-validator');
const Employee = require('../models/Employee');
const router = express.Router();

router.get('/fetch',async (req,res) =>{
    request('https://dummy.restapiexample.com/api/v1/employees', { json: true }, async (err, res, body) => {
  if (err) { return console.log(err); }
  for(let i=0;i<body.data.length;i++){
    try{
        const {employee_name,id,employee_age,employee_salary} = body.data[i];

        const employee = new Employee({
            employee_name,id,employee_age,employee_salary
        })

        const saveEmployee = await employee.save();
    }catch(error){
        return console.log({error});
    }
  }
});
return res.json({message:"Records added to mongoDB"});
})

router.get('/getemployee',async(req,res)=>{
    try{
        const employee = await  Employee.find();
        return res.json(employee);
    }catch(error){
        console.log({error});
        res.status(500).send('Internal Server Error');
    }
})

router.post('/addemployee',[
    body('employee_name','Name cannot be blank').exists(),
    body('id','Id cannot be blank').exists(),
    body('employee_age','Age cannot be blank').exists(),
    body('employee_salary','Salary cannot be blank').exists(),
],async (req,res) =>{
    try{
        const {employee_name,id,employee_age,employee_salary} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const employee = new Employee({
            employee_name,id,employee_age,employee_salary
        })

        const saveEmployee = await employee.save();
        res.json(saveEmployee);
    }catch(error){
        console.log({error});
        res.status(500).send('Internal Server Error');
    }
})

router.put('/update/:id',async (req,res)=>{
    const {id,employee_name,employee_age,employee_salary} = req.body;
    try{
        const newEmployee = {};
        if(id) newEmployee.id=id;
        if(employee_name) newEmployee.employee_name=employee_name;
        if(employee_age) newEmployee.employee_age=employee_age;
        if(employee_salary) newEmployee.employee_salary=employee_salary;

        let employee = await Employee.findByIdAndUpdate(req.params.id,{ $set: newEmployee}, {new:true});
        res.json(employee);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;