
document.addEventListener('DOMContentLoaded', async () => {

    const pathUrl = 'http://66.175.233.101:3000'; // Produccion
    // const pathUrl = 'http://localhost:3000'; // desarrollo
    const urlMapa = `${pathUrl}/api/dash/personas`;
    const urlFiltroSeccion = `${pathUrl}/api/dash/filtroseccion`;

    const loading = document.querySelector('.contendor-loading');
    let marker; 

    // ================== MAPA ================== //

    loading.style.display = 'flex'; // Mostramos el loading

    let markersCluster = L.markerClusterGroup();
    markersCluster.clearLayers(); // limpiamos todos los puntos agrupados

    let map = L.map('map', {
        zoomControl: false,
        gestureHandling: true
    }).setView([19.637319, -90.685976], 15);

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';

    map.addControl(new L.Control.Zoom({
        zoomInText: '+',
        zoomInTitle: 'Acercar',
        zoomOutTitle: 'Alejar',
        zoomOutText: '-',
        position: 'bottomright'
    }));

    var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        pane: 'labels'
    }).addTo(map);

    let customIcon = new L.Icon({
        iconUrl: 'img/point.png',
        iconSize: [10, 15]
    });

    // let marker;

    // L.tileLayer();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 25,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var info = L.control();
    info.onAdd = function (map) {
        var div = L.DomUtil.create('div', '');
        // div.innerHTML = '<span class="info-box-icon"></span><div class="info-box-content personalizar"><div class="iconpersonal"><i class="fa-solid fa-gear iconop"></i></div><div class="poner-columnas"><span class="info-box-text">Elementos:</span><span class="info-box-number" id="qty_elements">0</span></div></div>';
        div.innerHTML = '<div class="personalizar"><div class="iconpersonal"><i class="fa-solid fa-gear iconop"></i></div><div class="poner-columnas"><span class="info-box-text">Elementos:</span><span class="info-box-number" id="qty_elements">0</span></div></div>';
        return div;
    }; // <i class="fa-solid fa-gear"></i>
    info.addTo(map);

    L.Control.Watermark = L.Control.extend({
        onAdd: function(map) {
            var img = L.DomUtil.create('img');
            img.src = 'img/logo.png';
            img.style.width = '95px';

            return img;
        },

        onRemove: function(map) {
            // Nothing to do here
        }
    });

    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    }

    L.control.watermark({ position: 'bottomleft' }).addTo(map);

    $('.select2').select2({
        width: '100%'
    })
    $('.select2bs4').select2({
        theme: 'bootstrap4',
        width: '100%'
    });

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

            $("#qty_elements").html(`${resultadoPersonas['personas'].length}`); // Agreamos el total

            if(resultadoPersonas['personas'].length > 0) {
                resultadoPersonas['personas'].forEach(per => {
                    // Creamos la tabla dinamicamente con la BD
                    marker = L.marker([per['latitud'], per['longitud']], {icon: customIcon}).addTo(map);
                    // marker.bindTooltip(`<div align='left'><b>Nombre: </b>${per['nombre']}<br/><b>Seccion: </b>${per['seccion']}</br><b>Colonia: </b>${per['colonia']}</br><b>Intencion de voto: </b>${per['intencionvoto']}</br></div>`, {
                    //     direction: 'top',
                    //     sticky: true
                    // });
                    marker.bindPopup(`<div align='left'><b>Nombre: </b>${per['nombre']}<br/><b>Seccion: </b>${per['seccion']}</br><b>Colonia: </b>${per['colonia']}</br><b>Intencion de voto: </b>${per['intencionvoto']}</br></div>`);
                    markersCluster.addLayer(marker);
                    map.addLayer(markersCluster);
                });
            } else {
                console.log('No hay Elementos');
            }
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

    var sidebar = L.control.sidebar('sidebar').addTo(map);

    // ======================= filtro por seccion ======================= //
    

});