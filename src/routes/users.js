import express from 'express';

import User from '../models/User';
import userService from './../_services/user.services'


const router = express.Router()


/* ========================
| ROUTES
--------------------------*/

router.post('/register', (req,res,next)=> {
    User.create(req.body).then(user => res.send(user)).catch(next)
});

router.post('/login', authenticate);

export default router;

/* ========================
| FUNCTIONS
--------------------------*/

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).send({error: 'Login failed. Check Credentials'}))
        .catch(next)
}