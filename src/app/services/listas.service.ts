import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from "@angular/common/http";
import { identity } from 'rxjs';//cambie la ruta quite el identiy identity
import { Observable } from "rxjs";
import { Listas } from "../models/listas";
import { global } from "./global";
import { param } from "jquery";

//definir la clase de servicios 
@Injectable()
export class listasService {
    public url: string;
    public token: any;
    public identity:any;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }
    //metodo que nos permite crear un nuevo tipo de vehiculo y guardarlo
        store(token: any, listas: any): Observable<any> {
        let json = JSON.stringify(listas);//la convierto en un json string
        let params = "json="+json;//defino la variable params y los datos qu ele paso por post

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        
        console.log('aquiiiiiii')
        console.log(params);
        return this._http.post(this.url + 'listas/store', params, { headers: headers });//peticion ajax

    }
    //metodo que nos permite listar los vehiculos
    getTipoVehiculos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        //metodo que ya lo voy a poder utilizar en la app.component.ts ya que es la vista del menu y es le componente padre 
        return this._http.post(this.url + 'tipo/index', { headers: headers });
    }

    getAllDocumentos(token: any): Observable<any> {

        //let json = JSON.stringify({ '': '' });
        let params = 'json={"as":"1"}';
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');//.set('Authorization',token);                         
        //console.log(params+'aqui esta el error');
        return this._http.post(this.url + 'listas/getAllDocumentos', params, { headers: headers });//peticion ajax

    }
    getListass(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + '/listas/index', {headers: headers});
    }

    buscador(pclave : any) {
        const response = new Promise(resolve => {

            this._http.get(global.url + `listas/buscador?search=${pclave}`).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
        return response;
}
}