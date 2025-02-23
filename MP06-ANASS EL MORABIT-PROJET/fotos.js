document.addEventListener("DOMContentLoaded", function () {

    let storedData = JSON.parse(localStorage.getItem("info"));
    let clima = storedData.clima;

    // Recupera las imágenes desde el localStorage
    const imageUrls = JSON.parse(localStorage.getItem("fotos")) || [];

    // Obtiene el contenedor de la galería
    const galleryContainer = document.getElementById('gallery-container');

    // Verifica si hay imágenes
    if (imageUrls.length === 0) {
        galleryContainer.innerHTML = "<p>No se han encontrado imágenes.</p>";
        galleryContainer.style.textAlign = "center";
        galleryContainer.style.padding = "80px";
        galleryContainer.style.color = "white";
        return;
    }

    // Cambia el texto de la descripción
    document.querySelector("#inicio #descripcion").textContent = "Fotos de " + clima.ciudad + ", " + clima.Pais;

    // Crea los elementos de imagen en la galería
    imageUrls.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Imagen de la población";
        galleryContainer.appendChild(img);
    });
});
