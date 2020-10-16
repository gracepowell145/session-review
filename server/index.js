require('dotenv').config()
const { CONNECTION_STRING, SESSION_SECRET } = process.env
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const c = require('./ctrl')
const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(3333, () => console.log('server is alive and kickin'))
});

app.post('/auth/login', c.login)
app.post('/auth/register', c.register)
app.delete('/auth/logout', c.logout)
app.get('/auth/user', c.checkAuth)






















// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
// }));