import express from 'express';
import Joi from '@hapi/joi';

import authorize from './../_middleware/authorize'
import validateRequest from './../_middleware/validateRequest'

import Role from '../_helpers/role'
import roomService from '../_services/room.services';


const router = express.Router()


/* ========================
| ROUTES
--------------------------*/

router.post('/', authorize(Role.Admin), addSchema, add);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(Role.Admin), getOne);
router.put('/:id', authorize(Role.Admin), updateSchema, update);
router.delete('/:id', authorize(Role.Admin), _delete)


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
    const schema = Joi.object().keys({
        name: Joi.string().allow('', null).optional(),
        roomType: Joi.string().allow('', null).optional(),
        status: Joi.string().allow('', null).optional()
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