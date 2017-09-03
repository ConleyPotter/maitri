var mongoose = require("mongoose")

var likeSchema = new mongoose.Schema({
	user: [userSchema]
})

// Mongoose/model config -- LIKE

module.exports = mongoose.model("Like", likeSchema);