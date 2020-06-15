router.post('/stripe', (req, res, next) => {
    // total
    // customerId
    let total = req.body.total;
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
})