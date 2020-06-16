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

router.post('/',addSchema, payStripe, add);
router.get('/', authorize([Role.Admin, Role.User]), getAll);
router.get('/:id', authorize([Role.Admin, Role.User]), getOne);
router.put('/:id', authorize([Role.Admin, Role.User]), updateSchema, update);
// router.post('/stripe', payStripe)



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

async function add(req, res, next) {
    let booking = await bookingService.add(req)
        .catch(next)
    
    let bookingDetails = {booking: booking, payment: req.body.payment}
    
    
    console.log(bookingDetails)
   

    res.json(bookingDetails);

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

async function payStripe(req, res, next) {
    req.body.payment = await stripeService.pay(req, res, next).catch(next)
    next()
}