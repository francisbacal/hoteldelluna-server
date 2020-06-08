import express from 'express';
import Joi from '@hapi/joi';
import JoiObjId from 'joi-objectid';
import JoiDate from '@hapi/joi-date';

import authorize from './../_middleware/authorize';

import Role from './../_helpers/role';
import bookingService from './../_services/booking.services'
import validateRequest from '../_middleware/validateRequest';


const router = express.Router();
const JoiObjectId = JoiObjId(Joi);
const Joii = Joi.extend(JoiDate)

/* ========================
| ROUTES
--------------------------*/

router.post('/', addSchema, add);
router.get('/', authorize([Role.Admin, Role.User]), getAll);
router.get('/:id', authorize([Role.Admin, Role.User]), getOne);
router.put('/:id', authorize([Role.Admin, Role.User]), update);
router.delete('/:id', authorize([Role.Admin, Role.User]), updateSchema, _delete);


export default router;


/* ========================
| FUNCTIONS
--------------------------*/

function addSchema(req, res, next) {
    const schema = Joi.object().keys({
        customerEmail: Joi.string().email().required(),
        room: JoiObjectId().required(),
        bookingDate: {
            start: Joii.date().min('now').utc().max(Joi.ref('end')).required(),
            end: Joii.date().min('now').utc().required()
        }
    })

    validateRequest(req, next, schema);
}

function add(req, res, next) {
    bookingService.add(req)
        .then(booking => res.json(booking))
        .catch(next)
}

function getAll(req, res, next) {
    bookingService.getAll(req)
        .then(bookings => {
            if (bookings.length) {
                res.json(bookings)
            } else {
                next('No matching booking found')
            }
        })
        .catch(next)
}

function getOne(req, res, next) {
    bookingService.getOne(req)
        .then(booking => {
            if (booking) {
                res.json(booking)
            } else {
                next('No matching booking found')
            }
        })
        .catch(next)
}

function updateSchema(req, res, next){
    const schema = Joi.Object().keys({
        customerEmail: Joi.string().email().allow('', null),
        room: JoiObjectId().allow('', null),
        bookingDate: 
        {
            start: Joii.date().utc().allow('', null),
            end: Joii.date().utc().allow('', null)
        }
    })

    validateRequest(req, next, schema)
}

function update(req, res, next) {
    bookingService.update(req)
        .then(booking => res.json(booking))
        .catch(next)
}

function _delete(req, res, next) {
    bookingService._delete(req)
        .then(booking => res.json(booking))
        .catch(next)
}