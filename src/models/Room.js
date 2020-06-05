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
        categoryId:
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        price:
        {
            type: Number,
            min: [1, 'Invalid Price'],
            required: [true, 'Price is required']
        },
        descriptiom:
        {
            type: String,
            required: [true, 'Description is required']
        },
        image:
        {
            type: String,
            minLength: [8, 'Invalid image path'],
            required: [true, 'Image field is required']
        }
    }
)


/* ========================
| EXPORT MODEL
--------------------------*/

const Room = mongoose.model('Room', RoomSchema);
export default Room;