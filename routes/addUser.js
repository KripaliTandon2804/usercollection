const dbUserCollection = require('../model/userCollection')

function generateUserID() {
    return new Promise ((resolve, reject) => {
        dbUserCollection.count({}, (err, count) => {
            if (err) {
                reject({
                    success: false,
                    msg: "Error while saving data"
                })
            } else {
                let newcount = ++count;
                let final = newcount > 9 ? String(newcount) : "0" + newcount;
                resolve(final)
            }
        })
    })
 }

module.exports = async(req,res) => {
    try{
        if(!req.body.name){
            res.json({
                success:false,
                msg:"Please provide all the details."
            })
        }else{
            generateUserID().then(async(id) => {
                await new dbUserCollection({
                    userId : id,
                    name : req.body.name,
                }).save()
    
                res.json({
                    success:true,
                    msg:"User saved successfully",
                })
            })           
        }
    }catch(err){
        res.json({
            success:false,
            msg:"Something went wrong",
            err:err
        })
    }
    
}