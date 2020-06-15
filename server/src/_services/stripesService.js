import User from '../models/User';

export default {payStripe}

async function payStripe(req, res, next) {
    
    let total = req.body.total;

    if (!req.body.customerId) {

        let {email, firstname, lastname} = req.body

        let randomString = Math.random().toString(36).substring(12);
        const password = randomString
        const confirmPassword = randomString

        let registerDetails = {
            email,
            firstname,
            lastname,
            password,
            confirmPassword
        }

       let customer = await User.create(req.body).then(user => res.send(user)).catch(next)

       req.body.customerId = customer._id
    }

    let response = User.findOne({ _id: req.body.customerId })
        .then(user => {
            
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
                            return stripe.charges.create({
                                amount: total * 100,
                                currency: 'usd',
                                customer: source.customer
                            })
                        })
                        .then(charge => {
                            // new charge create d on a new customer

                            res.send(charge)
                        })
                        .catch(err => {
                            res.send(err)
                        })
                } else {
                    stripe.charges.create({
                        amount: total * 100,
                        currency: 'usd',
                        customer: user.stripeCustomerId
                    })
                        .then(charge => {
                            res.send(charge)
                        })
                        .catch(err => {
                            res.send(err)
                        })
                }
            }
        })

    return response
}