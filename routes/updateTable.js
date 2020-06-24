const dbUserCollection = require('../model/userCollection')
const dbOrderCollection = require('../model/orderCollection')
module.exports = async (req, res) => {
    try {
        const user = await dbUserCollection.find({})
        let response = await Promise.all(user.map(async x => {
            let count = await dbOrderCollection.countDocuments({ userId: x.userId })
            const update = await dbUserCollection.updateMany({ userId: x.userId }, { $set: { noOfOrders: count } })
            return update
        }));
        res.json({
            success: true,
            msg: "Updated Successfully"
        })
    } catch (err) {
        res.json({
            success: false,
            msg: "Some error has occurred"
        })
    }
}