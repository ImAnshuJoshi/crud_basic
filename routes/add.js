const express = require('express');
const { addquote,deletequote,updatequote,getquote,getuserquotes } = require('../controllers/quote.js');

var passport= require('passport');
require('../config/passport.js')(passport);

const router = express.Router();

// passport.authenticate('jwt',{session:false}),

router.post('/addquote',passport.authenticate('jwt',{session:false}),addquote);
router.delete('/deletequote/:id',passport.authenticate('jwt',{session:false}), deletequote)
router.put('/updatequote/:id', passport.authenticate('jwt',{session:false}),updatequote);
router.get('/getquote/:id',getquote);
router.get('/getuserquotes/:id',getuserquotes)


module.exports=router;