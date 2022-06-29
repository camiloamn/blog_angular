import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//sirve para hacer redirecciones
import { UserService } from 'src/app/services/user.service';//sirve para agarrar el token y la identidad del usuario
import { vehiculoService } from 'src/app/services/vehiculo.service';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';
import { Vehiculos } from 'src/app/models/vehiculos';
import { NgModule } from '@angular/core';//agrgee esto nuevo
import { NgForm } from '@angular/forms';//agrgee esto nuevo



@Component({
  selector: 'tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css'],
  providers: [UserService, vehiculoService, tipoVehiculoService] //tipoVehiculoService,
})
export class TipoVehiculoComponent implements OnInit {
  //CREAR LAS PROPIEDADES
  public page_title: String;
  //public idid: any;
  //public idV : id
  public identity: any;
  public token: any;  
  public tipovehiculo: Tipovehiculos;
  //public tVehiculos:any;
  public status: string | undefined;
  //public route: any;
  //public array: any=[];
  public vehiculos:any;
  //public vehiculos :any = Vehiculos;
  //public data:any=[];

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  
  
  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vehiculoService: vehiculoService,
    private _tipoVehiculoService: tipoVehiculoService
  ){
    //this.getAll();
    //this.array= JSON.parse(localStorage.getItem('identity')+'');//traigo el id de usuario como json y lo convierto en array es como traer el usuario del momento 
    
    //darle valor a las propiedades
    this.tipovehiculo = new Tipovehiculos(0,'','',0);
    this.page_title = 'bienvenidos a los tipos de vehiculo';
    this.identity = this._userService.getIdentity();//tomamos el objeto del usuario identificado
    this.token = this._userService.getToken();//acccedo al token del usuario identificado
    this._tipoVehiculoService.getAllVehiculo({}).subscribe(//trae propiedades de vehiculo
        
    response=>{
        //if(response.status == 'success')
          //this.data = Object.values(this.vehiculos);
          this.vehiculos = response;
          console.log("respuestaaa");       
          console.log(this.vehiculos);        

      }
    );

    /* objectKeys: (this.vehiculos){
      const keys = Object.keys(this.vehiculos);
      console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
      return keys;  */ 

    //this.tipovehiculo = new Tipovehiculos(this.idid,'','',this.array['id']);//instancia de el objeto vacio

    //console.log("estos")
    //this.getAll();
  }

  ngOnInit(): void {
    
    
    //console.log(this.tipovehiculo);
  }

  regresar(): any{
    this._router.navigate(['inicio']);
  }


  onSubmit(form:any){
    this._tipoVehiculoService.store(this.token, this.tipovehiculo).subscribe(//utilizar el metodo create
      response => {//me va a regresar o recoger los datos en caso de que todo sea correcto
        if(response.status == "success"){//si la respuesta es correcta
          this.tipovehiculo = response.tipoVehiculo;
          this.status = 'success';          
          this._router.navigate(['tipo-vehiculos']);
          form.reset();
          //location.reload();//redireccion  a la pagina de inicio 
          
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';//me regresa el error 
        console.log(<any>error)
        form.reset();
          this._router.navigate(['tipo-vehiculos']);
      }
    );
      
  }
  
  /*getAll(){

    this._tipoVehiculo.getAllVehiculo({}).subscribe(
      response => {
        //console.log("este!")
        if(response.status == 'success'){
          this.tVehiculos = response.tVehiculos;
          console.log(':):):):):)')
          console.log(this.tVehiculos);
        }
        
          
        },
        error => {
        console.log('errrrrrrrrrrrrrrrrrrrrrrroroorr')
         console.log(error);
      }
    );
    //return this.vehiculos['id-vehiculos'];
  }*/
  capturar() {

    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
   /*  console.log(this.verSeleccion) */
    
  }
  continuar(): any{
    this._router.navigate(['doc-vehiculos']);
  }

}

/*getAll(){
    this._vehiculoService.getAllVehiculo(this.token).subscribe(
      response => {
        console.log("este!")
        this.vehiculos = response;
        for (let index = 0; index < this.vehiculos.length; index++) {
          console.log(this.vehiculos[index]['id-vehiculos']);
          
        }
      }
    )
    //return this.vehiculos['id-vehiculos'];
  }*/
