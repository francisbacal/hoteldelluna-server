import RoomType from './../models/RoomType'

export default {
    getAll,
    getOne,
    update
}

async function getAll() {
    const types = await RoomType.find();
    return types.map(type => {return type})
}

async function getOne(id) {
    const type = await RoomType.findById(id)
    return type
}

async function update(req) {
    const type = await RoomType.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name}, 
        {new: true})

    return type
}