
/**
* If the normal declaration of module does not work use the following
* command in the command prompt to get the specific module location.
* 1) npm root -g
* 2) save the location text in the variable below.
*
* Note: leaving the string empty is the same thing as the normal module
*       require call.
*/
//const nModRoot = String.raw``.replace(/\\/g,"/");// typical declaration
//const nModRoot = String.raw`C:\Users`.replace(/\\/g,"/"); // example call
const nModRoot = String.raw`C:\Users\tugbo\AppData\Roaming\npm\node_modules`.replace(/\\/g,"/");

/**
* module call function to simplify module declaration.
*/
function modCall(moduleName) {
  try {
    const dirString = `${nModRoot}/${moduleName}`
    const mod = require(dirString);
    console.log(dirString);
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


// Start up an instance of app

const app = express();

/* Middleware*/


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
