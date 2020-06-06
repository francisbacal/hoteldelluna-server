import User from './../models/User'

export default authorize;

function authorize(roles = []) {    
    
            
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return [
        async (req, res, next) => {

            let user = await User.findById(req.user._id);

            if(!user || (roles.length && !roles.includes(user.role))) {
                return res.status(401).json({error: 'Unauthorized'})
            }

            req.user.role = user.role;
            next();
        }
    ]
}