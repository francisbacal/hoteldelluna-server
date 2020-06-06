import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const RoomTypeSchema = new Schema(
    {
        name: {type: String, required: [true, 'Name field is required']}
    }
);

let RoomType = mongoose.model('RoomType', RoomTypeSchema);

RoomTypeSchema.path('name').validate(async function(v){
   let roomType = await RoomType.findOne({name: this.name})

   if (roomType) {
       this.invalidate('name', 'Room type already exists.')
   }
})

RoomTypeSchema.set('toJSON', {
    versionKey: false
})



export default RoomType