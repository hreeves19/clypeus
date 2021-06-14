const express = require('express');
const UserModel = require('../../db/models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json([{ id: 1 }, { id: 2 }]);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;
