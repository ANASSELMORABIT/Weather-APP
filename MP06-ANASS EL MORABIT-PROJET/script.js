let compoCommunidades = document.getElementById("ccaa");


let campoProvincias = document.getElementById("provincia");

let poblacion=document.getElementById("poblacion");

let UrlCommunidades = "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/ccaa.json"


let UrlProvincias = "https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/provincias.json"




let UrlPoblacion ="https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json";





let ListApiKey = [
    'ea5aff4e67mshf8f4a4b3a9ef999p162761jsn018233577b8d',
    'c3cab92dadmsh199921246cca64fp1ad2b3jsnee5a1b316db0',
    '7e4c85878bmshda3060e0aebe884p1a8949jsn638dacd55f9e',
    '054c7ed8a6msh046a241a5331aa8p13c4d0jsn9affba0d0368',
    'e2d3fbb55dmsh9b8d12cdb3123eep1ee18ajsna860041c9765',
    '60320dfe90mshfeae930e9297030p15ce82jsnd56f946d1e9a',
    'd3e523ff45msh6dcd153f6084a2ep1254d3jsn614ca7f67c23',
    '318780e21fmshb77955196e2aac5p173a45jsn0a78d07bdde0',
    'd37f1b441dmsh583d28d277fdc75p16be71jsnd5cc122a62d9',
    'b29e01435bmsha197a62f6c61cd2p136c08jsnb832413126b8',
    '29538d4069mshcd031a7853860cap1e49b9jsn7785f5cb6415',
    'a2e0c20a72mshbea31cd7dbea70bp1cda00jsn0840a5c15258',
    '2594e730aemshcb7e95c54991e8cp1d4573jsndfd3321906da',
    'b3650f34ecmsh0a98745349e7010p13c9acjsn10c3813d9013',
    'de3a30cd82mshe05d6b580117ab2p1291e7jsn559dfb39a4b9',
    'ecffadc50amsh6b176702d82f444p1c089fjsn0c6f1d2b0eb4',
    'bf6a38f4d6msh1cd553da2c4b0cfp182563jsnef2a750b8d1d',
    'fe7362ca52msh2a35f0334600552p13292bjsnb1df2aea2123',
    '6381bcf69dmsh4f0060d8ca8b93fp169b40jsn095ed3f1f8fe',
    '8afee7ecbfmsh813230eb834379bp10a3d9jsnb57d5a4773ef',
    '11bda99721msh12a1c8074d3c79dp14fb1djsnc176854621ad',
    '8c8fe5a04bmshd1ba307f7ed63bfp185127jsn6b6e1ff837ae',
    'd0e66a8935msh7c1f4d207676018p165cf8jsn8d6773a5cffa'
]
function getApiKey(ListApiKeyIndex) {

    let randomIndex = Math.floor(Math.random() * ListApiKeyIndex.length);
    return ListApiKeyIndex[randomIndex];
}

async function getComunidades() {
    const response = await fetch(UrlCommunidades);
    const data = await response.json();
    // console.log(data)
    
    let campoCommunidades = document.getElementById("ccaa");

    data.forEach(comunidad => {
        let option = document.createElement("option");
        
        option.value = comunidad.code; 


        option.text = comunidad.label; 
        campoCommunidades.appendChild(option);
    });
}
getComunidades();






compoCommunidades.addEventListener("change", function() {

    getProvincias();
})




async function getProvincias() {

    

    campoProvincias.innerHTML = "";


    const response = await fetch(UrlProvincias);
    const data = await response.json();
    //console.log(data)

    
    let CodCommunidade = compoCommunidades.value;

    console.log("La clave de la comunidad es: " + CodCommunidade)
    let option = document.createElement("option");
    option.value = "";
    option.text = "Selecciona una provincia";
    campoProvincias.appendChild(option);
    data.forEach(provincia => {
        if (provincia.parent_code == CodCommunidade) {
            let option = document.createElement("option");
            option.value = provincia.code;
            option.text = provincia.label;
            campoProvincias.appendChild(option);
        }
    });
}






campoProvincias.addEventListener("change", function() {

    getPoblacion();


})


