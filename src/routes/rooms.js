import express from 'express';
import multer from 'multer';
import passport from 'passport';
import Room from '../models/Room';

import storage from './../lib/multer-setup'


const router = express.Router()
const upload = multer({ storage });


/* ========================
| ROUTES
--------------------------*/

router.post('/', (req,res,next) => 
    {
        res.send('ROOM POST')
    }
    
)

router.get('/', (req,res,next) => 
    {

    }
)


export default router;