
const express = require('express');

const { getAll, get, add, update, remove } = require('../models/posts');

const router = express.Router();

router.get('/', async (req, res) => {
    getAll().then((posts) => {
        res.send(posts);
    })
});

router.get('/:id', async (req, res) => {
    get(req.params.id).then((post) => {
        res.send(post);
    })
}
);

router.post('/', async (req, res) => {
    const user = req.user;
    req.body.user_id = user._id;

    add(req.body).then((post) => {
        res.send(post);
    })
}
);

router.patch('/:id', async (req, res) => {
    update(+req.params.id, req.body).then((post) => {
        res.send(post);
    })
}
);

router.delete('/:id', async (req, res) => {
    remove(+req.params.id).then((post) => {
        res.send(post);
    })
}
);

module.exports = router;
