const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

const card = document.getElementById('card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let scr = 'images/tempmedia.jpg';
    if (temp > 26) {
        scr = 'images/temperatura.jpg';
    } else if (temp < 20) {
        scr = 'images/tempbaja.jpg';
    }
    tempImg.scr = scr;
}
async function buscar(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        card.style.display = 'block';

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}C`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}C / ${toCelsius(data.main.temp_max)}C`;
        updateImages(data);
    } catch (error) {
        console.log(error);
        alert('Hubo un error');
    }
}

function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
    event.preventDefault();
    buscar(buscarcaja.value);
}

const buscarform = document.getElementById('buscar-form');
const buscarcaja = document.getElementById('buscarcaja');
buscarform.addEventListener('submit', onSubmit, true);