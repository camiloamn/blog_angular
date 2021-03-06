import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
import { TDocumentos } from 'src/app/models/tDocumentos';
import { tDocumentosService } from 'src/app/services/tDocumentos.service';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2'; 



@Component({
  selector: 'app-t-documentos',
  templateUrl: './t-documentos.component.html',
  styleUrls: ['./t-documentos.component.css'],
  providers: [UserService, tDocumentosService]
})
export class TDocumentosComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public tDocumento: any = TDocumentos
  public status: string | undefined;
  public array:any=[];

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _tDocumentosService: tDocumentosService,
    private _userService: UserService
  ){
    this.array = JSON.parse(localStorage.getItem('identity') + '');
    this.tDocumento = new TDocumentos(0,'', this.array['id']);
    this.page_title = 'Bienvenido a crear documentos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
   }

  ngOnInit(): void {

    
   /* Swal.fire({   positivo
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
 */

    /* Swal.fire({      error
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
 */
  } 
  
  onSubmit(form:any){
    this._tDocumentosService.store(this.token, this.tDocumento).subscribe(//utilizar el metodo create
      response => {//me va a regresar o recoger los datos en caso de que todo sea correcto
        if(response.status == "success"){//si la respuesta es correcta
          this.tDocumento = response.tDocumento;
          this.status = 'success';          
          //this._router.navigate(['t-documentos']);
          form.reset();
          location.reload();//redireccion  a la pagina de inicio 
          
          
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';//me regresa el error 
        console.log(<any>error)
        form.reset();
          this._router.navigate(['t-documentos']);
      } 
    );
      
  }
  regresar(): any{
    this._router.navigate(['inicio']);
  }  
  showModal(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
      
    })
    
  }  

}
