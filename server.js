//requires
var express= require('express');
var User = require('./models/user'); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');  
var morgan = require('morgan');
var ejs = require('ejs'); 
var engine = require('ejs-mate'); 




//executve the express appp
var app = express(); 

mongoose.connect('mongodb://localhost:27017/intern', function(err){
	if(err){
		console.log('error while connecting to the database');
	}
	else 
	{
		console.log('connection to mongo successfull'); 
	}
}); 


//middlesware 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(morgan('dev')); 
app.engine('ejs', engine); 
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/public")); 


//routes


app.get('/', function(req, res){
	res.render('main/home'); 
}); 

app.get('/about', function(req, res){
	res.render('main/about'); 
}); 


app.post('/create-user', function(req, res, next){
	var user = new User();

	user.email = req.body.email; 
	user.password = req.body.password; 
	user.profile.name = req.body.name; 

	user.save(function(err, saveUser){
		if(err) return next(err); 

		res.json('user saved successfully');
	});
}); 
app.listen(3000, function(){
	console.log('server now running on port 3000'); 
}); 

