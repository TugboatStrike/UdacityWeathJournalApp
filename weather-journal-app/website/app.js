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
 evt.preventDefault();
 //event.preventDefault(); // ?? i don't thinnk this needs to be event.
 console.log('clicked button!');
 console.log(evt);
 let testWeather = await getWeather(80237);
 console.log('test weather: ', testWeather);
}


// Get Weather from OpenWeatherMap API connections
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
    /*
    // Display JSON data
    .then(function(weatherJson){
      //console.log(weatherJson);
      console.log('testing 1');
      return weatherJson;
    }).catch( e => console.log("err6:",e))*/
  //console.log('workData?');
  //console.log(workData);
  //console.log('end workData');
  //console.log('testing 2');
  return workData;
}

let weather = getWeather(80237)
  .then(weatherDataTesting => {
    console.log('workData?');
    console.log(weatherDataTesting)
    console.log(weatherDataTesting.main.temp);
    console.log('end workData');
  }).catch( e => console.log("err9:",e))
