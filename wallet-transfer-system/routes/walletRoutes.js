const express = require('express');
const router = express.Router();
const { handleTransfer } = require('../controllers/walletController');

router.post('/transfer', handleTransfer);

module.exports = router;
