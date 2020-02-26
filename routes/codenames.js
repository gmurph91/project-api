var express = require('express');
var router = express.Router();
const codeAccess = require('../data_access_layer/codeaccess')

router.get('/words', codeAccess.Index);
router.post('/newgame', codeAccess.Creategame);
router.post('/newwords', codeAccess.Createwords);
router.get('/savedgame/:joinCode', codeAccess.Findgame);

module.exports = router;
