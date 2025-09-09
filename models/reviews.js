const mongoose = require("mongoose");

const reviewProuduct = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    productId : {
        type : String,
        required : true
    },
    stars:{
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

const reviewsData = mongoose.model("reviews", reviewProuduct)
module.exports = { reviewsData };