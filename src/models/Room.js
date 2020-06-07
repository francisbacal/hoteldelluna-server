import mongoose from 'mongoose';
import { Schema } from "mongoose";



/* ========================
| DEFINE SCHEMA
--------------------------*/


const RoomSchema = new Schema(
    {
        name:
        {
            type: String,
            unique: true,
            required: [true, 'Room name is required']
        },
        roomType:
        {
            type: Schema.Types.ObjectId,
            ref: 'RoomType',
            required: [true, 'Room Type is required']
        },
        status:
        {
            type: String,
            default: 'Available'
        }
    }
)

const Room = mongoose.model('Room', RoomSchema);

RoomSchema.path('name').validate(async function(v){
    let room = await Room.findOne({name: this.name})
    
    if (room) {
        this.invalidate('name', 'Room already exists.')
    }
})

RoomSchema.set('toJSON', {
    versionKey: false
})

/* ========================
| EXPORT MODEL
--------------------------*/


export default Room;