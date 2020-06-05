import express from 'express';
import multer from 'multer';
import passport from 'passport';
import Room from '../models/Room';


const router = express.Router()

/* ========================
| MULTER SETUP
--------------------------*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/images')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


/* ========================
| STORE ROOM
--------------------------*/

router.post('/', (req,res,next) => 
    {
        res.send('ROOM POST')
    }
    
)

/* ========================
| GET ROOM
--------------------------*/

router.get('/', (req,res,next) => 
    {

    }
)

/* ========================
| GET ROOMS
--------------------------*/



/* ========================
| UPDATE ROOM
--------------------------*/



/* ========================
| DELETE ROOM
--------------------------*/


export default router;