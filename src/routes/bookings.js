import express from 'express';


import authorize from './../_middleware/authorize';

import Role from './../_helpers/role';
import bookingService from './../_services/booking.services'


const router = express.Router();

/* ========================
| ROUTES
--------------------------*/

router.post('/', add);
router.get('/', authorize([Role.Admin, Role.User]), getAll);
router.get('/:id', authorize([Role.Admin, Role.User]), getOne);
router.put('/:id', authorize([Role.Admin, Role.User]), update);
router.delete('/:id', authorize([Role.Admin, Role.User]), _delete);


export default router;


/* ========================
| FUNCTIONS
--------------------------*/


function add(req, res, next) {
    bookingService.add(req)
        .then(booking => res.json(booking))
        .catch(next)
}

function getAll(req, res, next) {
    bookingService.getAll()
        .then(bookings => res.json(bookings))
        .catch(next)
}

function getOne(req, res, next) {
    bookingService.getOne(req)
        .then(booking => res.json(booking))
        .catch(next)
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