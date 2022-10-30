import fs from 'fs';

import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export class Busquedas{

    constructor(){
        this.historial = [];
        this.path = './db/database.json'
    }

    async searchCity(lugar = ''){
        //const res = await axios.get('https://reqres.in/api/users?page=2');
        try{
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
        } catch(err){
            console.log(err);
        }       
    }

    async searchCityWeather(lat, lon){

        try{
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': lat,
                    'lon': lon,
                    'appid': process.env.OPEN_WEATHER,
                    'units': 'metric',
                    'lang': 'es'
                }
            })

            const res = await instance.get();

            return {
                city: res.data.name,
                temp: res.data.main.temp,
                temp_min: res.data.main.temp_min,
                temp_max: res.data.main.temp_max,
                description: res.data.weather[0].description,
            }

        } catch(err){
            console.log(err);
        }        
    }

    async agregarHistorial(lugar = ''){
        if(!this.historial.includes(lugar)){
            this.historial.unshift(lugar);   
        }else{
            this.historial.splice(this.historial.indexOf(lugar), 1);
            this.historial.unshift(lugar)
        }
    }

    guardarDb(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.path, JSON.stringify(payload));
    }
 
    leerDb(){
        if(fs.existsSync(this.path)){
            const obj = fs.readFileSync(this.path, {encoding: 'utf-8'});
            const historial = JSON.parse(obj);
            return historial.historial;
        } else{
            return null;
        }
    }
}
    