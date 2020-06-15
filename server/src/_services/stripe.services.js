import User from './../models/User';


export default {pay};


const stripe = require('stripe')("sk_test_51Gu7VHKS9hT6DeH4tOHmrgjikfxPckP6rDTKRjZfl0ZKwl09W2sjM8kNy1NDekl6N2FGrS00Ayv6AkMz6kIWQ4kc00mD06VjAZ")



async function pay(req, res) {
    let total = req.body.total;
    User.findOne({ _id: req.body.customerId })
        .then(user => {
            if (!user) {
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
}