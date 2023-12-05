const express = require('express');
const {getAll, get, getByIds, add, update, remove} = require('../models/goals');

const router = express.Router();

router.get('/', (req, res, next) => {
    getAll().then((goals) => {
        res.send(goals);
    }).catch(next)
}
)   
.get('/:id', (req, res, next) => {
        get(req.params.id).then((goal) => {
            res.send(goal);
        }
        ).catch(next)
}
)
.get('/ids/:ids', (req, res, next) => {
        getByIds(req.params.ids).then((goals) => {
            res.send(goals);
        }
        ).catch(next)
})
.post('/', (req, res, next) => {
        add(req.body).then((goal) => {
            res.send(goal);
        }
        ).catch(next)
    }
)
.patch('/:id', (req, res, next) => {
        update(+req.params.id, req.body).then((goal) => {
            res.send(goal);
        }
        ).catch(next)
    }
)
.delete('/:id', (req, res, next) => {
        remove(+req.params.id).then((goal) => {
            res.send(goal);
        }
        ).catch(next)
    }
);

module.exports = router;