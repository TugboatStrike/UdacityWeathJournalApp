/* Global Variables */

//const baseURL = 'http://api...';
const localTest = 'http://localhost:3000/';
//const testOpenWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=';
const testOpenWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=';

// zip code https://openweathermap.org/api/geocoding-api#direct_zip
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
// country code use ISO 3166 country codes  https://www.iso.org/obp/ui/#search
// United States of America (the)États-Unis d'Amérique (les) US USA 840
// use the Alpha-2 code for the {country code}
// https://api.openweathermap.org/geo/1.0/zip?zip=80237,US&appid=f41274d433dda89b92ea0f6ddd894eec
// by city https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


const apiKey = 'f41274d433dda89b92ea0f6ddd894eec';
//const apiKey = 'bb0e540bf2183a2e73ec9ae1be33a3f2';

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

console.log('start');
//console.log(retrieveData('/all'));
console.log('end');

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

console.log('start');
//console.log(retrieveDataNotArrow('/all'));
console.log('end');

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

console.log("start weather demo");
//console.log(getWeatherDemo(localTest));
console.log(getWeatherDemo(testOpenWeatherUrl, apiKey));
console.log('end weather demo');
