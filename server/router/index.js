const express = require('express');

const query = require('../database/Queries');

const router = express.Router();
router.get('/', query);
module.exports = router;
