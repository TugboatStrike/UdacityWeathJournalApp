/* Global Variables */

// Key for Udacity course
// Because teaching people to use keys unsecurely is the best idea ever!!!!
const apiKey = 'f41274d433dda89b92ea0f6ddd894eec&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);


/* WEB API WITH FETCH DEMO--  */
//let baseURL = 'http://api.animalinfo.org/data/?animal='
//let apiKey = '&appid=9f15e45060...';
//const newAnimal =  document.getElementById('animal').value;

//using generate button to activate functions for testing.
document.getElementById('generate').addEventListener('click', performAction);


async function performAction(evt){
  //getAnimalDemo(baseURL,newAnimal, apiKey)
  //evt.preventDefault();
  //event.preventDefault(); // ?? i don't thinnk this needs to be event.
  //console.log('clicked button!');
  //console.log(evt);
  const zip = getZip();
  const content = getContent();
  const [coords, coordsHealth] = await getCoords(zip);
  //console.log(coordsHealth, coords);
  let weather = {};
  if (coordsHealth) {
    //console.log('get weather start');
    weather = await getWeather(coords);
    console.log(weather);
  }
  //console.log(zip);
  //console.log(zipHealth);
}


function getZip(){
  const zipObj = document.getElementById('zip');
  let zipVal = zipObj.value;
  return zipVal;
}


function getContent(){
  //const contentObj = document.getElementById('feelings');
  const contentObj = document.querySelector('#feelings');
  let contentVal = contentObj.value;
  console.log(contentVal);
  return contentVal;
}


// Get Weather from OpenWeatherMap API connections
const getCoords = async (zip)=> {
  const countryCode = 'US'; // using ISO 3166 Alpha-2 code. assumed US
  const zipOwmUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apiKey}`;
  let apiHealth = true;
  // API fetch the coordinates using the zip code.
  const workData = await fetch(zipOwmUrl)
  // convert workData to JSON
  .then(res => res.json()).catch( e => console.log("err1:",e))
  // Check JSON data for cod property. if so assume bad zipcode.
  if (workData.hasOwnProperty('cod')) {
    console.log(workData);
    alert("Invalid zip code. Please enter a valid zip code.")
    apiHealth = false;
  }
  return [workData, apiHealth];
}


// API Function call using healthy coordinates to get weather data.
async function getWeather(coordsObj) {
  coordsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordsObj.lat}&lon=${coordsObj.lon}&appid=${apiKey}`;
  // api call for weather data
  const weatherData = await fetch(coordsUrl)
    .catch( e => console.log("err2: ",e))
    // Convert API workData to JSON
    .then(wData => wData.json()).catch( e => console.log("err5:",e))
  return weatherData;
}
