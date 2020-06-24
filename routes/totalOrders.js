const dbUserCollection = require('../model/userCollection')
const dbOrderCollection = require('../model/orderCollection')

module.exports = async (req, res) => {
    try {
        let sum = 0
        let averageBill = 0
        const user = await dbUserCollection.find({})
        let response = await Promise.all(user.map(async x => {
            let count = await dbOrderCollection.countDocuments({ userId: x.userId })
            let order = await dbOrderCollection.find({ userId: x.userId })
            sum = order.reduce(function (sum, x) {
                return sum + x.subTotal
            }, 0)
            averageBill = sum / count
            return {
                userId: x.userId,
                name: x.name,
                noOfOrders: count,
                averageBill: averageBill
            }
        }))
        res.json({
            success: true,
            data: response
        })


    } catch (err) {
        res.json({
            success: false,
            msg: "Please try again"
        })
    }
}