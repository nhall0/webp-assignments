const express = require('express');
const {getAll, get, getByName} = require('../models/exercises');

const router = express.Router();

router.get('/', (req, res, next) => {
    getAll()
    .then((products) => {
        res.send(products);
    })
    .catch(next)
    }
)

.get('/:id', (req, res, next) => {
    get(req.params.id).then((exercise) => {
        res.send(exercise);
    }
    ).catch(next)
}
)

.get('/name/:name', (req, res, next) => {
    getByName(req.params.name).then((exercise) => {
        res.send(exercise);
    }
    ).catch(next)
}  
);

module.exports = router;