import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export class Busquedas{

    constructor(){
        this.historial = []
    }

    async searchCity(lugar = ''){
        //const res = await axios.get('https://reqres.in/api/users?page=2');
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: {
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es'
            }
        });

        const res = await instance.get();
        
        return res.data.features.map(element=>({
            id: element.id,
            cuidad: element.place_name,
            lng: element.center[0],
            lat: element.center[1]
        }));
    }
}