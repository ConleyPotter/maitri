var mongoose = require("mongoose");
var Listing = require("./models/listing");
var Comment = require("./models/comment");

var data = [
				{
					title: "Entire Wall Mosaic",
					image: "http://source.unsplash.com/000djfUJhqQ",
					description: "Blah blah blah",
					price: 10000
				},
				{
					title: "Playful Shades",
					image: "http://source.unsplash.com/4wDPAZ9k8C4",
					description: "Blah blah balh",
					price: 15000
				},
				{
					title: "Tortoise Shell",
					image: "http://source.unsplash.com/WItJTJsW97w",
					description: "Blah blah balh",
					price: 3000
				}
	];

	function seedDB() {
	// Remove listings
		Listing.remove({}, function(err) {
			if(err) {
				console.log(err);
			} console.log("removed listings!");
				data.forEach(function(seed) {
					Listing.create(seed, function(err, listing) {
						if(err) {
							console.log(err);
						} else {
							console.log("Added a listing");
							// create a comment
							Comment.create(
								{
									content: "I love this piece so much!",
									author: "Conley"
								}, function(err, comment) {
									if(err) {
										console.log(err);
									} else {
										listing.comments.push(comment);
										listing.save()
										console.log("created new comment");
									}
							});
						}
					});
				});
		});

}

module.exports = seedDB;