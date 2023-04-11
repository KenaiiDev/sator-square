const express = require('express');
const router = express.Router();

const { getSatorSquare } = require('../controllers/sator.controller');

router.get('/getSatorSquare', getSatorSquare);

module.exports = router