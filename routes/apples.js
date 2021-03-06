var express = require('express');
var router = express.Router();
const appleAccess = require('../data_access_layer/appleaccess')

router.get('/green', appleAccess.Green);
router.get('/red', appleAccess.Red);
router.get('/black', appleAccess.Black);
router.get('/white', appleAccess.White);
router.post('/newgame', appleAccess.Creategame);
router.get('/savedgame/:joinCode', appleAccess.Findgame);

module.exports = router;
