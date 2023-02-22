
document.addEventListener('DOMContentLoaded', async () => {
    
    // constantes 
    const pathUrl = 'http://66.175.233.101:3000';
    // const pathUrl = 'http://localhost:3000';
    const urlLogin = `${pathUrl}/api/login/adminrenovar`;
    const urlEstadisticas = `${pathUrl}/api/dash/estadisticas`;
    const token = localStorage.getItem('x-token');

    const nombreAdministrador = document.querySelector("#nombreAdmin");

    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");
    const themeToggler = document.querySelector(".theme-toggler");

    const beisbol = document.querySelector('#beisbol');
    const futbol = document.querySelector('#futbol');
    const basquetbol = document.querySelector('#basquetbol');

    const beisbolpor = document.querySelector('#beisbolpor');
    const futbolpor = document.querySelector('#futbolpor');
    const basquetpor = document.querySelector('#basquetbolpor');

    const barraProgresoBeisbol = document.querySelector('#barraProgresoBeisbol');
    const barraProgresoFutbol = document.querySelector('#barraProgresoFutbol');
    const barraProgresoBasquet = document.querySelector('#barraProgresoBasquetbol');

    // TABLA POR COLONIA
    const centroBeis = document.querySelector('#centro-beis');
    const centroFut = document.querySelector('#centro-fut');
    const centroBasquet = document.querySelector('#centro-basquet');
    
    const guadalupeBeis = document.querySelector('#guadalupe-beis');
    const guadalupeFut = document.querySelector('#guadalupe-fut');
    const guadalupeBasquet = document.querySelector('#guadalupe-basquet');

    const tiziminBeis = document.querySelector('#tizimin-beis');
    const tiziminFut = document.querySelector('#tizimin-fut');
    const tiziminBasquet = document.querySelector('#tizimin-basquet');

    const hornosBeis = document.querySelector('#hornos-beis');
    const hornosFut = document.querySelector('#hornos-fut');
    const hornosBasquet = document.querySelector('#hornos-basquet');
    
    // estadisticas por ciudad
    const seybaplaya = document.querySelector('#seybaplaya');
    const xkeulil = document.querySelector('#xkeulil');
    const villamadero = document.querySelector('#villamadero');

    const seybaplayaPor = document.querySelector('#por-seybaplaya');
    const xkeulilPor = document.querySelector('#por-xkeulil');
    const villamaderoPor = document.querySelector('#por-villamadero');

    // loading
    // const footer = document.querySelector('.mostrar-footer');
    const loading = document.querySelector('.contendor-loading');

    // verificar si tiene el token valido
    // footer.style.display = 'none';
    loading.style.display = 'flex';
    try {
        const resp = await fetch(urlLogin, { 
            method: 'GET',
            headers: {
                'x-token': token,
                'Content-Type': 'application/json',
            }
        });
        const resultado = await resp.json();
        if(resultado['ok'] == false) {
            localStorage.removeItem('x-token');
            window.location.href = '/login.html';
            return;
        } else {
            const nombreAdmin = resultado['admin']['nombre'].split(' ');
            nombreAdministrador.innerHTML = nombreAdmin[0]; // mostramos en la vista el nombre del administrador
            localStorage.setItem('nombre-admin', nombreAdmin[0]);
            localStorage.setItem('x-token', resultado['token']);
            peticionEstadisticas();
        }
    } catch (error) {
        console.log(error);
    }

    // mostrar aside
    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    });

    // cerrar aside
    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    });

    // cambiar tema
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');

        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    }); 

    // funcion para pintar las estadisticas desde la DB
    async function peticionEstadisticas() {
        try {
            const resp = await fetch(urlEstadisticas, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const resultado = await resp.json();
            if(resultado['ok']) {
                loading.style.display = 'none';
                // footer.style.display = 'block';
                beisbol.innerHTML = resultado['beisbol'];
                futbol.innerHTML = resultado['futbol'];
                basquetbol.innerHTML = resultado['basquetbol'];
                
                beisbolpor.innerHTML = `${resultado['porcentajeBeisbol']}%`;
                futbolpor.innerHTML = `${resultado['porcentajeFutbol']}%`;
                basquetpor.innerHTML = `${resultado['porcentajeBasquetbol']}%`;

                // Barra de progreso
                const beisbolCalc = (68 * Number(resultado['porcentajeBeisbol'])) / 100;
                const futbolCalc = (68 * Number(resultado['porcentajeFutbol'])) / 100;
                const basquetCalc = (68 * Number(resultado['porcentajeBasquetbol'])) / 100;

                // PORCENTAJE DE LA DONA
                barraProgresoBeisbol.style.strokeDashoffset = `calc(440 - (440 * ${beisbolCalc})/100)`;
                barraProgresoFutbol.style.strokeDashoffset = `calc(440 - (440 * ${futbolCalc})/100)`;
                barraProgresoBasquet.style.strokeDashoffset = `calc(440 - (440 * ${basquetCalc})/100)`;

                // TABLA DE VOTOS POR COLONIA
                centroBeis.innerHTML = `${resultado['centroBeis']}`;
                centroFut.innerHTML = `${resultado['centroFut']}`;
                centroBasquet.innerHTML = `${resultado['centroBasquet']}`;

                guadalupeBeis.innerHTML = `${resultado['guadalupeBeis']}`;
                guadalupeFut.innerHTML = `${resultado['guadalupeFut']}`;
                guadalupeBasquet.innerHTML = `${resultado['guadalupeBasquet']}`;

                tiziminBeis.innerHTML = `${resultado['tiziminBeis']}`;
                tiziminFut.innerHTML = `${resultado['tiziminFut']}`;
                tiziminBasquet.innerHTML = `${resultado['tiziminBasquet']}`;

                hornosBeis.innerHTML = `${resultado['hornosBeis']}`;
                hornosFut.innerHTML = `${resultado['hornosFut']}`;
                hornosBasquet.innerHTML = `${resultado['hornosBasquet']}`;

                seybaplaya.innerHTML = `${resultado['seybaplaya']}`;
                xkeulil.innerHTML = `${resultado['xkeulil']}`;
                villamadero.innerHTML = `${resultado['villamadero']}`;

                const totalCiudad = resultado['total'];
                const porSeybaplaya = (parseInt(resultado['seybaplaya']) * 100) / totalCiudad;
                const porXkeulil = (parseInt(resultado['xkeulil']) * 100) / totalCiudad;
                const porVillamadero = (parseInt(resultado['villamadero']) * 100) / totalCiudad;
                
                // TENEMOS EL PORCENTAJE POR CIUDAD
                seybaplayaPor.innerHTML = `${porSeybaplaya}%`;
                xkeulilPor.innerHTML = `${porXkeulil}%`;
                villamaderoPor.innerHTML = `${porVillamadero}%`;
            }
        } catch (error) {
            console.log(error);
        }
    } 
});
