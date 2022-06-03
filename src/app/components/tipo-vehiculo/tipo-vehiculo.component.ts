import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
//import { vehiculoService } from 'src/app/services/vehiculo.service';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { TipoVehiculos } from 'src/app/models/tipovehiculos';  



@Component({
  selector: 'tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css'],
  providers: [UserService, tipoVehiculoService ]
})
export class TipoVehiculoComponent implements OnInit {
  //CREAR LAS PROPIEDADES
  public page_title: String;
  public identity: any;
  public token: any;
  public tipovehiculo:any = TipoVehiculos;
  public status: string | undefined; 
  public array: any = [];

  
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    //private _vehiculoService: vehiculoService,
    private _tipoVehiculoService: tipoVehiculoService,

  ){

    this.array= JSON.parse(localStorage.getItem('identity')+'');//traigo el id de usuario como json y lo convierto en array es como traer el usuario del momento 
    
    //darle valor a las propiedades
    
    this.page_title = 'bienvenidos a los tipos de vehiculo';
    this.identity = this._userService.getIdentity();//tomamos el objeto del usuario identificado
    this.token = this._userService.getToken();//acccedo al token del usuario identificado 
    this.tipovehiculo = new TipoVehiculos('','','');//instancia de el objeto vacio
  }

  ngOnInit(): void {
  }

  regresar(): any{
    this._router.navigate(['tipo-vehiculos']);
  }

  onSubmit(form:any){
    this._tipoVehiculoService.create(this.token, this.tipovehiculo).subscribe(//utilizar el metodo create
      response => {//me va a regresar o recoger los datos en caso de que todo sea correcto
        if(response.status == 'success'){//si la respuesta es correcta
          this.tipovehiculo = response.tipoVehiculo;
          this.status = 'success';

          this._router.navigate(['tipo-vehiculos']);//redireccion  a la pagina de inicio 
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';//me regresa el error 
        console.log(<any>error)
      }
    );
  }

}
