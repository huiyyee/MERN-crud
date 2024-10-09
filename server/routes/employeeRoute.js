import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({});

        return res.status(200).send({
            count: employees.length,
            data: employees
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Get employee by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const employee = await Employee.findById(id);

        return res.status(200).send(employee);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Create a new employee
router.post('/', async (req, res) => {
    try {
        if (!req.body.employee_name || !req.body.employee_age) {
            return res.status(400).send({ message: "Fill all required fields" });
        }

        const newEmployee = {
            employee_name: req.body.employee_name,
            employee_age: req.body.employee_age,
            employee_isActive: req.body.employee_isActive
        }

        const employee = await Employee.create(newEmployee);

        return res.status(201).send(employee);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Update employee using id
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.employee_name || !req.body.employee_age) {
            return res.status(400).send({ message: "Fill all required fields" });
        }

        const id = req.params.id;

        const result = await Employee.findByIdAndUpdate(id, req.body);

        if (!result)
            return res.status(404).send({ message: 'Employee not found' });

        return res.status(200).send({ message: 'Employee updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const result = await Employee.findByIdAndDelete(id);

        if (!result)
            return res.status(404).send({ message: 'Employee not found' });

        return res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

export default router;