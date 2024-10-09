import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGODBURL, PORT } from './config.js';
import { Book } from './models/bookModel.js';
import { Employee } from './models/employeeModel.js';
import bookRoute from './routes/bookRoute.js';
import employeeRoute from './routes/employeeRoute.js';

const app = express();

// MIddleware for parsing request body
app.use(express.json());

// MIddleware for handling CORS policy
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.use('/books', bookRoute);
app.use('/employees', employeeRoute);

mongoose.connect(MONGODBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error);
    })