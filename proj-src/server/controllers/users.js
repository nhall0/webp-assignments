// @ts-check
/* B"H
*/

const express = require('express');
const { getAll, get, search, create, update, remove, login, register, addFriend, removeFriend } = require('../models/users');
const { requireUser } = require('../middleware/authorization');
const { debug } = require('console');
const router = express.Router();

router.get('/', requireUser(true), (req, res, next) => {

    res.send(getAll());

})
.get('/search', requireUser() , (req, res, next) => {

    const results = search(req.query.q);
    res.send(results);
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
.post('/add-friend', requireUser(), (req, res, next) => {
    addFriend(req.body.user.id, req.body.friendId).then(user => {
        res.send({"message": "Friend added", "code": 200});
    }).catch(next);
})
.post('/remove-friend', requireUser(), (req, res, next) => {
    removeFriend(req.body.user.id, req.body.friendId).then(user => {
        res.send({"message": "Friend removed", "code": 200});
    }).catch(next);
})
.post('/login', (req, res, next) => {
    login(req.body.email, req.body.password)
    .then(user => {
        res.send(user);
    }).catch(next)

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
    
    remove(+req.params.id);
    res.send({message: 'User removed'});
});

module.exports = router;