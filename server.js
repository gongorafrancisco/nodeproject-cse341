const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
// New instance of express
const app = express();

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
app.get('/', defaultRouteMsg);

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