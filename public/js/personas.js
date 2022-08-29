
document.addEventListener('DOMContentLoaded', async () => {

    const pathUrl = 'http://31.220.31.215:3000';
    const urlPersonas = `${pathUrl}/api/dash/personas`;

    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");
    const selectNombreAdmin = document.querySelector("#nombreAdmin");

    const themeToggler = document.querySelector(".theme-toggler");
    
    const tbody = document.querySelector("#tBody"); // Aqui agregamos los tr que se generan dinamicamente

    const footerMostrar = document.querySelector('.mostrar-footer');
    const loading = document.querySelector('.contendor-loading');

    const nombreAdmin = localStorage.getItem('nombre-admin');
    selectNombreAdmin.innerHTML = nombreAdmin; // Agregamos el nombre del administrador

    // TRAEMOS TODAS LAS PESONAS ENCUESTADAS DE LA DB
    footerMostrar.style.display = 'none';
    loading.style.display = 'flex';

    try {
        const resp = await fetch(urlPersonas, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const resultadoPersonas = await resp.json();
        if(resultadoPersonas['ok']) {
            loading.style.display = 'none';
            footerMostrar.style.display = 'block';
            resultadoPersonas['personas'].forEach(per => {
                // Creamos la tabla dinamicamente con la BD
                const trBody = document.createElement('tr');

                const tdBody1 = document.createElement('td');
                const tdBody2 = document.createElement('td');
                const tdBody3 = document.createElement('td');
                const tdBody4 = document.createElement('td');
                const tdBody5 = document.createElement('td');
                const tdBody6 = document.createElement('td');

                tdBody1.innerHTML = per['nombre'];
                tdBody2.innerHTML = per['edad'];
                tdBody3.innerHTML = per['ciudad'];
                tdBody4.innerHTML = per['colonia'];
                tdBody5.innerHTML = per['intencionvoto'];
                tdBody6.innerHTML = per['seccion'];

                trBody.appendChild(tdBody1);
                trBody.appendChild(tdBody2);
                trBody.appendChild(tdBody3);
                trBody.appendChild(tdBody4);
                trBody.appendChild(tdBody5);
                trBody.appendChild(tdBody6);

                tbody.appendChild(trBody);

            });
        }
    } catch (error) {
        console.log(error);
    }

    // FIN DE TRAER TODAS LAS PESONAS ENCUESTADAS DE LA DB


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

    $(document).ready(function() {    
        $('#example').DataTable({        
            language: {
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "zeroRecords": "No se encontraron resultados",
                    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sSearch": "Buscar:",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast":"Último",
                        "sNext":"Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "sProcessing":"Procesando...",
                },
            //para usar los botones   
            responsive: "true",
            dom: 'Bfrtilp',       
            buttons:[ 
                {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i> ',
                    titleAttr: 'Exportar a Excel',
                    className: 'btn btn-success'
                },
                {
                    extend:    'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: 'Exportar a PDF',
                    className: 'btn btn-danger'
                },
                {
                    extend:    'print',
                    text:      '<i class="fa fa-print"></i> ',
                    titleAttr: 'Imprimir',
                    className: 'btn btn-info'
                },
            ]	        
        });     
    });
});