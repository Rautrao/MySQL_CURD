const express=require('express');
const router = express.Router();
const service = require('../services/employee-service.js');
require('dotenv').config()
//http:localhost:3000/api/employees/

router.get('/', async(req ,res )=>{
    const employees = await service.getAllEmployees();
    res.status(200).send(employees);
});
router.get('/:id',async(req,res)=>{
    const employee = await service.getEmployeesById(req.params.id);
    if(employee.length === 0){
        res.status(404).json('no record with given id :'+req.params.id);
    }else{
        res.status(200).send(employee);
    }  
});
router.delete('/:id',async(req,res)=>{
    const affectedRows = await service.deleteEmployee(req.params.id);
    
    if(affectedRows === 0){
        res.status(404).json('no record with given id :'+req.params.id);
    }else
        res.status(200).send('deleted successfully');
     
});
router.post('/', async (req,res,next) => {
    try{
        const id = await service.addEmployee(req.body);
        res.status(201).json({message: "Employee created successfully" ,id});
    } catch(err){
        next(err);
    }
});
module.exports = router;

router.put('/:id',async(req,res,next)=>{
    try{
        const affected = await service.updateEmployee(req.params.id,req.body);
        if(affected===0){
            return res.status(404).json({message:"Employee not found" });
        }
        res.json({message : "Employee updated successfully"});
    } catch(err){
        next(err);
    }
});