const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
// New instance of express
const app = express();

// Session configuration
app.use(session({
    secret: 'this-really-should-be-secret-!!!',
    resave: false,
    saveUninitialized: true
  }));
  
// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Port on Heroku and Local environments
const PORT = process.env.PORT || 5000

routes(app);

// Setting up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the views folder and engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Default route at the root directory
app.get('/', function(req, res) {
  if (req.session.userID) {
		// They are logged in!
		// pass things along to the next function
    res.redirect('/dashboard');
	} else {
    res.sendFile(path.join(__dirname + "/private/login.html"));
  }
  
});

app.get('/dashboard', function(req, res) {
  if (req.session.userID) {
    res.sendFile(path.join(__dirname + "/private/dashboard.html"));
  } else {
    res.redirect('/');
  }
  });


// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.userID) {
		// They are logged in!
		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
    res.sendFile(path.join(__dirname + "/public/login.html"));
	}
}




// Server runs at PORT and print a default message to the console
app.listen(PORT, defaultListenMsg);

// Function that handles the default message at root directory '/'
function defaultRouteMsg (req, res) {
    res.send('Node and Express server running on port ' + PORT);
}

// Function to print a default message to the console
function defaultListenMsg(){
    console.log('Server listening on port ' + PORT);
}