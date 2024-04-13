const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

require('./dbconnect');

app.use('/api/auth',require('./routes/auth_route'));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`);
});