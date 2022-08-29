
document.addEventListener('DOMContentLoaded', async () => {
    
    // constantes 
    const pathUrl = 'http://localhost:3000';
    const urlLogin = `${pathUrl}/api/login/adminrenovar`;
    const urlEstadisticas = `${pathUrl}/api/dash/estadisticas`;
    const token = localStorage.getItem('x-token');

    const nombreAdministrador = document.querySelector("#nombreAdmin");

    const sideMenu = document.querySelector("aside");
    const menuBtn = document.querySelector("#menu-btn");
    const closeBtn = document.querySelector("#close-btn");
    const themeToggler = document.querySelector(".theme-toggler");

    const moci = document.querySelector('#moci');
    const morena = document.querySelector('#morena');
    const pri = document.querySelector('#pri');

    const mocipor = document.querySelector('#mocipor');
    const morenapor = document.querySelector('#morenapor');
    const pripor = document.querySelector('#pripor');

    const barraProgresoMoci = document.querySelector('#barraProgresoMoci');
    const barraProgresoMorena = document.querySelector('#barraProgresoMorena');
    const barraProgresoPri = document.querySelector('#barraProgresoPri');

    // TABLA POR COLONIA
    const centroMoci = document.querySelector('#centro-moci');
    const centroMorena = document.querySelector('#centro-morena');
    const centroPri = document.querySelector('#centro-pri');
    
    const guadalupeMoci = document.querySelector('#guadalupe-moci');
    const guadalupeMorena = document.querySelector('#guadalupe-morena');
    const guadalupePri = document.querySelector('#guadalupe-pri');

    const tiziminMoci = document.querySelector('#tizimin-moci');
    const tiziminMorena = document.querySelector('#tizimin-morena');
    const tiziminPri = document.querySelector('#tizimin-pri');

    const hornosMoci = document.querySelector('#hornos-moci');
    const hornosMorena = document.querySelector('#hornos-morena');
    const hornosPri = document.querySelector('#hornos-pri');
    
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
                moci.innerHTML = resultado['moci'];
                morena.innerHTML = resultado['morena'];
                pri.innerHTML = resultado['pri'];
                
                mocipor.innerHTML = `${resultado['porcentajeMoci']}%`;
                morenapor.innerHTML = `${resultado['porcentajeMorena']}%`;
                pripor.innerHTML = `${resultado['porcentajePri']}%`;

                // Barra de progreso
                const mociCalc = (68 * Number(resultado['porcentajeMoci'])) / 100;
                const morenaCalc = (68 * Number(resultado['porcentajeMorena'])) / 100;
                const priCalc = (68 * Number(resultado['porcentajePri'])) / 100;

                // PORCENTAJE DE LA DONA
                barraProgresoMoci.style.strokeDashoffset = `calc(440 - (440 * ${mociCalc})/100)`;
                barraProgresoMorena.style.strokeDashoffset = `calc(440 - (440 * ${morenaCalc})/100)`;
                barraProgresoPri.style.strokeDashoffset = `calc(440 - (440 * ${priCalc})/100)`;

                // TABLA DE VOTOS POR COLONIA
                centroMoci.innerHTML = `${resultado['centroMoci']}`;
                centroMorena.innerHTML = `${resultado['centroMorena']}`;
                centroPri.innerHTML = `${resultado['centroPri']}`;

                guadalupeMoci.innerHTML = `${resultado['guadalupeMoci']}`;
                guadalupeMorena.innerHTML = `${resultado['guadalupeMorena']}`;
                guadalupePri.innerHTML = `${resultado['guadalupePri']}`;

                tiziminMoci.innerHTML = `${resultado['tiziminMoci']}`;
                tiziminMorena.innerHTML = `${resultado['tiziminMorena']}`;
                tiziminPri.innerHTML = `${resultado['tiziminPri']}`;

                hornosMoci.innerHTML = `${resultado['hornosMoci']}`;
                hornosMorena.innerHTML = `${resultado['hornosMorena']}`;
                hornosPri.innerHTML = `${resultado['hornosPri']}`;

                seybaplaya.innerHTML = `${resultado['seybaplaya']}`;
                xkeulil.innerHTML = `${resultado['xkeulil']}`;
                villamadero.innerHTML = `${resultado['villamadero']}`;

                const totalCiudad = 50;
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
