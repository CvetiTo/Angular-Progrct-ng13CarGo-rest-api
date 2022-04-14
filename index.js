const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors.js');
const catalogController = require('./controllers/catalog.js');
const truckController = require('./controllers/truck.js')
const usersController = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');


start();

async function start() {
    try{
      await mongoose.connect('mongodb://localhost:27017/cargo', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        }); 
        console.log('Database ready'); 
    } catch(err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();

    app.use(express.json());
    app.use(cors(
        //{origin: ['http://localhost:3030', 'http://localhost:4200'],
        //Credentials: true}
        ));
    //app.use(cookie);
    app.use(auth());
    app.use('/data/loads', catalogController);
    app.use('/data/trucks', truckController);
    app.use('/users', usersController);

    app.get('/', (req, res) => res.json({ message: 'Rest service operational'}));

    app.listen(3030, () => console.log('Rest service started on port 3030'));
}