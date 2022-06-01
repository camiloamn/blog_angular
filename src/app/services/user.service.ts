import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from "@angular/common/http";
import { identity, Observable } from 'rxjs';//cambie la ruta quite el identiy identity 
import { User } from "../models/user";
import { global } from "./global";
import { param } from "jquery";

//definir la clase de servicios 
@Injectable()
export class UserService {
    public url:string;
    public token:any;
    public identity:any;
    
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }
    test(){
        return "hola mundo";
    }
    //METODO DE REGISTRO
    register(user: any): Observable<any>{ // el objeto user, devuelve un observale (en donde van las respuestas del api) 
        let json = JSON.stringify(user);// el parametro u objetoz que llega lo convierto en json string 
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');//deifno las cabeceras para recibir lo de laravel  
        //console.log(params);
        return this._http.post(this.url+'register', params, {headers: headers});//hago peticion ajax 
    }
    //METODO DE IDENTIFICACION DEL USUARIO 
    signup(user: any, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = 'true';
        }           
        let json= JSON.stringify(user);      
        let params = 'json='+json;       
        //console.log(this.url+'user/login');
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post(this.url+'user/login', params, {headers:headers});//hago peticion ajax tener en cuneta la ruta de la acccion a relaizar
        
    }

    update(token:any, user:any):Observable<any>{
        let json = JSON.stringify(user);//convierto los datos en un json string 
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                         .set('Authorization', token);

        return this._http.put(this.url + 'user/update', params, {headers: headers});                               

    }

    //METODO QUE NOS TRAE LA IDENTIDAD DEL USUARIO (ID,PASSWORD)
    getIdentity(){
        let identity= JSON.parse(localStorage.getItem('identity') +''); //creo a la variable
        if(identity && identity != "undefined"){
            this.identity = identity;

        }else{
            this.identity = null;
        }

        return this.identity;
    }
    //METODO QUE NOS TRAE EL TOKEN DEL USUARIO QUE SE ENCUENTRA IDENTIFICADO
    getToken(){
        let token= localStorage.getItem('token');

        if(token && token != "undefined"){
            this.token = token;

        }else{
            this.token = null;
        }
        return this.token;
        
    }

}