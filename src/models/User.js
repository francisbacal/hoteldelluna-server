import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import bcrypt from 'bcrypt';


/* ========================
| DEFINE SCHEMA
--------------------------*/
const UserSchema = new Schema(
    {  
        firstname: 
        {
            type: String,
            required: [true, 'Field required']
        },
        lastname:
        {
            type: String,
            required: [true, 'Field required']
        },
        email:
        {
            type: String,
            unique: true,
            required: [true, 'Field required']
        },
        passwordHash:
        {
            type: String,
            required: [true, 'Field required'],
        }
    }
);

let User = mongoose.model('User', UserSchema);

UserSchema.virtual('password')
.get(function(){
    return this.password;
})
.set(function(value) {
    this._password = value;
    
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(value, salt)

    this.passwordHash = hash;
    
});

UserSchema.virtual('confirmPassword')
.get(function(){
    return this.confirmPassword;
})
.set(function(value) {
    this._confirmPassword = value;
});

UserSchema.path('passwordHash').validate(function (v){
    if (this._password !== this._confirmPassword) {
        this.invalidate('passwordConfirm', 'must match confirmation')
    }

    if (this.isNew && !this._password) {
        this.invalidate('password', 'required');
      }
},null);


UserSchema.path('email').validate(async function (v){
   
    let user = await User.findOne({email: this.email})
    
    if (user) {
        this.invalidate('email', 'Email already taken')
    }


})


/* ========================
| EXPORT MODEL
--------------------------*/
export default User