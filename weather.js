async function getWeather() {
    const city = "Birgunj";
    const apiKey = "9c17c4095ee2a4042c26bbd4d4de1726"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network issue");
        const data = await response.json();
        
        document.getElementById('temp').innerText = Math.round(data.main.temp) + "°C";
        document.getElementById('description').innerText = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        document.getElementById('icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon">`;
    } catch (error) {
        document.getElementById('description').innerText = "Error loading weather";
    }
}
getWeather(); // सिधै कल गर्ने
