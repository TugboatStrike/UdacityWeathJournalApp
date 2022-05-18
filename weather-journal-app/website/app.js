/* Global Variables */

//const baseURL = 'http://api...';
const localTest = 'http://localhost:3000/';
//const testOpenWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
//const testOpenWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=';
// zip code https://openweathermap.org/api/geocoding-api#direct_zip
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
// country code use ISO 3166 country codes  https://www.iso.org/obp/ui/#search
// United States of America (the)États-Unis d'Amérique (les) US USA 840
// use the Alpha-2 code for the {country code}
// https://api.openweathermap.org/geo/1.0/zip?zip=80237,US&appid=f41274d433dda89b92ea0f6ddd894eec
// by city https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// Key for Udacity course
// Because teaching people to use keys unsecurely is the best idea ever!!!!
const apiKey = 'f41274d433dda89b92ea0f6ddd894eec';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);


/* WEB API WITH FETCH DEMO--  */
//let baseURL = 'http://api.animalinfo.org/data/?animal='
//let apiKey = '&appid=9f15e45060...';
//const newAnimal =  document.getElementById('animal').value;

//using generate button to activate functions for testing.
document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
 //getAnimalDemo(baseURL,newAnimal, apiKey)
 //e.preventDefault();
 //event.preventDefault(); // ?? i don't thinnk this needs to be event.
 console.log('clicked button!');
 console.log(e);
}


const retrieveData = async (url='') =>{ // using anonymous function
  console.log('retrieveData ran?');
  const request = await fetch(url);
  console.log(request.body);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
  console.log("this: ",this);
}

//console.log('start');
//console.log(retrieveData('/all'));
//console.log('end');

// Writing async function without the arrow function calls
async function retrieveDataNotArrow(url='') {
  console.log('retrieveDataNotArrow ran?');
  const request = await fetch(url);
  console.log(request.body);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData);
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
  console.log("this: ",this);
}

//console.log('start');
//console.log(retrieveDataNotArrow('/all'));
//console.log('end');

//console.log("start call?");
//console.log(testOpenWeatherUrl+apiKey);
const getWeatherDemo = async (baseUrl, key)=>{ // using anonymous function
  // 1.
  //let callUrl = localTest+'all';
  let callUrl = baseUrl+key;
  console.log("start call?");
  console.log(callUrl);
  const res = await fetch(callUrl);
  //const res = await fetch(baseURL+key);
  //const res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f41274d433dda89b92ea0f6ddd894eec');
  // 2. Call Fake API
  // const res = await fetch('/fakeAnimalData')
  try {
   const data = await res.json();
   console.log('the data: |');
   console.log(data)
   console.log(data.main)
   console.log('end data: |');
   // 1. We can do something with our returned data here-- like chain promises!

   // 2.
   // postData('/addAnimal', data)
  }  catch(error) {
   // appropriately handle the error
   console.log("error", error);
  }
}

//console.log("start weather demo");
//console.log(getWeatherDemo(localTest));
//console.log(getWeatherDemo(testOpenWeatherUrl, apiKey));
//console.log('end weather demo');

const zipOwmCoord = async (zip) =>{ // get open weather cordinates from zip
  const countryCode = 'US'; // using ISO 3166 Alpha-2 code. assumed US
  const zipOwmUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apiKey}`;
  const res = await fetch(zipOwmUrl);
  console.log('zip response');
  console.log(res);
  console.log('zip finished');
  try {
    const coords = await res.json()
    console.log('start coords json');
    console.log(coords);
    console.log('lat: ', coords.lat);
    console.log('lon: ', coords.lon);
    console.log('json finished');
    return coords;
  } catch (e) {
    console.log('error: ',e);
  }

}

const coordOwmWeather = async (coords) =>{
  try {
    //const coordsOwmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
    //const coordsOwmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${apiKey}`
    const coordsOwmUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
    //console.log(coordsOwmUrl);
    const res2 = await fetch(coordsOwmUrl);
    //const res3 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=39.6431&lon=-104.8987&appid=f41274d433dda89b92ea0f6ddd894eec`);
    //console.log(res2);
    //console.log(res3);
    const weather2 = await res2.json();
    console.log('start weather2');
    console.log(res2);
    console.log(weather2);
    console.log('finish weather2');
  } catch (e) {
    console.log('catch root');
    console.log("error: ", e);
  }


}

const getWeatherOld = async (zip) => {
  const coords = await zipOwmCoord(zip);
  const weather = await coordOwmWeather(coords);
  return weather
}

//console.log("weather call api");
//console.log(getWeatherDemo(localTest));
//let weather = getWeatherOld(80237);
//const coordInfo = zipOwmCoord(80237);
//console.log(weather);
//console.log('end weather call');

//const weather = coordInfo.then(coordOwmWeather())


/*
function weatherBalloon( cityID ) {
  var key = apiKey;
  //fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=39.6431&lon=-104.8987&appid=f41274d433dda89b92ea0f6ddd894eec`)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log('weatherballoon?');
    console.log(data);
  })
  .catch(function() {
    // catch any errors
    console.log("error catch");
  });
}
weatherBalloon( 6167865 );*/


const getWeather = async (zip)=> {
  const countryCode = 'US'; // using ISO 3166 Alpha-2 code. assumed US
  const zipOwmUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apiKey}`;
  let workData = fetch(zipOwmUrl)
    //.then(function(res){ return res.json() })
    // convert workData to JSON
    .then(res => res.json()).catch( e => console.log("err1:",e))
    // Create Url from workData.lat and workData.lon JSON data
    .then(coordsUrl => `https://api.openweathermap.org/data/2.5/weather?lat=${coordsUrl.lat}&lon=${coordsUrl.lon}&appid=${apiKey}`)
    .catch( e => console.log("err2: ",e))
    // Weather API Fetch using workData with coordinates url
    .then(wOwmUrl => fetch(wOwmUrl)).catch( e => console.log("err4:",e))
    // Convert API workData to JSON
    .then(wData => wData.json()).catch( e => console.log("err5:",e))
    // Display JSON data
    .then(function(weatherJson){
      //console.log(weatherJson);
      console.log('testing 1');
      return weatherJson;
    }).catch( e => console.log("err6:",e))
  //console.log('workData?');
  console.log(workData);
  //console.log('end workData');
  console.log('testing 2');
  return workData
  console.log('testing 3');
}

let weatherData2 = getWeather(80237)
  .then(weatherDataTesting => {
    console.log('workData?');
    console.log(weatherDataTesting)
    console.log('end workData');
  }).catch( e => console.log("err9:",e))
