require('./config/config');


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //middlewares
 
// parse application/json
app.use(bodyParser.json());

app.use( require('./routes/usuario') );
 

//mongoose.prototype.connect devuelve una promesa
mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true }, ( err, res ) => {  
    if (err) 
        throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {

    console.log(`Escuchando en el puerto ${ process.env.PORT }`);

});