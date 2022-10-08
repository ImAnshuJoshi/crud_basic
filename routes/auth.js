const express = require('express');
const { register,login,logout } = require('../controllers/auth.js');
const passport = require('passport')
const {passport_config} = require('../config/passport.js')

const router = express.Router();

router.post('/register',register);
router.post('/login', login)
router.post('/logout',logout)

module.exports=router;