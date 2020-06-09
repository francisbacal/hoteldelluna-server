import Room from "../models/Room";
import RoomType from "../models/RoomType";

export default {
    add,
    getAll,
    getOne,
    update,
    _delete,
    findRooms,
    removeBooking

}


async function add(req, res, next) {
    const room = await Room.create(req.body);
    return room;
}

async function getAll() {
    const options = {
        path: 'bookingId',
        model: 'Booking'
    }
    const rooms = await Room.find().populate(options);
    return rooms;
}

async function getOne(req) {
    const options = {
        path: 'bookingId',
        model: 'Booking'
    }
    const room = await Room.findById(req.params.id).populate(options);
    return room;
}

async function update(req) {
    const room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    return room
}

async function _delete(req) {
    const room = await Room.findByIdAndRemove(req.params.id)
    return room
}

async function removeBooking(req) {
    const {id, bookingId} = req.params
    const room = await Room.findByIdAndUpdate(
        id,
        { $pull: {bookings: { _id: bookingId } } },
        {new: true}
    )

    return room
}


async function findRooms(req) {
    const {guests} = req.params

    //declare room types array to be returned
    let result = []

    //find all Room Types
    let allRoomTypes = await RoomType.find()


    //find all available rooms without bookings first
    result = await getNoBookings(allRoomTypes, guests)


    //If all rooms has booking
    //find all rooms that doesn't clash with booked dates
    if (!result.length) {
        result = await getRoomsWithBookings(allRoomTypes, req)
        return result
    }
    
    return result
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

async function getNoBookings(allRoomTypes, guests) {
    let typeArr= []
    await asyncForEach(allRoomTypes, async (roomType)=>{
        let room = await Room.findOne({
            roomType: roomType._id, 
            status: 'Available',
            maxguests: {$gte: parseInt(guests)},
            $or: 
            [
                {bookings: {$exists: false}},
                {bookings: {$size: 0}},
                {bookings: null}
            ]
        })

        if (room) {
            typeArr.push(room.roomType)
        }
    })

    return typeArr;
}

async function getRoomsWithBookings(allRoomTypes, req) {
    let typeArr = []
    const {guests, start, end} = req.params

    await asyncForEach(allRoomTypes, async (roomType) => {

        let room =  await Room.findOne({
            roomType: roomType._id, 
            status: 'Available',
            maxguests: {$gte: parseInt(guests)},
            $nor: 
            [
                {  
                    $and: 
                    [
                        
                        {"bookings.start": { $lte: start }}, 
                        {"bookings.end": { $gt: start }}
                        
                    ]
    
                },
                {
                    
                    "bookings.start": { $lt: end, $gte: start }
                    
                }
            ]
        })

        if (room) {
            typeArr.push(room.roomType)
        }

        return typeArr

    })
}

