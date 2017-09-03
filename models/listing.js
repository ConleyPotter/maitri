var mongoose = require("mongoose");

var listingSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,
	price: Number,
	created: {type: Date, default: Date.now()},
	// likes: [likeSchema],
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Mongoose/model config -- LISTING

module.exports = mongoose.model("Listing", listingSchema);