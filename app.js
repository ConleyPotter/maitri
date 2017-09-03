var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
		mongoose 		= require("mongoose"),
		Comment 		= require("./models/comment"),
		Listing 		= require("./models/listing"),
		seedDB 			= require("./seeds");

mongoose.connect("mongodb://localhost/maitri");

seedDB();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// ===============
// RESTFUL Routes
// ===============

// ROOT ROUTE
app.get("/", function(req, res) {
	res.render("static_pages/static_home");
});

// About Route
app.get("/about", function(req, res) {
	res.render("static_pages/about");
});

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
	// create listing
	Listing.create(req.body.listing , function(err, newListing) {
		if(err) {
			res.render("new");
		} else {
			// redirect to the index
			res.redirect("/listings")
		}
	})
})

// ================
// Helper function
// ================

function priceify(num) {
	console.log(num);
	if(num < 1000) {
		return num.toString();
	} else if (1000 < num && num < 1000000) {
		num = num.toString();
		return num.substring(0,num.length-3) + "," + num.substring(num.length-3,num.length);
	} else {
		num = num.toString();
		return num.substring(0,num.length-6) + "," + num.substring(num.length-6,num.length-3) + "," 
			+ num.substring(num.length-3,num.length);
	}
}

// SHOW ROUTE
app.get("/listings/:id", function(req, res) {
	Listing.findById(req.params.id).populate("comments").exec(function(err, foundListing) {
		if(err) {
			console.log(err);
			res.redirect("/listings");
		} else {
			res.render("show", {listing: foundListing, price: priceify(foundListing.price)});
		}
	})
});

// //EDIT ROUTE
// app.get("/listings/:id/edit", function(req, res) {
// 	Listing.findById(req.params.id, function(err, foundListing) {
// 		if(err){
// 			res.redirect("/listings");
// 		} else {
// 			res.render("edit", {listing: foundListing});
// 		}
// 	})
// });

// // UPDATE ROUTE
// app.put("/listings/:id", function(req, res) {
// 	res.send("UPDATE ROUTE!")
// });

app.listen(3000, function(){
	console.log("Maitri is listening");
})