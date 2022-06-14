import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
import { vehiculoService } from 'src/app/services/vehiculo.service';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';
import { Vehiculos } from 'src/app/models/vehiculos';


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
  public tipovehiculo:any = Tipovehiculos;
  public status: string | undefined; 
  public array: any = [];
  public vehiculos :any = Vehiculos;

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  
  
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vehiculoService: vehiculoService,
    private _tipoVehiculoService: tipoVehiculoService,

  ){
    this.array= JSON.parse(localStorage.getItem('identity')+'');//traigo el id de usuario como json y lo convierto en array es como traer el usuario del momento 
    
    //darle valor a las propiedades
    
    this.page_title = 'bienvenidos a los tipos de vehiculo';
    this.identity = this._userService.getIdentity();//tomamos el objeto del usuario identificado
    this.token = this._userService.getToken();//acccedo al token del usuario identificado
    //this.vehiculos = this._vehiculoService.getVehiculos();
    this.tipovehiculo = new Tipovehiculos(0,'','',0);//instancia de el objeto vacio

    console.log("estos")
    this.getAll();
  }

  ngOnInit(): void {
  }

  regresar(): any{
    this._router.navigate(['inicio']);
  }


  onSubmit(form:any){
    this._tipoVehiculoService.create(this.token, this.tipovehiculo).subscribe(//utilizar el metodo create
      response => {//me va a regresar o recoger los datos en caso de que todo sea correcto
        if(response.status == "success"){//si la respuesta es correcta
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
  getAll(){
    this._tipoVehiculoService.getAllVehiculo(this.token).subscribe(
      response => {
        console.log("este!")
        this.vehiculos = response;
        for (let index = 0; index < this.vehiculos.length; index++) {
          console.log(this.vehiculos[index]['id-vehiculos']);
          
        }
      }
    )
    //return this.vehiculos['id-vehiculos'];
  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion)
    
  }

}
