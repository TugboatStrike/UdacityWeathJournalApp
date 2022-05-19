/* Global Variables */

// Key for Udacity course
// Because teaching people to use keys unsecurely is the best idea ever!!!!
const apiKey = 'f41274d433dda89b92ea0f6ddd894eec&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();


// Using generate button to activate functions
document.getElementById('generate').addEventListener('click', performAction);


// Action performed from pressing Generate
async function performAction(evt){
  let sData = {};
  const [coords, coordsHealth] = await getCoords(getZip());
  // check that zip code returns valid information
  if (coordsHealth) {
    let weather = await getWeather(coords);
    sData["temp"] = weather.main.temp;
    sData["content"] = getContent();
    sData["date"] = newDate;
    retrieveData()
  }
  const testPost = await postData('/postData', sData);
  console.log('postData waited?');
}


function getZip(){
  const zipObj = document.getElementById('zip');
  //let zipVal = zipObj.value;
  //return zipVal;
  return zipObj.value;
}


function getContent(){
  //const contentObj = document.getElementById('feelings');
  const contentObj = document.querySelector('#feelings');
  //let contentVal = contentObj.value;
  //console.log(contentVal);
  //return contentVal;
  return contentObj.value;
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


// Server command functions
/*
const retrieveData = async (url="") =>{
  //console.log(url);
  const request = await fetch(url)
  //const allData = await request.json();
    .then(allData => allData.json())
    .catch( e => console.log("err30: ",e))
  //console.log(allData);
  return request;
}*/
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}



const postData = async (url ='', data = {}) =>{
  const responseMaybe = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  const newData = await responseMaybe.json();
  //console.log(newData);
  return newData;
}
