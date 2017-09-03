var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
	name: String,
	admin: Boolean
	// Likes - one:many relationship
	// Comments - one:many relationship
})

// Mongoose/model config -- USER

module.exports = mongoose.model("User", userSchema);