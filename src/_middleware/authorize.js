import User from './../models/User'
import passport from 'passport'
import './../lib/passport-setup'

export default authorize;

function authorize(roles = []) {    
    
            
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return (
        async (req, res, next) => {
            await passport.authenticate('jwt', {session:false}, async(err, user) => {
                if (err) {
                    return next(err)
                }

                if(!user || (roles.length && !roles.includes(user.role))) {
                    return res.status(401).json({error: 'Unauthorized'})
                }
                
                req.user = user
                next();
    
            })(req, res, next)
            
        }
    )
}