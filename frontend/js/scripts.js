const apiUrl = 'http://localhost:3000/paquetes'; // Reemplaza con la URL de tu API

// Función para cargar la grilla de paquetes
function cargarPaquetes() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(paquetes => cargarTabla(paquetes));
}

// Función para buscar paquetes por descripción
function buscarPaquetes() {
    const desc = document.getElementById('buscar-input').value;

    fetch(apiUrl + `/consulta?q=${desc}`)
    .then(response => response.json())
    .then(paquetes => cargarTabla(paquetes));
}

// Función para buscar paquetes por pais
function buscarPaquetesPais() {
    const pais = document.getElementById('buscar-pais-input').value;

    fetch(apiUrl + `/${pais}`)
    .then(response => response.json())
    .then(paquetes => cargarTabla(paquetes));
}

// Función para agregar un nuevo paquete
function agregarPaquete() {
    const destino = document.getElementById('destino-input').value;
    const duracion = document.getElementById('duracion-input').value;
    const precio = document.getElementById('precio-input').value;
    const descripcion = document.getElementById('descripcion-input').value;

    let paquete = {
        destino: destino,
        duracion: duracion,
        precio: precio,
        descripcion: descripcion
    };
    let body = JSON.stringify(paquete);

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: body
    })
    .then(() => {
        cargarPaquetes();

        document.getElementById('destino-input').value = "";
        document.getElementById('duracion-input').value = "";
        document.getElementById('precio-input').value = "";
        document.getElementById('descripcion-input').value = "";
    })
}

// Función para eliminar un paquete
function eliminarPaquete(id) {
    fetch(apiUrl + `/${id}`, {
        method: 'DELETE'
    })
    .then(() => cargarPaquetes());
}

// Cargar la lista de paquetes al cargar la página
cargarPaquetes();

function cargarTabla(paquetes){
    let contenido = "";

    paquetes.forEach(p => {
        contenido += `
        <tr>
            <td>${p.destino}</td>
            <td>${p.duracion}</td>
            <td>${p.precio}</td>
            <td>${p.descripcion}</td>
            <td>
                <button type="button" class="btn btn-outline-danger" onclick="eliminarPaquete(${p.id})">Eliminar</button>
            </td>
        </tr>`
    });

    document.getElementById('lista-paquetes').innerHTML = contenido;
}