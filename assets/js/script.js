let artista = document.getElementById("artista");
let cancion = document.getElementById("cancion");
let buscar = document.getElementById("buscar");
let letraDiv = document.getElementById("letra");

buscar.addEventListener("click", () => buscarLetra(artista.value, cancion.value));

async function buscarLetra(artista, cancion) {
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`);
        const data = await response.json();
        console.log(data);
        mostrarLetra(data.lyrics);
    } catch (error) {
        console.log('No se encuentra letra para esa canción');
    }
}

function mostrarLetra(letra) {
    letra = letra.replace(/\/r\//g, '<br>'); // Reemplaza /r/ por <br>
    letra = letra.replace(/\n/g, '<br>'); // Reemplaza saltos de línea por <br>
    
    const lineas = letra.split('<br>'); // Crea un array con las líneas
    const lineasFiltradas = lineas.filter(linea => linea.trim() !== ''); // Elimina líneas vacías
    console.log(lineasFiltradas); // Muestra el array de líneas filtradas

    letraDiv.innerHTML = ''; // Limpia el contenido previo

    for (let i = 0; i < lineasFiltradas.length; i++) {
        let p = document.createElement('p');
        p.innerHTML = `<img src="https://espacios.adeituv.es/wp-content/uploads/comillas-png-negras.jpg" class="w-15/2 h-5"> ${lineasFiltradas[i]} <img src="https://espacios.adeituv.es/wp-content/uploads/comillas-png-negras.jpg" class="w-15/2 transform rotate-180 h-5  ">`; // Asigna el texto de la línea filtrada
        p.className = 'text-red-400 text-xl my-4 font-bold italic bg-white rounded-md p-4 text-center items-center justify-center flex flex-row'; // Asigna una clase al párrafo
        letraDiv.appendChild(p); // Agrega el párrafo al contenedor
    }
}
