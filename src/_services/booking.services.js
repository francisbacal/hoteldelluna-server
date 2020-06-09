import Booking from './../models/Booking'
import RoomType from './../models/RoomType'
import Room from './../models/Room'

export default {
    add,
    getAll,
    getOne,
    update
}

async function add(req) {
    let total = await getTotal(req);
    req.body.total = total;
    
    const booking = await Booking.create(req.body)
    await bookRoom(booking)
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
    let total = await getTotal(req)
    req.body.total = total

    if (req.user.role === 'Admin') {
        let booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return booking
    }

}

async function getTotal(req) {
    let startDate = req.body.bookingDate.start;
    let endDate = req.body.bookingDate.end;

    let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    let nights = Math.ceil(timeDifference/ (1000*3600*24))

    let roomPrice = await RoomType.findById(req.body.roomType)
        .then(res => {
            return res.price
        })
    
    let total = roomPrice * nights;

    return total
}

async function bookRoom(booking) {
    const {_id, bookingDate, roomType, guests} = booking

    //find a room without booking first
    let room =  await Room.findOne({ 
        roomType: roomType, 
        status: 'Available',
        maxguests: {$gte: parseInt(guests)},
        $or: 
        [
            {bookings: {$exists: false}},
            {bookings: {$size: 0}},
            {bookings: null}
        ]
    })
    

    //find a room that doesn't clash with booked dates
    if (!room.length) {
        room =  await Room.findOne({
            roomType: roomType, 
            status: 'Available',
            maxguests: {$gte: parseInt(guests)},
            $nor: 
            [
                {  
                    $and: 
                    [
                        
                        {"bookings.start": { $lte: bookingDate.start }}, 
                        {"bookings.end": { $gt: bookingDate.start }}
                        
                    ]
    
                },
                {
                    
                    "bookings.start": { $lt: bookingDate.end, $gte: bookingDate.start }
                    
                }
            ]
        })
    }
    
    //add booking to Room
    await Room.findByIdAndUpdate(
        room._id, 
        {
            $addToSet: {
                bookings: {
                    bookingId: _id,
                    start: bookingDate.start,
                    end: bookingDate.end
                }
            }
        }
    )
}   