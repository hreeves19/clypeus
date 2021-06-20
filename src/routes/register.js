const express = require('express');
const User = require('../../db/models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;
