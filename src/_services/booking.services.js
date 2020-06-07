import Booking from './../models/Booking'

export default {
    add,
    getAll,
    getOne,
    udpate,
    _delete
}

async function add(req) {
    const booking = await Booking.create(req.body)
    return booking
}

async function getAll() {
    const bookings = await Booking.find()
    return bookings
}

async function getOne(req) {
    const booking = await Booking.findById(req.params.id)
    return bookiing
}

async function update(req) {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {new: true})

    return booking
}

async function _delete(req) {
    const booking = await Booking.findByIdAndRemove(req.params.id)

    return booking
}