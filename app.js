var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
		mongoose 		= require("mongoose");

mongoose.connect("mongodb://localhost/maitri");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var listingSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,
	price: Number,
	likes: Number,
	created: {type: Date, default: Date.now()}
});

// Mongoose/model config
var Listing = mongoose.model("Listing", listingSchema);

// RESTFUL Routes

// ROOT ROUTE
app.get("/", function(req, res) {
	res.render("static_pages/static_home");
})

// INDEX ROUTE
app.get("/listings", function(req, res) {
	Listing.find({}, function(err, listings) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {listings: listings});
		}
	});
})

// NEW ROUTE
app.get("/listings/new", function(req, res) {
	res.render("new");
})

// CREATE ROUTE
app.post("/listings", function(req, res) {
	// create blog
	Listing.create(req.body.listing , function(err, newListing) {
		if(err) {
			res.render("new");
		} else {
			// redirect to the index
			res.redirect("/listings")
		}
	})
})

// SHOW ROUTE
app.get("/listings/:id", function(req, res) {
	Listing.findById(req.params.id, function(err, foundListing) {
		if(err) {
			res.redirect("/listings");
		} else {
			res.render("show", {listing: foundListing});
		}
	})
});

//EDIT ROUTE
app.get("/listings/:id/edit", function(req, res) {
	Listing.findById(req.params.id, function(err, foundListing) {
		if(err){
			res.redirect("/listings");
		} else {
			res.render("edit", {listing: foundListing});
		}
	})
});

// UPDATE ROUTE
app.put("/listings/:id", function(req, res) {
	res.send("UPDATE ROUTE!")
});

app.listen(3000, function(){
	console.log("Maitri is listening");
})