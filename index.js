const express = require('express');
const connection = require('./configs/db');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);

app.get('/', (req,res) => {
    res.send('Homepage');
})

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log(`Server is connected to the DB`);
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`);
})