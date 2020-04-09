  
var express=require("express");
var app=express();
var request= require("request");
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
campground=[{name:"salmon creek", image:"https://cdn.onlyinyourstate.com/wp-content/uploads/2018/05/MahoneySP_Camping_03-700x384.jpg"},{name:"granite hill", image:"https://explore.traveloka.com/wp-v2/wp-content/uploads/2017/11/canva-photo-editor-59.png"},{name:"mountain rest",image:"https://i.pinimg.com/736x/10/14/df/1014df105b61e526f0ea769d3f319deb.jpg"}];
app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campground",function(req,res){
	res.render("campground",{campground:campground});
});
app.post("/campground",function(req,res){request
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name,image:image};
	campground.push(newCampground);
	res.redirect("/campground");
	
});
app.get("/campground/new",function(req,res){
	   res.render("new");a
	
});
app.listen(3000,function()
		  {
	console.log("server is listening");
});