const PORT = 3000;
const express = require('express');
const db = require('./src/db')
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',  
    resave: false,
    saveUninitialized: false
}))

db.sync(() => console.log(`Banco de dados conectado`));

app.get('/all', (req,res) => {});

app.post('/new', (req,res) =>{});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})