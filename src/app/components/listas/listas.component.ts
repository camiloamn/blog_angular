import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
import { listasService } from 'src/app/services/listas.service';
import { Listas } from 'src/app/models/listas';
import { TDocumentos } from 'src/app/models/tDocumentos';
import { tDocumentosService } from 'src/app/services/tDocumentos.service';
import { Vehiculos } from 'src/app/models/vehiculos';
import { NgModule } from '@angular/core';//agrgee esto nuevo
import { NgForm } from '@angular/forms';//agrgee esto nuevo


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
  providers: [UserService, listasService, tDocumentosService]
})
export class ListasComponent implements OnInit {

    public page_tittle: string;
    public identity: any;
    public token: any;
    public lista: Listas;
    public status: string | undefined;
    public data: any;
    public nombre: any;
    public placa: any;
    public vehiculos: any;
    public tDocumentos: any;
    public documento : any=[];
    //public status: string | undefined;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _listasService: listasService,
    private _userService: UserService
    
  ){
    this.lista = new Listas(0,0,0,0,'','','');
    this.page_tittle = 'Crear listas';
    //this.array = JSON.parse(localStorage.getItem('identity') + '');
    //this.tDocumento = new TDocumentos(0,'', this.array['id']);
    
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._listasService.getAllDocumentos({}).subscribe(

    response=>{
      this.tDocumentos = response;
      console.log("ressspuestaaa!!!!!!!!");
      console.log(this.tDocumentos);
      
    }  
    );
    
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
    this._listasService.store(this.token, this.lista).subscribe(
      response => {
        if(response.status == 'success'){
          this.lista = response.listas;
          this.status = 'success';
          this._router.navigate(['/listas']);
        }else{
          this.status = 'error';
        }

      },
      error => {
        console.log(error);
        this.status = 'error';
      }

    );
  }
  getDatos(result : any) {
    console.log(result);
    this.nombre = result.nombre;
    this.placa = result.placa;
}

 getGener02(pclave : any) {
      const keyword = pclave.target.value;
      const search = this._listasService.buscador(keyword).then(response => {
          this.data = response;
      })
  }



}
