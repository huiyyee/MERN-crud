import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema(
    {
        employee_name: {
            type: String,
            required: true,
        },
        employee_age: {
            type: String,
            required: true,
        },
        employee_isActive: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Employee = mongoose.model('Employee', employeeSchema);