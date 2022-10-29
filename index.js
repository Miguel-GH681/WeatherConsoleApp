import { menuPrincipal, menuCuidades, confirmacion, input } from "./helpers/vistas.js";
import { Busquedas } from "./models/busquedas.js";

const main = async()=>{
    let opt = 0;
    const busquedas = new Busquedas();

    do{
        opt = await menuPrincipal();

        switch(opt){
            case 1:
                const city = await input();
                const lugares = await busquedas.searchCity(city);
                const id = await menuCuidades(lugares);
                const lugarSeleccionado = lugares.find(l => l.id === id);
                console.log(`Latitud: ${lugarSeleccionado.lat}`);
                console.log(`Longitud: ${lugarSeleccionado.lng}`);

                break;
        }

        await confirmacion();
    } while(opt !== 0)
}

main();