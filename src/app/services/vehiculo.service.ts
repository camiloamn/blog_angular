import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from "@angular/common/http";
import { identity } from 'rxjs';//cambie la ruta quite el identiy identity
//import { identity, observable} from 'rxjs'; tenia unida en una sola este import
import { Observable } from "rxjs";
import { Vehiculos } from "../models/vehiculos";
import { global } from "./global";
import { param } from "jquery";

//definir la clase de servicios 
@Injectable()
export class vehiculoService {
    public url: string;
    public token: any;
    //public identity:any;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }
    //metodo que nos permite crear guardar una nueva clase de vehiculo
    create(token: any, vehiculo: any): Observable<any> {
        let json = JSON.stringify(vehiculo);//la convierto en un json string
        let params = "json=" + json;//defino la variable params y los datos qu ele paso por post

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        //console.log(params+' aqui esta el error');
        return this._http.post(this.url + 'store', params, { headers: headers });//peticion ajax

    }
    //metodo que nos permite listar los vehiculos
    /*getVehiculos(datos: any): Observable<any> {
        let json = JSON.stringify(datos);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        //metodo que ya lo voy a poder utilizar en la app.component.ts ya que es la vista del menu y es le componente padre 
        return this._http.post(this.url + '', params, { headers: headers });
    }*/
    
}   