async function getPoblacion() {

    const select = document.getElementById("poblacion");

    select.innerHTML = "";

    const response = await fetch(UrlPoblacion);
    const data = await response.json();
    // console.log(data)

    let campoPoblacion = document.getElementById("poblacion");
    let CodProvincia = campoProvincias.value;

    let ProvinciaEligida = campoProvincias.options[campoProvincias.selectedIndex].text;


    console.log("La clave de la provincia es: " + CodProvincia)

    console.log("La provincia elegida es: " + ProvinciaEligida)
    let option = document.createElement("option");
    option.value = "";
    option.text = "Selecciona una población";
    campoPoblacion.appendChild(option);

    data.forEach(poblacion => {
        if (poblacion.parent_code == CodProvincia) {
            let option = document.createElement("option");
            option.value = poblacion.code;
            option.text = poblacion.label; 
            campoPoblacion.appendChild(option);
        }
    });
}








async function getPhotos(event) {
    event.preventDefault();
    

    let PoblacionEligida = poblacion.options[poblacion.selectedIndex].text;
    console.log("La población elegida es:", PoblacionEligida);

    let UrlPhotos = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=images&titles=" + encodeURIComponent(PoblacionEligida) + "&gimlimit=10&prop=imageinfo&iiprop=url";

    console.log("URL de la API:", UrlPhotos);

    try {
        const response = await fetch(UrlPhotos);
        const data = await response.json();

        if (!data.query || !data.query.pages) {
            console.error("❌ No se encontraron imágenes en Wikimedia.");
            
            return;
        }

        console.log("✅ Respuesta de la API:", data);

        let imageUrls = [];

        Object.values(data.query.pages).forEach(page => {
            if (!page.imageinfo || !page.imageinfo[0]) return;

            let imageUrl = page.imageinfo[0].url;
            console.log("🔹 Imagen encontrada:", imageUrl);
            imageUrls.push(imageUrl);
        });

        if (imageUrls.length > 0) {
            let storedImages = JSON.parse(localStorage.getItem("fotos")) || [];
            storedImages.push(...imageUrls); // Agregar nuevas imágenes
            localStorage.setItem("fotos", JSON.stringify(storedImages));
            console.log("📸 Imágenes actualizadas en localStorage:", storedImages);
        } else {
            console.warn("⚠️ No se encontraron imágenes para guardar.");
        }

    } catch (error) {
        console.error("⚠️ Error al obtener las fotos:", error);
    } finally {
        
    }
}


document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear();
    console.log("🔄 LocalStorage limpiado al cargar la página.");
    
    let submit = document.getElementById("submit");
    let loader = document.getElementById("loader-container");

    if (loader) {
        loader.classList.add("hide-loader"); // Asegurar que esté oculto al cargar
    }

    if (submit) {
        submit.addEventListener("click", async function (event) {
            event.preventDefault();  
            
            // Mostrar loader con fade-in
            loader.classList.remove("hide-loader");
            loader.classList.add("show-loader");

            await getPhotos(event);
            await getWeather(event);

            // Ocultar loader con fade-out después de un tiempo
            setTimeout(() => {
                loader.classList.remove("show-loader");
                loader.classList.add("hide-loader");
            }, 2000);
        });
    }
});






async function getWeather(event) {
    event.preventDefault();  
    let poblacionElegida = poblacion.options[poblacion.selectedIndex].text;
    
    console.log("🌍 Población elegida:", poblacionElegida);
    if (poblacionElegida) {

        let UrlWeather = `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(poblacionElegida)}/EN`;
        const  ApiKey = getApiKey(ListApiKey);

        console.log("ApiKey Usada:", ApiKey);
        let options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': ApiKey,
                'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(UrlWeather, options);
            const data = await response.json();

            console.log("✅ Respuesta de la API de clima:", data);

            // Verificar que la API devuelve datos válidos
            if (!data.main || !data.weather) {
                console.error("⚠️ Datos de clima inválidos recibidos:", data);
                return;
            }


            let fecha = getData();

            let sunRise = convertUnixToTime(data.sys.sunrise);
            let sunSet = convertUnixToTime(data.sys.sunset);

            console.log("🌞 Tiempo de sol: ", sunRise, " - ", sunSet);
            
            let latitude = data.coord.lat;
            let longitude = data.coord.lon;


            console.log("La fecha de hoy es:", fecha);
            let fahrenheit = data.main.temp; 
            let celsius = (fahrenheit - 32) * (5/9);
            let Pressure = data.main.pressure;

            let ListaDias = [];
            ListaDias = await getDataNext5Days(latitude, longitude);

            
            let Descripcion = await getDescripcion(latitude, longitude);
            let weatherData = {
                Pais: data.sys.country,
                ciudad: poblacionElegida,
                temperatura: celsius.toFixed(2) + "°C", 
                humedad: `${data.main.humidity}%`,
                viento: `${data.wind.speed} km/h`,
                WeekDay: fecha[0],
                Day: fecha[1],
                Month: fecha[2],
                Year: fecha[3],
                sunRise: sunRise,
                sunSet: sunSet,
                descripcion: Descripcion,
                DaysList : ListaDias,
                Pressure: Pressure
            };
            


            console.log("Latitud:", latitude);
            console.log("Longitud:", longitude);




            console.log("Los 5 dias son: ", ListaDias);
            // Guardar en localStorage sin sobreescribir las fotos
            let storedData = JSON.parse(localStorage.getItem("info")) || {};
            storedData.clima = weatherData;
            storedData.mapa = {
                latitud: latitude,
                longitud: longitude
            };
            localStorage.setItem("info", JSON.stringify(storedData));

            console.log("☁️ Datos del clima guardados en localStorage:", weatherData);


            window.location.href = "weather.html";

        } catch (error) {
            console.error("❌ Error al obtener el clima:", error);
        }
    } else {
        console.log("⚠️ No se ha seleccionado una población.");
    }
}








