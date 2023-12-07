const express = require('express');
const { getAll, get, search, getByIds, create, update, remove, login, register, addFriend, removeFriend } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router.get('/', requireUser(true), (req, res, next) => {
    const user = req.user;
    if(user.admin) {
        getAll().then(users => {
            res.send(users);
        }).catch(next);
    } else {
        res.send(user);
    }
})
.get('/search', requireUser() , (req, res, next) => {

    const results = search(req.query.q);
    res.send(results);
})
.get('/friends', requireUser(), (req, res, next) => {
    const user = req.user;
    getByIds(user._id).then(friends => {
        res.send(friends);
    }
    ).catch(next);
})
.get('/:id', requireUser(), (req, res, next) => {

    const user = get(+req.params.id);
    res.send( user );

})
.post('/', requireUser(true), (req, res, next) => {

    const user = create(req.body);
    res.send(user);

})
.post('/register', (req, res, next) => {
    const user = register(req.body);
    res.send(user);
})
.post('/friends/:id', requireUser(), (req, res, next) => {
    const user = req.user;
    const friend = req.params.id;

    addFriend(user._id, friend).then(user => {
        res.send({"message": "Friend added", "code": 200});
    }).catch(next);
})
.delete('/friends/:id', requireUser(), (req, res, next) => {
    const user = req.user;
    const friend = req.params.id;

    console.log(user._id, friend);

    removeFriend(user._id, friend).then(user => {
        res.send({"message": "Friend removed", "code": 200});
    }).catch(next);
})
.post('/login', (req, res, next) => {
    login(req.body.email, req.body.password)
    .then(user => {
        res.send(user);
    }).catch(next)
})
.patch('/password', requireUser(), (req, res, next) => {
    if(req.body._id !== req.body._id && !req.body.user.admin) {
        return next({
            status: 403,
            message: 'You can only edit your own account. (Unless you are an admin)'
        });
    }
    const user = update(req.body);
    res.send(user);
})
.patch('/:id', requireUser(), (req, res, next) => {
    if(req.body.user.id !== +req.params.id && !req.body.user.admin) {
        return next({
            status: 403,
            message: 'You can only edit your own account. (Unless you are an admin)'
        });
    }
    req.body.id = +req.params.id;
    const user = update(req.body);
    res.send(user);
  
})
.delete('/:id', requireUser(true), (req, res, next) => {
    const user = req.user

    if(user.admin != true) {
        return next({
            status: 403,
            message: 'You can only delete your own account. (Unless you are an admin)'
        });
    }

    remove(req.params.id).then(user => {
        res.send(user);
    }).catch(next);
});

module.exports = router;