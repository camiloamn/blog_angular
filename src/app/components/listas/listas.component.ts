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
  public documento: any = [];
  public user: any;
  public bandera: any;
  public list_listaD: any = [];
  public list_new: any = [];
  //public status: string | undefined;
  //public bbb=localStorage.getItem('token');

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.txt,.docx,.pdf,.xml,.xlsx,.xls",

    maxSize: 5,
    uploadAPI: {
      url: global.url + 'user/upload',
      method: "POST",
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
    attachPinText: 'subir documentos', /*para cambiar el nombre de los doc. */
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _listasService: listasService,
    private _userService: UserService

  ) {
    this.lista = new Listas(0, 0, 0, 0, '', '', '');
    this.page_tittle = 'Crear listas';

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this._listasService.getAllDocumentos({}).subscribe(

      response => {
        this.tDocumentos = response;
        console.log("ressspuestaaa!!!!!!!!");
        console.log(this.tDocumentos);

        if (this.tDocumentos.length > 0) {
          for (let index = 0; index < this.tDocumentos.length; index++) {
            console.log("nombre ", index);
            console.log(this.tDocumentos[index].tipoDocumento);
            this.list_listaD.push({ 'id': this.tDocumentos[index].id_Documentos, 'ID_V': '', 'COD_T_VE': '', 'FI': '', 'FF': '', 'URL': '' });


          }
          console.log("listaaaa!")
          console.log(this.list_listaD);
        } else {
          console.log("No hay documentos!")
        }

      }
    );

  }

  ngOnInit(): void {
  }
  onSubmit(form: any) {
    this._listasService.store(this.token, this.lista).subscribe(
      response => {
        if (response.status == 'success') {
          this.lista = response.lista;
          this.status = 'success';
          form.reset();
          location.reload();
          //this._router.navigate(['listas']);

        } else {
          this.status = 'error';
          //form.reset();
        }

      },
      error => {

        this.status = 'error';
        console.log(error);
        form.reset();
        this._router.navigate(['listas'])

      }

    );
  }
  getDatos(result: any) {
    console.log('aquie result');
    console.log(result);
    this.nombre = result.nombre;
    this.placa = result.placa;
  }

  getGener02(pclave: any) {
    const keyword = pclave.target.value;
    const search = this._listasService.buscador(keyword).then(response => {
      this.data = response;
    })
  }
  /*  listasUpload2(datos:any){
     let data = JSON.parse(datos.response);
 
   } */
  listasUpload(datos: any, dt: any) {

    console.log('aquiii datossss')
    console.log(dt);
    datos = JSON.parse(datos.response);
    console.log(datos.image);

    for (let index = 0; index < this.list_listaD.length; index++) {
      if (this.list_listaD[index].id == dt) {
        console.log(this.list_listaD[index].id, 'id tDocumento', dt);
        this.list_listaD[index].URL = datos.image;
      }
    }
    console.log(this.list_listaD);


  }
  next(result: any) {
    console.log('aqui el result');
    console.log(result);
    for (let index = 0; index < this.list_listaD.length; index++) {
      this.list_listaD[index].ID_V = result.id_vehiculos;
      this.list_listaD[index].COD_T_VE = result.codigo;

    }
    this.nombre = result.nombre;
    this.placa = result.placa;
    //this._router.navigate(['login']);
    this.bandera = true;

  }
  regresar(): any {
    //this._router.navigate(['/inicio']);
    this.bandera = false;
  }
  SendDataonChange(event: any, id: any) {
    console.log(event.target.value);
    console.log('fecha inicio', id)
    console.log(this.tDocumentos)

    for (let index = 0; index < this.list_listaD.length; index++) {
      if (this.list_listaD[index].id == id) {
        console.log(this.list_listaD[index].id, 'id tDocumento', id);
        this.list_listaD[index].FI = event.target.value;
      }
    }
    console.log(this.list_listaD);

  }

  SendDataonChanges(event: any, id: any) {
    console.log(event.target.value);
    console.log('fecha fin', id)
    console.log(this.tDocumentos)
    for (let index = 0; index < this.list_listaD.length; index++) {

      if (this.list_listaD[index].id == id) {
        console.log(this.list_listaD[index].id, 'id tDocumento', id);
        this.list_listaD[index].FF = event.target.value;
      }
    }
    console.log(this.list_listaD);
  }
  guardar() {
    for (let index = 0; index < this.list_listaD.length; index++) {

      if (this.list_listaD[index].id == '' ||
        this.list_listaD[index].ID_V == '' ||
        this.list_listaD[index].COD_T_VE == '' ||
        this.list_listaD[index].FI == '' ||
        this.list_listaD[index].FF == '' ||
        this.list_listaD[index].URL == '') {

      }else{
        this.list_new.push(this.list_listaD[index]);
        
      }
        console.log('aqui va la list new')
        console.log(this.list_new);
    }

    if(this.list_new.length>0){
      for (let index = 0; index < this.list_new.length; index++) {
          this._listasService.store(new Listas(0,this.list_new[index].ID_V,this.list_new[index].COD_T_VE,this.list_new[index].id,this.list_new[index].FI,this.list_new[index].FF,this.list_new[index].URL));     
      }
      

    }else{

      console.log('NO HAY DATOS');
    }

  }
}
