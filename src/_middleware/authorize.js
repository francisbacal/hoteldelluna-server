import User from './../models/User'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import './../lib/passport-setup'

export default authorize;

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return [
        async (req, res, next) => {
            
            let user = await User.findById(req.user._id);

            if(!user || (roles.length && !roles.includes(user.role))) {
                return res.status(401).json({message: 'Unauthorized'})
            }

            req.user.role = account.role;
            next();
        }
    ]
}