function getData() {
    let hoy = new Date();

    let DiaSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let diaDelMes = hoy.getDate();  // Día del mes (1-31)
    let mes = hoy.getMonth() + 1;   // Mes (0-11, por eso se suma 1)
    let anio = hoy.getFullYear();   // Año completo (por ejemplo, 2025)

    console.log("Hoy es: " + DiaSemana[hoy.getDay()] + ", " + diaDelMes + "/" + mes + "/" + anio);

    let ListaDatos = [DiaSemana[hoy.getDay()], diaDelMes, mes, anio];

    return ListaDatos
}



async function getDescripcion(lat, lon) {

    let Url = "https://weather-api167.p.rapidapi.com/api/weather/forecast?lon="+lon+"&lat="+lat+"&cnt=3&units=standard&type=three_hour&mode=json&lang=en";

    const  ApiKey = getApiKey(ListApiKey);

    console.log("ApiKey Usada:", ApiKey);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': ApiKey,
            'X-RapidAPI-Host': 'weather-api167.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(Url, options);
        const result = await response.json();
        console.log("el resultado de la descripcion es: ", result);

        let Lista = result.list;

        const descripcion = Lista.map(reg => `${convertUnixToTime(reg.dt)} : ${reg.summery}`).join(".\n");

        console.log("La descripcion es: ", descripcion);

        return descripcion;
        
    } catch (error) {
        console.error(error);

        return "unknown";
    }

}


function convertUnixToTime(timestamp) {
    // Crear un objeto Date a partir del timestamp (multiplicamos por 1000 porque el timestamp está en segundos)
    let date = new Date(timestamp * 1000);
    
    // Obtener las horas y minutos
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Formatear el tiempo para que los minutos siempre tengan 2 dígitos
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    // Determinar si es AM o PM
    let period = hours >= 12 ? "PM" : "AM";
    
    // Ajuste de la hora para formato de 12 horas
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;  // Ajuste para la medianoche (00:00) que debería ser 12 AM
    
    // Retornar el tiempo formateado como "hh:mm AM/PM"
    return `${hours}:${minutes} ${period}`;
}



async function getDataNext5Days(lat, lon) {

    let url = "https://easy-weather1.p.rapidapi.com/daily/5?latitude="+lat+"&longitude="+lon;
    const ApiKey = getApiKey(ListApiKey);
    console.log("ApiKey Usada:", ApiKey);
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': ApiKey, 
            'x-rapidapi-host': 'easy-weather1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("el resultado de los 5 dias es: ", result);

        let ListaDias = [];
        FechaHoy = await getData();
        for (let i = 0; i < 5; i++) {
            let DiasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let Precepitation = result.forecastDaily.days[i].precipitationType;
            let TempMax = result.forecastDaily.days[i].temperatureMax;
            let TempMin = result.forecastDaily.days[i].temperatureMin;
            

            let Day = SumarDias(getFormattedDate(), i+1).getDate();

            let Month = SumarDias(getFormattedDate(), i+1).getMonth()+1;

            let Year = SumarDias(getFormattedDate(), i+1).getFullYear();

            let DiaSemana = DiasSemana[SumarDias(getFormattedDate(), i+1).getDay()];

            let FechaHoy = [DiaSemana, Day, Month, Year];


            //console.log("La fecha de hoy es: ", FechaHoy);
            let DateDay = {
                Precipitation: Precepitation,
                TempMax: TempMax,
                TempMin: TempMin,
                WeekDay: DiaSemana,
                Day: Day,
                Month: Month,
                Year: Year
                
            }
            console.log("Los datos del dia son: ", DateDay);
            ListaDias.push(DateDay);
        }

        return ListaDias;
    } catch (error) {
        console.error(error);
        return null;
    }
}



