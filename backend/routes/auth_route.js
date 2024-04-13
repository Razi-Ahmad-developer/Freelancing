const express = require('express');
const { addUser, loginUser } = require('../controllers/auth_controller');
const router = express.Router();

router.post('/addUser',addUser);
router.post('/loginUser',loginUser);

module.exports = router;