
document.addEventListener('DOMContentLoaded', async () => {

    const pathUrl = 'http://localhost:3000';
    const urlMapa = `${pathUrl}/api/dash/personas`;
    const urlFiltroSeccion = `${pathUrl}/api/dash/filtroseccion`;

    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");
    const selectNombreAdmin = document.querySelector("#nombreAdmin");

    const themeToggler = document.querySelector(".theme-toggler");

    const loading = document.querySelector('.contendor-loading');
    const footer = document.querySelector('.mostrar-footer');
    
    const nombreAdmin = localStorage.getItem('nombre-admin');
    selectNombreAdmin.innerHTML = nombreAdmin; // Agregamos el nombre del administrador

    // mostrar aside
    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    });

    // cerrar aside
    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    });

    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');

        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    }); 

    // ================== MAPA ================== //

    footer.style.display = 'none';
    loading.style.display = 'flex'; // Mostramos el loading

    let map = L.map('map').setView([19.637319, -90.685976], 15);
    let marker;

    let customIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    // L.tileLayer();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    try {
        const resp = await fetch(urlMapa, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const resultadoPersonas = await resp.json();
        if(resultadoPersonas['ok']) {
            loading.style.display = 'none'; // Ocultamos el loading
            footer.style.display = 'block';
            resultadoPersonas['personas'].forEach(per => {
                // Creamos la tabla dinamicamente con la BD
                marker = L.marker([per['latitud'], per['longitud']], {icon: customIcon}).addTo(map);
                marker.bindTooltip(`<b>${per['nombre']}</b><br>${per['seccion']}</b><br>${per['colonia']}</b><br>${per['intencionvoto']}`, {
                    direction: 'top',
                    sticky: true
                });
                // marker.bindPopup(`<b>${per['nombre']}</b><br>${per['seccion']}</b><br>${per['colonia']}</b><br>${per['intencionvoto']}`);
            });
        }
    } catch (error) {
        console.log(error);
    }

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Diste click en estas coordenadas: " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

    // ======================= filtro por seccion ======================= //

    document.getElementById('select-seccion').addEventListener('change', async function(e){
        
        footer.style.display = 'none';
        loading.style.display = 'flex'; // Mostramos el loading
        
        const seccionVal = document.getElementById('select-seccion').value;
        map.remove();
        map = L.map('map').setView([19.637319, -90.685976], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const data = {
            "seccion": seccionVal
        }

        let customIconFiltro = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        try {
            const resp = await fetch(urlFiltroSeccion, { 
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resultadoFiltroSeccion = await resp.json();
            if(resultadoFiltroSeccion['ok']) {
                loading.style.display = 'none'; // Ocultamos el loading
                footer.style.display = 'block';
                resultadoFiltroSeccion['personas'].forEach(perFiltro => {
                    
                    let marker = L.marker([perFiltro['latitud'], perFiltro['longitud']], {icon: customIconFiltro}).addTo(map);
                    // marker.bindPopup(`<b>${perFiltro['nombre']}</b><br>${perFiltro['seccion']}</b><br>${perFiltro['colonia']}</b><br>${perFiltro['intencionvoto']}`);
                    marker.bindTooltip(`<b>${perFiltro['nombre']}</b><br>${perFiltro['seccion']}</b><br>${perFiltro['colonia']}</b><br>${perFiltro['intencionvoto']}`, {
                        direction: 'top',
                        sticky: true
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    });
    
    
    // ========================= ELIMINAR FILTRO ========================= //

    document.querySelector('#borrar-filtro').addEventListener('click', async (e) => {
        
        footer.style.display = 'none';
        loading.style.display = 'flex'; // Mostramos el loading
        
        map.remove();
        map = L.map('map').setView([19.637319, -90.685976], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let customIconBorrar = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        try {
            const resp = await fetch(urlMapa, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resultadoBorrarFiltro = await resp.json();
            if(resultadoBorrarFiltro['ok']) {
                loading.style.display = 'none'; // Ocultamos el loading
                footer.style.display = 'block';
                resultadoBorrarFiltro['personas'].forEach(perBorrar => {
                    
                    let marker = L.marker([perBorrar['latitud'], perBorrar['longitud']], {icon: customIconBorrar}).addTo(map);
                    // marker.bindPopup(`<b>${perBorrar['nombre']}</b><br>${perBorrar['seccion']}</b><br>${perBorrar['colonia']}</b><br>${perBorrar['intencionvoto']}`);
                    marker.bindTooltip(`<b>${perBorrar['nombre']}</b><br>${perBorrar['seccion']}</b><br>${perBorrar['colonia']}</b><br>${perBorrar['intencionvoto']}`, {
                        direction: 'top',
                        sticky: true
                    });
                });

                document.getElementById('select-seccion').value = "-1";
            }
        } catch (error) {
            console.log(error);
        }
    });
});