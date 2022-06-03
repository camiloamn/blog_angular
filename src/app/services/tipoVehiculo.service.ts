import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from "@angular/common/http";
import { identity} from 'rxjs';//cambie la ruta quite el identiy identity
//import { identity, observable} from 'rxjs'; tenia unida en una sola este import
import { Observable } from "rxjs"; 
import { TipoVehiculos } from "../models/tipovehiculos"; 
import { global } from "./global";
import { param } from "jquery";

//definir la clase de servicios 
@Injectable()
export class tipoVehiculoService {
    public url:string;
    public token:any;
    //public identity:any;
    
    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }
    //metodo que nos permite crear una nueva clase de vehiculo
    create(token:any, tipovehiculos:any):Observable<any>{
        let json = JSON.stringify(tipovehiculos);//la convierto en un json string
        let params = "json="+json;//defino la variable params y los datos qu ele paso por post
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        //console.log(params+'aqui esta el error');
        return this._http.post(this.url+'store', params, {headers: headers});//peticion ajax

    }
    //metodo que nos permite listar los vehiculos
        getTipoVehiculos():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        //metodo que ya lo voy a poder utilizar en la app.component.ts ya que es la vista del menu y es le componente padre 
        return this._http.get(this.url + 'tipoVehiculos', {headers: headers});
    }
}