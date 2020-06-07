import Room from "../models/Room";

export default {
    add,
    getAll,
    getOne,
    update,
    _delete

}


async function add(req, res, next) {
    const room = await Room.create(req.body);
    return room;
}

async function getAll() {
    const options = {
        path: 'roomType',
        model: 'RoomType'
    }
    const rooms = await Room.find().populate(options);
    return rooms;
}

async function getOne(req) {
    const options = {
        path: 'roomType',
        model: 'RoomType'
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