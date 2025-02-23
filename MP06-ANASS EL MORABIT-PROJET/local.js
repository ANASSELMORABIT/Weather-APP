document.addEventListener("DOMContentLoaded", () => {
    // Obtener los datos del clima desde localStorage
    let storedWeather = localStorage.getItem("LocalWeather");

    if (storedWeather) {
        let weatherData = JSON.parse(storedWeather);

        // Asignar los valores a los elementos HTML
        document.getElementById("temperature").textContent = weatherData.Temp;
        document.getElementById("feels_like").textContent = weatherData.FeelsLike;
        document.getElementById("cloud_pct").textContent = weatherData.CloudPct;
        document.getElementById("humidity").textContent = weatherData.Humidity;
        document.getElementById("min_temp").textContent = weatherData.MinTemp;
        document.getElementById("max_temp").textContent = weatherData.MaxTemp;
        document.getElementById("wind_speed").textContent = weatherData.WindSpeed;
        document.getElementById("wind_degrees").textContent = weatherData.WindDegrees;
        document.getElementById("sunrise").textContent = weatherData.Sunrise;
        document.getElementById("sunset").textContent = weatherData.Sunset;
    } else {
        alert("No hay datos de clima guardados. Intenta obtener tu ubicación nuevamente.");
    }

    // Botón para volver a la página anterior
    document.getElementById("backButton").addEventListener("click", () => {
        window.history.back();
    });
});
