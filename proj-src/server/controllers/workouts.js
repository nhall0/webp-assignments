const express = require('express');
const {getAll, get, getByName, add, update, remove, getByUserId} = require('../models/workouts');

const router = express.Router();

router.get('/', (req, res, next) => {
        getAll().then((workouts) => {
            res.send(workouts);
        }
        ).catch(next)
})

.get('/:id', (req, res, next) => {
        get(req.params.id).then((workout) => {
            if(workout == null){
                res.send({});
            }
            else{
                res.send(workout);
            }
            
        }
        ).catch(next)
    }
)
.get('/name/:name', (req, res, next) => {
        getByName(req.params.name).then((workout) => {
            res.send(workout);
        }
        ).catch(next)
}
) 
.post('/', (req, res, next) => {
        const user = req.user;
        req.body.user_id = user._id;

        if(req.body._id != null){
            delete req.body._id;
        }

        add(req.body).then((workout) => {
            res.send(workout);
        }
        ).catch(next)
    }
) 
.patch('/:id', (req, res, next) => {
    
        update(req.params.id, req.body).then((workout) => {
            res.send(workout);
        }
        ).catch(next)
      
    }
)   
.delete('/:id', (req, res, next) => {
        remove(req.params.id).then((workout) => {
            res.send(workout);
        }
        ).catch(next)
    }
)
.get('/user/:userId', (req, res, next) => {
    getByUserId(req.params.userId).then((workouts) => {
        res.send(workouts);
    }).catch(next)
}
);

module.exports = router;