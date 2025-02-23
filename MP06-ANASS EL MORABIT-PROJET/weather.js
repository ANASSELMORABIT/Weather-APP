document.addEventListener("DOMContentLoaded", function () {
    let storedData = JSON.parse(localStorage.getItem("info"));

    if (storedData && storedData.clima) {
      let clima = storedData.clima;
        
      let mapa = storedData.mapa;
      if (mapa.latitud && mapa.longitud) {
        var map = L.map("map").setView([mapa.latitud, mapa.longitud], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        L.marker([mapa.latitud, mapa.longitud])
          .addTo(map)
          .bindPopup(`📍 ${clima.ciudad}, ${clima.Pais}`)
          .openPopup();
      } else {
        console.warn("⚠️ No hay coordenadas para mostrar el mapa.");
      }

      // Actualizar los elementos de la página con la información de clima
      document.querySelector(".location").textContent =
        clima.ciudad + ", " + clima.Pais;
      document.querySelector(".weather-temp").textContent =
        clima.temperatura;
      document.querySelector(".humidity .value").textContent =
        clima.humedad;
      document.querySelector(".precipitation .value").textContent =
        clima.Pressure + " hPa";
      document.querySelector(".wind .value").textContent = clima.viento;
      document.querySelector(".sunrise-time").textContent = clima.sunRise;
      document.querySelector(".sundown-time").textContent = clima.sunSet;
      document.querySelector(".date-dayname").textContent = clima.WeekDay;
      document.querySelector(".date-day").textContent = `${
        clima.Day
      } ${getMonthName(clima.Month)} ${clima.Year}`;
      document.querySelector(
        ".weather-description-card .weather-description"
      ).textContent = clima.descripcion;

      let ListaDias = clima.DaysList;
      let weekList = document.querySelector(".week-list");

      // Limpiar la lista antes de agregar los nuevos datos
      weekList.innerHTML = "";

      // Mapeo de íconos basado en el estado del clima
      let iconMap = {
        clear: "sun",
        "few clouds": "cloud",
        "scattered clouds": "cloud",
        "broken clouds": "cloud",
        "shower rain": "cloud-rain",
        rain: "cloud-rain",
        thunderstorm: "cloud-lightning",
        snow: "cloud-snow",
        mist: "cloud",
      };

      // Iterar sobre la lista de días y generar los elementos dinámicamente
      ListaDias.forEach((dia, index) => {
        let listItem = document.createElement("li");

        // Agregar la clase 'active' solo al primer elemento
        if (index === 0) {
          listItem.classList.add("active");
        }

        // Determinar el icono del clima
        let weatherIcon =
          iconMap[dia.Precipitation.toLowerCase()] || "cloud";

        listItem.innerHTML = `
                    <i class="day-icon" data-feather="${weatherIcon}"></i>
                    <span class="day-name">${dia.WeekDay.substring(
                      0,
                      3
                    )}</span>
                    <span class="day-temp">${Math.round(
                      dia.TempMax
                    )}°C</span>
                `;

        weekList.appendChild(listItem);
      });

      // Actualizar los iconos con Feather Icons
      feather.replace();
    } else {
      console.warn("⚠️ No hay datos de clima en localStorage.");
    }
  });

  // Función para obtener el nombre del mes en texto
  function getMonthName(month) {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[month - 1];
  }