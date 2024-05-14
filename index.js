require('dotenv').config();

const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConnect');
const routes = require('./routes/userRoute');
const express = require('express');
const mongoose = require('mongoose');



const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use('/', require('./routes/root'));

app.use('/api', routes);

app.use('/api', require('./routes/userRoute'));

app.use('/api', require('./routes/carRoute'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

connectDB();
