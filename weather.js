async function getWeather() {
    const city = "Birgunj";
    const apiKey = "9c17c4095ee2a4042c26bbd4d4de1726"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "°C";
      document.getElementById('description').innerHTML = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">`;
    } catch (error) {
      console.error("Error fetching weather:", error);
      document.getElementById('description').innerHTML = "Unable to load";
    }
}

// विजेट लोड भएपछि फङ्सन कल गर्ने
document.addEventListener("DOMContentLoaded", getWeather);
