import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport'
import jwt from 'jsonwebtoken'

import User from '../models/User';

import './../lib/passport-setup'

const router = express.Router()


/* ========================
| REGISTER USER
--------------------------*/

router.post('/register', (req,res,next)=> {
    
    User.create(req.body).then(user => res.send(user)).catch(next)

})

/* ========================
| LOGIN USER
--------------------------*/

router.post('/login', (req,res,next)=> {
    
    res.send('USER POST')

})

/* ========================
| GET USER
--------------------------*/

router.post('/profile', (req,res,next)=> {
    
    res.send('USER POST')
    
})


export default router;