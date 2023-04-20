import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

let users = []

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (users.find(user => user.email === email)) {
        res.status(401).send('Email already in use.');
    } else {
        users.push({name, email, password})
        res.status(200).send('Registration successful!');
    }

});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (users.find(user => user.email === email && user.password === password))
        res.status(200).send('Login successful!');
    else
        res.status(401).send('Invalid username or password. Please try again.');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
