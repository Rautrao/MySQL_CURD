const db = require('../db.js');
module.exports.getAllEmployees = async()=>{
    const [records] = await db.query("SELECT *FROM employees")
    return records;
}
module.exports.getEmployeesById = async(id)=>{
    const [record] = await db.query("SELECT *FROM employees WHERE id = ?",[id]); //this is called preprepared statements 
    return record;                       //the first question mark will be replaced by the first parameter int the array //to avoid sql injectino
}
module.exports.deleteEmployee = async(id)=>{
    const [record] = await db.query("DELETE FROM employees WHERE id = ?",[id]); 
    return record.affectedRows;
}
module.exports.updateEmployee=async(id,employee)=>{
    const {name ,employee_code,salary}=employee;
    const [result]=await db.query("UPDATE employees SET name =? ,employee_code=?, salary = ? WHERE id = ?",[name ,employee_code ,salary,id]);
    return result.affectedRows;

}
module.exports.addEmployee = async(employee)=>{
    const {name , employee_code , salary} = employee;
    const [result] = await db.query("INSERT INTO employees (name, employee_code, salary) VALUES (?,?,?)",[name ,employee_code , salary]);
    return result.insertId; // return new employee ID
}
 