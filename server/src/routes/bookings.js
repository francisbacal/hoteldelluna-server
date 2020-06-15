import express from 'express';
import Joi from '@hapi/joi';
import JoiObjId from 'joi-objectid';
import JoiDate from '@hapi/joi-date';

import authorize from './../_middleware/authorize';

import Role from './../_helpers/role';
import bookingService from './../_services/booking.services';
import stripeService from './../_services/stripe.services';
import validateRequest from '../_middleware/validateRequest';


const router = express.Router();
const JoiObjectId = JoiObjId(Joi);
const Joii = Joi.extend(JoiDate)

/* ========================
| ROUTES
--------------------------*/

router.post('/',addSchema, add);
router.get('/', authorize([Role.Admin, Role.User]), getAll);
router.get('/:id', authorize([Role.Admin, Role.User]), getOne);
router.put('/:id', authorize([Role.Admin, Role.User]), updateSchema, update);
router.post('/stripe', payStripe)



export default router;


/* ========================
| FUNCTIONS
--------------------------*/

function addSchema(req, res, next) {
    const customerSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
    })
    const schema = Joi.object().keys({
        customer: customerSchema,
        roomType: JoiObjectId().required(),
        guests: Joi.number().required(),
        bookingDate: {
            start: Joii.date().min('now').max(Joi.ref('end')).required(),
            end: Joii.date().min('now').required()
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
    const customerSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        firstname: Join.string().required(),
        lastname: Joi.string().required()
    })
    
    const schema = Joi.object().keys({
        customer: Joi.object().keys(customerSchema),
        roomType: JoiObjectId().required(),
        guests: Joi.number().required(),
        bookingDate: {
            start: Joii.date().min('now').max(Joi.ref('end')).required(),
            end: Joii.date().min('now').required()
        },
        hasEnded: Joi.boolean()
    })

    validateRequest(req, next, schema)
}

function update(req, res, next) {
    bookingService.update(req)
        .then(booking => res.json(booking))
        .catch(next)
}

function payStripe(req, res, next) {
    stripeService.pay(req, res, next).then(payment => console.log(payment)).catch(err => console.log(err))
}