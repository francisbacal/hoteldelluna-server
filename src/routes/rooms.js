import express from 'express';
import Joi from '@hapi/joi';
import JoiObjId from 'joi-objectid';
import JoiDate from '@hapi/joi-date';

import authorize from './../_middleware/authorize'
import validateRequest from './../_middleware/validateRequest'

import Role from '../_helpers/role'
import roomService from '../_services/room.services';


const router = express.Router();
const JoiObjectId = JoiObjId(Joi);
const Joii = Joi.extend(JoiDate)


/* ========================
| ROUTES
--------------------------*/

router.post('/', authorize(Role.Admin), addSchema, add);
router.get('/', authorize([Role.Admin, Role.Manager, Role.Reception]), getAll);
router.get('/:id', authorize([Role.Admin, Role.Manager, Role.Reception]), getOne);
router.put('/:id', authorize([Role.Admin, Role.Manager, Role.Reception]), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete),
router.get('/:start/:end/:guests', findRooms)


export default router;


/* ========================
| FUNCTIONS
--------------------------*/

function addSchema(req,res,next) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        roomType: Joi.string().required()
    });

    validateRequest(req, next, schema)
}

function add(req, res, next) {
    roomService.add(req)
        .then(room => res.json(room))
        .catch(next)
}

function getAll(req,res,next) {
    roomService.getAll()
        .then(rooms => res.json(rooms))
        .catch(next)
}

function getOne (req,res,next) {
    roomService.getOne(req)
        .then(room => {
            if (room) {
                res.json(room)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}

function updateSchema(req, res, next) {
    const bookingSchema = Joi.object().keys({
        bookingId: JoiObjectId().optional(),
        start: Joii.date().min('now').max(Joi.ref('end')).optional(),
        end: Joii.date().min('now').optional(),
        guests: Joi.number().optional()
    })
    
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        roomType: JoiObjectId().required(),
        status: Joi.string().required(),
        bookings: Joi.array().items(bookingSchema)
    });

    validateRequest(req, next, schema)
}

function update(req, res, next) {
    roomService.update(req)
        .then(room => {
            if (room) {
                res.json(room)
            } else {
                next(`Room not found`)
            }
        })
        .catch(next)
}

function _delete(req, res, next) {
    roomService._delete(req)
        .then(room => {
            if (room) {
                res.json(room)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}

function findRooms(req, res, next) {
    roomService.findRooms(req)
        .then(rooms => {
            if (!rooms) {
                next('No Available rooms')
            } else {
                res.json(rooms)
            }
        })
        .catch(next)
}