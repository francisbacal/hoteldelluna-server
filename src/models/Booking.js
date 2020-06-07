import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const BookingSchema = new Schema(
    { 
        customerEmail: 
        {
            type: String,
            required: [true, 'Email required']
        },
        room:
        {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        },
        bookingDate:
        {
            start: {type: Date, required: [true, 'Date required']},
            end: {type: Date, required: [true, 'Date required']}
        },
        total:
        {
            type: Number,
            required: [true, 'Total price required']
        },
        hasEnded:
        {
            type: Boolean,
            default: false
        }
    }
)

const Booking = mongoose.model('Booking', BookingSchema)

export default Booking