import { menuPrincipal, menuCuidades, confirmacion, input } from "./helpers/vistas.js";
import { Busquedas } from "./models/busquedas.js";

const main = async()=>{
    let opt = 0;
    const busquedas = new Busquedas();

    if(busquedas.leerDb()){
        busquedas.historial = busquedas.leerDb();
    }
            
    do{
        opt = await menuPrincipal();
        switch(opt){            
            case 1:
                const city = await input();
                const lugares = await busquedas.searchCity(city);
                const id = await menuCuidades(lugares);
                const lugarSeleccionado = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSeleccionado.cuidad)
                console.log(busquedas.historial);
                busquedas.guardarDb();

                const clima = await busquedas.searchCityWeather(lugarSeleccionado.lat, lugarSeleccionado.lng);

                console.log(`${'=============================='.yellow}`);
                console.log(`${'='.yellow}    ${'Así esta el clima!!'.blue}    ${'='.yellow}`);
                console.log(`${'=============================='.yellow}`);
                console.log(`Ciudad: ${clima.city}`);
                console.log(`Longitud: ${lugarSeleccionado.lng}`);
                console.log(`Altitud: ${lugarSeleccionado.lat}`);
                console.log(`Temperatura: ${clima.temp}`);
                console.log(`Temperatura mínima: ${clima.temp_min}`);
                console.log(`Temperatura máxima: ${clima.temp_max}`);
                console.log(`Descripción: ${clima.description}`);

                break;
            case 2:
                console.log(busquedas.historial.forEach(c => console.log(c)));
        }

        await confirmacion();
    } while(opt !== 0)
}

main();