//IMPORTAR LAS RUTAS
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
import { vehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculos } from 'src/app/models/vehiculos';//nuestro modelo 


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  providers: [UserService, vehiculoService]
})
export class VehiculosComponent implements OnInit {
  //CREAR LAS PROPIEDADES
  public page_title: string;
  public identity: any;
  public token: any;
  public vehiculo: any = Vehiculos; //objeto que va a estar rellenando el formulario de vehiculos
  public status: string | undefined;
  public array:any=[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vehiculoService: vehiculoService,

  ) {
    this.array = JSON.parse(localStorage.getItem('identity') + '');//traigo el id de usuario como json y lo convierto en array es como traer el usuario del momento 

    //darle valor a las propiedaes 

    this.page_title = "Vehiculos";
    this.identity = this._userService.getIdentity();//tomamos el objeto del usuario identificado
    this.token = this._userService.getToken();//acccedo al token del usuario identificado 
    //this.vehiculo = new Vehiculos('',this.array['id']);//instancia de el objeto vacio
    this.vehiculo = new Vehiculos(0, '', this.array['id']);
    console.log(Vehiculos);

  }

  ngOnInit(): void {
    console.log('Componente de resgitro lanzado!!');
    console.log(this._userService.test());
/*     this._vehiculoService.getVehiculos({}).subscribe(
      
      response => {
        console.log("datos!!!!!");
        if (response.status == 'success') {
          console.log(response);
        } else {
          console.log("error!!!");
          console.log(response);
        }

      }
    ) */
  }

  regresar(): any {
    this._router.navigate(['inicio']);
  }

  onSubmit(form: any) {
    this._vehiculoService.store(this.token, this.vehiculo).subscribe(//utilizar el metodo create
      response => {//me va a regresar o recoger los datos en caso de que todo sea correcto
        if (response.status == 'success') {//si la respuesta es correcta
          this.vehiculo = response.vehiculo;
          this.status = 'success';

          this._router.navigate(['crear-vehiculo']);//redireccion  a la pagina de inicio 
          form.reset();
        } else {
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
