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
        bookings:[
            {
                bookingId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Booking'
                },
                guests: 
                {
                    type: Number, 
                    min: [1, "Number of guests should not be less than 1"],
                    max: [8, "Number of guests can not exceed 8"]
                },
                start: {type: Date},
                end: {type: Date}
            }
        ],
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