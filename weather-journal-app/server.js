
/**
* If the normal declaration of module does not work use the following
* command in the command prompt to get the specific module location.
* 1) npm root -g
* 2) save the location text in the variable below.
*
* Note: leaving the string empty is the same thing as the normal module
*       require call.
*
* Note: nModRoot uses the replace function at declaration to check for any
*       backslashes "\" so they can be replaced with forward slashes. It is
*       expected to just copy the string directly from the command promt
        without making any changes to it.
*/
//const nModRoot = String.raw``.replace(/\\/g,"/");// typical declaration
//const nModRoot = String.raw`C:\Users`.replace(/\\/g,"/"); // example call
const nModRoot = String.raw`C:\Users\tugbo\AppData\Roaming\npm\node_modules`.replace(/\\/g,"/");



// module call function to simplify module declaration.
function modCall(moduleName) {
  let slash = '/';
  if (nModRoot == ``) slash = '';// Checking if slash required
  try {
    const dirString = `${nModRoot}${slash}${moduleName}`
    const mod = require(dirString);
    console.log(`Required ${moduleName}   |  ${dirString}`);
    return mod;
  } catch (e) {
    console.log("error: ", e);
  }
}


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = modCall('express');
const bodyParser = modCall('body-parser');
const cors = modCall('cors')

// .env used to remove key from code. the dotenv is required to process.env
modCall('dotenv').config();
// console.log(process.env.OPEN_WEATHER_MAP_UDACITY_KEY);


// Start up an instance of app
const app = express();


/* Middleware*/


// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = process.env.SERVER_PORT;


function listening(err) {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on port ${PORT}`);
}

const server = app.listen(PORT, listening);

// Route Functions

// Send all projectData
function sendData(req, res) {
  res.send(projectData);
}


function addData(req, res){
  projectData = JSON.stringify(req.body);
  res.send(projectData);
}
// Route calls

// GET route
app.get('/all', sendData); // send all projectData

// POST route
app.post('/postData', addData);
