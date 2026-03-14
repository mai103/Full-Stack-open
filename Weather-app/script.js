const form = document.getElementById("weatherForm")
const result = document.getElementById("weatherResult")
const loading = document.getElementById("loading")

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const location = document.getElementById("location").value

getWeather(location)

})

async function getWeather(location){

loading.textContent="Loading..."

try{

const response = await fetch(
`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=STVEVZD2N888HS42LJL2ACH7W&contentType=json`
)

const data = await response.json()

const weather = processWeather(data)

displayWeather(weather)

setBackground(weather.condition)

loading.textContent=""

}

catch(error){

loading.textContent=""
result.innerHTML="City not found"

}

}

function processWeather(data){

return{
city:data.address,
temp:data.currentConditions.temp,
humidity:data.currentConditions.humidity,
condition:data.currentConditions.conditions
}

}

function displayWeather(weather){

result.innerHTML=`

<h2>${weather.city}</h2>

<p>Condition: ${weather.condition}</p>

<p>Temperature: ${weather.temp} °C</p>

<p>Humidity: ${weather.humidity}%</p>

`

}

function setBackground(condition){

document.body.className=""

if(condition.includes("Rain")){
document.body.classList.add("rain")
}

else if(condition.includes("Cloud")){
document.body.classList.add("cloud")
}

else if(condition.includes("Snow")){
document.body.classList.add("snow")
}

else{
document.body.classList.add("sunny")
}

}