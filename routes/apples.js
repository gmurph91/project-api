var express = require('express');
var router = express.Router();
const codeAccess = require('../data_access_layer/appleaccess')

router.get('/green', codeAccess.Green);
router.get('/red', codeAccess.Red);
router.post('/newgame', codeAccess.Creategame);
router.get('/savedgame/:joinCode', codeAccess.Findgame);

module.exports = router;
