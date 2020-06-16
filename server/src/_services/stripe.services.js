import User from './../models/User';


export default {pay};


const stripe = require('stripe')("sk_test_51Gu7VHKS9hT6DeH4tOHmrgjikfxPckP6rDTKRjZfl0ZKwl09W2sjM8kNy1NDekl6N2FGrS00Ayv6AkMz6kIWQ4kc00mD06VjAZ")



async function pay(req, res, next) {

    function randomString(length, chars) {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    let total = req.body.total;
    let bookingDetails = req.body.customer
    console.log('req.body', req.body.customerId)

    if (!req.body.customerId) {
        console.log('no existing user for', bookingDetails.email)
        let password = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        let confirmPassword = password;

        let details = {
            firstname: bookingDetails.firstname,
            lastname: bookingDetails.lastname,
            email: bookingDetails.email,
            password,
            confirmPassword
        }

        let userCreated = await User.create(details);
        req.body.customerId = await userCreated._id

    }

    console.log(error)

    //     stripe.customer.create({ email: bookingDetails.email })
    //         .then(customer =>{
    //             console.log('creating user...')
    //             return User.create({...details, stripeCustomerId: customer.id})
    //         })
    //         .then(user => {
    //             req.body.customerId = user._id
    //             return stripe.customers.retrieve(user.stripeCustomerId)
    //         })
    //         .then(customer => {
    //             return stripe.customers.createSource(customer.id, {
    //                 source: 'tok_visa'
    //             })
    //         })
    //         .then(source => {
    //             return stripe.charges.create({
    //                 amount: total * 100,
    //                 currency: 'usd',
    //                 customer: source.customer
    //             })
    //         })
    //         .then(charge => {
    //             // new charge created on a new customer
    //             res.send(charge)
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })

    User.findOne({ _id: req.body.customerId })
        .then(user => {
            if (!user) {
                res.status(500).send({ message: "Incomplete" })        
            } else {
                if (!user.stripeCustomerId) {
                    // create customer to stripe
                    stripe.customers.create({ email: user.email })
                        .then(customer => {
                            return User.findByIdAndUpdate({ _id: user._id }, { stripeCustomerId: customer.id }, { new: true })
                        })
                        .then(user => {
                            return stripe.customers.retrieve(user.stripeCustomerId)
                        })
                        .then(customer => {
                            return stripe.customers.createSource(customer.id, {
                                source: 'tok_visa'
                            })
                        })
                        .then(source => {
                            console.log(total)
                            return stripe.charges.create({
                                amount: total * 100,
                                currency: 'usd',
                                customer: source.customer
                            })
                        })
                } else {
                    stripe.charges.create({
                        amount: total * 100,
                        currency: 'usd',
                        customer: user.stripeCustomerId
                    })     
                }
            }
        })
}