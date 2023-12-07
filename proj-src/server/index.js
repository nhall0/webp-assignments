// express.js

const path = require('path')
const express = require('express');
require('dotenv').config();

const userController = require('./controllers/users');
const exerciseController = require('./controllers/exercises');
const workoutController = require('./controllers/workouts');
const goalController = require('./controllers/goals');
const postController = require('./controllers/posts');

const { parseAuthorizationToken, requireUser } = require('./middleware/authorization');
const app = express();

const PORT = process.env.PORT ?? 3000;

app
    .use('/', express.static(path.join( __dirname, '../client/dist/') ) )
    .use(express.json()) 
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', ['*', "Authorization"]);
        if(req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    })

    .use(parseAuthorizationToken)
    .use('/api/v1/exercises', requireUser(), exerciseController)
    .use('/api/v1/workouts', requireUser(), workoutController)
    .use('/api/v1/goals', requireUser(), goalController)
    .use('/api/v1/posts', requireUser(), postController)
    .use('/api/v1/users', userController)

    .get('*', (req, res) => {
        res.sendFile(path.join( __dirname, '../client/dist/index.html') )
    });

app
    .use((err, req, res, next) => {
        console.error(err);
        res
            .status(err?.status || 500)
            .json({ message: err?.message || err });
    })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
