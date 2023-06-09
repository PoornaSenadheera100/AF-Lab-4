const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===================================== 1st Part - Begin ============================================================

app.get('/', (req, res) => {
 res.send('Hello World!');
});

app.get('/api/user', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ];
    res.send(users);
});
    
app.post('/api/user', (req, res) => {
    const { name } = req.body;
    const user = { id: 3, name };
    res.send(user);
});


// ================================= 1st Part - End =====================================================

// ================================= 2nd Part - Begin ===================================================

let todos = [
    { id: 1, text: 'Buy groceries', done: false },
    { id: 2, text: 'Do laundry', done: true },
];

app.get('/api/todos', (req, res) => {
    res.send(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.post('/api/todos', (req, res) => {
    const { text, done } = req.body;
    const id = todos.length + 1;
    const todo = { id, text, done };
    todos.push(todo);
    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { text, done } = req.body;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.text = text || todo.text;
        todo.done = done || todo.done;
        res.send(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.send(`Todo with id ${id} has been deleted`);
});

// ================================= 2nd Part - End =====================================================

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

