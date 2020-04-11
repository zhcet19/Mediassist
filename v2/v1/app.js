var express=require("express");
var app=express();
var request= require("request");
var bodyparser = require("body-parser");
var mongoose=require("mongoose");
var LocalStrategy= require("passport-local")
var passport= require("passport")
var passportLocalMongoose= require("passport-local-mongoose")
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
var Hospital =require("./models/hospital"); 
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User= require("./models/user")
mongoose.connect('mongodb://localhost:27017/hospital', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static(__dirname +"/public"));
//seedDB();
app.use(require("express-session")(
	{
		secret:"i am faiz alam",
		resave:false,
		saveUninitialized:false
	}
		
));
app.use(function(req,res,next)
	   {
	res.locals.currentUser=req.user;
	next();
})
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
	res.render("landing");
});

app.get("/hospital",function(req,res){
	
	Hospital.find({},function(err,allHospitals){
		if(err)
			{
				console.log(err);
				
			}
		else
			{
				res.render("hospital/index",{hospital:allHospitals,currentUser:req.user});
			}
	});
});
	app.post("/hospital",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;	
	var newHospital={name:name,image:image,description:desc};
Hospital.create(newHospital,function(err,newlyCreated)
					 {
		if(err)
			{
				console.log(err);
			}
		else
			{
				res.redirect("/hospital");
			}
	});
	});
app.get("/hospital/new",function(req,res){
	res.render("hospital/new");
});
	
	
app.get("/hospital/:id",function(req,res){
	Hospital.findById(req.params.id).populate("comments").exec(function(err,foundhospital)
						{
		if(err)
			{
				console.log(err);
			}
		else
	{  
		
		console.log(foundhospital)
		res.render("hospital/show",{hospital:foundhospital});
	}

	});


});
app.get("/hospital/:id/comments/new",isLoggedIn,function(req,res){
		Hospital.findById(req.params.id,function(err,hospital)  
						{
		if(err)
			{
				console.log(err);
			}
		else
	{  
		
		
		res.render("comments/new",{hospital:hospital});
	}
	
	
});
});
app.post("/hospital/:id/comments",function(req,res){
	Hospital.findById(req.params.id,function(err,hospital)
			{
		if(err)
			{
				console.log(err);
				res.redirect("/hospital");
			}
		else
			{
				Comment.create(req.body.comment,function(err,comment)
							   {
					if(err)	
						{
							console.log(err);
						}
					else{
						hospital.comments.push(comment);
						hospital.save();
						res.redirect("/hospital/" + hospital._id);
					}
							   
							   
			});
	}			
						
						
						
});
});
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
   req.body.username
	req.body.password
	User.register(new User({username: req.body.username}),req.body.password,function(err,user){
	if(err)
	{
				console.log(err);
				return res.render("register");
		}
	passport.authenticate("local")(req,res,function(){
			res.redirect("/hospital");
		});
	});
});

app.get("/login",function(req,res){
	res.render("login");
})
app.post("/login",passport.authenticate("local",{
		successRedirect:"/hospital",
		failureRedirect:"/login"
}),function(req,res){});
app.get("/logout",function(req,res)
	   {
	req.logout();
	res.redirect("/hospital");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		{
			return next();
		}
	else{
		res.redirect("/login");
	}
}
app.listen(3000,function()
		  {
	console.log("server is listening");
});		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

