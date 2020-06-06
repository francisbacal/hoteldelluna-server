import express from 'express'
import passport from 'passport'
import Joi from '@hapi/joi'
import './../lib/passport-setup'

import authorize from './../_middleware/authorize'
import validateRequest from './../_middleware/validateRequest'

import RoomType from './../models/RoomType'
import Role from '../_helpers/role'
import roomTypeService from './../_services/roomTypes.services'

const router = express.Router();

/* ========================
| ROUTES
--------------------------*/

router.post('/', passport.authenticate('jwt', {session:false}),  authorize(Role.Admin), (req, res, next) => {
    RoomType.create(req.body).then(roomType => res.json(roomType)).catch(next)
});
router.get('/', passport.authenticate('jwt', {session:false}),  authorize(Role.Admin), getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), authorize(Role.Admin), getOne);
router.put('/:id', passport.authenticate('jwt', {session:false}), authorize(Role.Admin), updateSchema, update);
router.delete('/:id', passport.authenticate('jwt', {session:false}), authorize(Role.Admin), _delete)


export default router

/* ========================
| FUNCTIONS
--------------------------*/

function getAll(req,res,next){
    roomTypeService.getAll()
        .then(roomTypes => res.json(roomTypes))
        .catch(next)
}

function getOne(req,res,next){
    roomTypeService.getOne(req.params.id)
        .then(roomType => res.json(roomType))
        .catch(next)
}

function updateSchema(req, res, next) {
    const updateSchemaRules = Joi.object({
        name: Joi.string().required(),
    });

    validateRequest(req, next, updateSchemaRules)
}

function update(req,res,next){
    roomTypeService.update(req)
        .then(roomType =>res.json(roomType))
        .catch(next)
}

function _delete(req,res,next){
    roomTypeService._delete(req)
        .then(roomType => {
            console.log(roomType)
            if (roomType) {
                res.json(roomType)
            } else {
                next(`Room type not found`)
            }
        })
        .catch(next)
}