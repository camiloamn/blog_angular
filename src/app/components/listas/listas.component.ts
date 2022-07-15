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
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-listas',
  templateUrl:'./listas.component.html',
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
    public user:any;
    public bandera:any;
    //public status: string | undefined;
    //public bbb=localStorage.getItem('token');

    public afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png,.gif,.jpeg,.pdf,.txt,.docx",
      maxSize: 2,
      uploadAPI:  {
        url: global.url + 'user/upload',
        method:"POST",
        headers: {        
          "Authorization": this._userService.getToken()
        },
        responseType: 'json',
      },
      theme: "attachPin",
      hideProgressBar: true,
      hideResetBtn: true,
      hideSelectBtn: true,
      fileNameIndex: true,
      replaceTexts: {
        selectFileBtn: 'Seleccionar archivo',
        resetBtn: 'Reset',
        uploadBtn: 'Subir',
        dragNDropBox: 'Arrastrar y soltar',
        attachPinBtn: 'Sube tu avatar de usuario...',
        afterUploadMsg_success: '¡ Subido correctamente !',
        afterUploadMsg_error: '¡ Fallo en la subida !',
        sizeLimit: 'Tamaño máx.'
      }
    }; 

    /* public afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png,.txt,.doc,.xls",
      maxSize: "50",
      uploadAPI:  {
        url: global.url+'user/upload',
        method:"POST",
        headers: {
       "Content-Type" : "text/plain;charset=UTF-8",
       "Authorization" : this.bbb
        
      },
        params: {
          'page': '1'
        },
        responseType: 'blob',
        withCredentials: false,
      }, */
      /*theme: "dragNDrop",/* attachPin */
     /* hideProgressBar: false,/* mostrar barra de proceso */
      /*hideResetBtn: true,
      hideSelectBtn: false,/* el btn */
      /* hideSelectBtn: true, */
      /* fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      } */
  /* }; */

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _listasService: listasService,
    private _userService: UserService
    
  ){    
    this.lista = new Listas(0,0,0,0,'','','');
    this.page_tittle = 'Crear listas';
        
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
          form.reset();
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
 /*  listasUpload2(datos:any){
    let data = JSON.parse(datos.response);

  } */
  listasUpload(datos:any){
    console.log(datos.body.message);
    let data_image = datos.body.message;
    this.user.image = data_image;
    this.identity.image = data_image;
  }
  next(){
    //this._router.navigate(['login']);
    this.bandera=true;
    
  }
  regresar(): any{
    //this._router.navigate(['/inicio']);
    this.bandera=false;
  }
  SendDataonChange(event: any, id:any) {
    console.log(event.target.value);
    console.log('fecha inicio', 'iddddddd ',id)
    console.log(this.tDocumentos)
    }

    SendDataonChanges(event: any, id:any) {
      console.log(event.target.value);
      console.log('fecha fin', 'iddddddd ',id)
      console.log(this.tDocumentos)
      }  
}
