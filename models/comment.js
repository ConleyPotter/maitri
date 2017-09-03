var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
	content: String,
	author: String
});
// Mongoose/model config -- COMMENT

module.exports = mongoose.model("Comment", commentSchema);