function SumarDias(fecha, dias) {
    let date = new Date(fecha);
    date.setDate(date.getDate() + dias);
    return date;
}

function getFormattedDate() {
    const date = new Date();
    
    // Obtener el año, mes y día
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0, por lo que sumamos 1
    const day = String(date.getDate()).padStart(2, '0'); // Añadimos ceros a la izquierda si el día o mes son menores a 10
    
    // Retornar la fecha en formato "yyyy-mm-dd"
    return `${year}-${month}-${day}`;
}


let ButtonLocation = document.getElementById("myLocationWeather");
let loader = document.getElementById("loader-container");

ButtonLocation.addEventListener("click", async () => {
    if (navigator.geolocation) {
        // Mostrar loader con fade-in cuando empiece el proceso
        loader.classList.remove("hide-loader");
        loader.classList.add("show-loader");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log("📍 Coordenadas obtenidas:", latitude, longitude);

                try {
                    // Llamar a la API del clima con las coordenadas
                    let LocalWeather = await getWeatherLocal(latitude, longitude);

                    // Guardar el clima en localStorage
                    localStorage.setItem('LocalWeather', JSON.stringify(LocalWeather));

                    // Ocultar loader con fade-out después de un tiempo
                    setTimeout(() => {
                        loader.classList.remove("show-loader");
                        loader.classList.add("hide-loader");

                        // Redirigir a la página de clima local
                        window.location.href = "MyLocationWeather.html";
                    }, 2000);  // 2 segundos

                } catch (error) {
                    console.error("❌ Error al obtener el clima:", error);
                    alert("Hubo un problema al obtener el clima.");
                    
                    // Ocultar loader si ocurre un error
                    loader.classList.remove("show-loader");
                    loader.classList.add("hide-loader");
                }
            },
            (error) => {
                console.error("❌ Error obteniendo la ubicación:", error.message);
                alert("No se pudo obtener tu ubicación.");

                // Ocultar loader si hay error al obtener la ubicación
                loader.classList.remove("show-loader");
                loader.classList.add("hide-loader");
            }
        );
    } else {
        alert("Tu navegador no soporta la geolocalización.");
    }
});



let LocalAPiKeys =[
    "ace3e67ac3msh4795bd84918a514p1037b5jsn7ec17eadc8f4",
    "7fa41de862msh2278be01afd383ep183d35jsnb858e75b67f5",
    "2bced06a66msh17512c9a548b15ep1a0c3ejsn59c8ae0e6b21",
    "69cb8c9176msh3b4843762cf9400p152978jsnace62a426991",
    "28846a0868mshbdfc58ac74c98bep1bcc17jsn43e9c7a4d734",
    "a503f88f86msh2d76b32b6011f14p12374fjsn93389c2ccc10",
    "9f758ac81emsh8f9c99ec0fb56ebp133d35jsnb49e75c8b362"
]

async function getWeatherLocal(lat, lon) {
    let URLLocal = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat="+lat+"&lon="+lon;
    let ApiKey = getApiKey(LocalAPiKeys);
    console.log("ApiKey Usada:", ApiKey);
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': ApiKey,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(URLLocal, options);
        const result = await response.json();
        let LocationWeather = {
            Temp : result.temp,
            FeelsLike : result.feels_like,
            CloudPct : result.cloud_pct,
            Humidity  : result.humidity,
            MinTemp  : result.min_temp,
            MaxTemp  : result.max_temp,
            WindSpeed  : result.wind_speed,
            WindDegrees  : result.wind_degrees,
            Sunrise  : convertUnixToTime(result.sunrise),
            Sunset  : convertUnixToTime(result.sunset)
        }

        console.log("el resultado de la localizacion es: ", LocationWeather);
        return LocationWeather
        
    } catch (error) {
        console.error(error);
    }
}


