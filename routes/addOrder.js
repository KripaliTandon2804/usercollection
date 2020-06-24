const dbUserCollection = require('../model/userCollection')
const dbOrderCollection = require('../model/orderCollection')
const moment = require('moment')

function generateOrderId() {
    return new Promise ((resolve, reject) => {
        dbOrderCollection.count({}, (err, count) => {
            if (err) {
                reject({
                    success: false,
                    msg: "Error while saving data"
                })
            } else {
                let newcount = ++count;
                let final = newcount > 9 ? String(newcount) : "0" + newcount;
                console.log("final============",final)
                resolve(final)
            }
        })
    })
 }


module.exports = async (req,res) => {
    try{
        if(!req.body.userId || !req.body.subTotal || !req.body.date){
            res.json({
                success:false,
                msg: "Please provide all the details"
            })
        }else{
            generateOrderId().then(async(id) => {
                await new dbOrderCollection ({
                    orderId :id,
                    userId: req.body.userId,
                    subTotal : req.body.subTotal,
                    date: req.body.date
                }).save()
                res.json({
                    success:true,
                    msg: "Order saved successfully"
                })
            })           
        }
    }catch(err){
        console.log("err=============",err)
        res.json({
            success:false,
            msg: "Something went wrong.Please try again later."
        })
    }
}