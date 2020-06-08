import Booking from './../models/Booking'
import Room from './../models/Room'

export default {
    add,
    getAll,
    getOne,
    update,
    _delete
}

async function add(req) {
    let total = await getTotal(req);
    req.body.total = total;
    const booking = await Booking.create(req.body)
    return booking
}

async function getAll(req) {

    if (req.user.role === 'Admin') {       
        const bookings = await Booking.find()
        return bookings
    } else {
        const bookings = await Booking.find({customerEmail: req.user.email})
        return bookings
    }
}

async function getOne(req) {
    if (req.user.role === 'Admin') {
        const booking = await Booking.findOne({_id: req.params.id})
        return booking;
    } else {
        const booking = await Booking.findOne({
            '_id': req.params.id, 
            customerEmail: req.user.email
        })
        return booking;
    }
}

async function update(req) {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {new: true})

    return booking
}

async function _delete(req) {
    const booking = await Booking.findByIdAndRemove(req.params.id)

    return booking
}

async function getTotal(req) {
    let startDate = req.body.bookingDate.start;
    let endDate = req.body.bookingDate.end;

    let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    let nights = Math.ceil(timeDifference/ (1000*3600*24))

    let roomPrice = await Room.findById(req.body.room)
        .populate({path: 'roomType', model: 'RoomType'})
        .then(res => {
            return res.roomType.price
        })
    
    let total = roomPrice * nights;

    return total


}