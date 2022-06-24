    import { Component, OnInit, DoCheck } from '@angular/core';
    import { UserService } from './services/user.service';
    import { vehiculoService } from './services/vehiculo.service';
    import { tipoVehiculoService } from './services/tipoVehiculo.service';
    import { ActivatedRoute } from '@angular/router';
    import { Router } from '@angular/router';
import { Vehiculos } from './models/vehiculos';
import { Tipovehiculos } from './models/tipovehiculos';
    

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
      providers: [UserService, vehiculoService, tipoVehiculoService]
    })
    export class AppComponent implements OnInit, DoCheck{
      public title = 'blog_angular';
      public identity: any;
      public token: any;
      public url:any
      public vehicles:any;
      public tipvehicles:any;
      public vehiculos=Vehiculos;
      public tipovehiculos= Tipovehiculos;

      constructor(
         private route: ActivatedRoute,
         private router: Router,
         private _userService: UserService,
         private _vehiculoService:vehiculoService,
         private _tipoVehiculoService:tipoVehiculoService,)
         {    
        this.loadUser();
        //this.getVehiculos();
        //this.getTipoVehiculos();
      }
      //creo los metodos 
      //cierran sesion juntos
      ngOnInit(): void {
        console.log('web app cargada correctamente :)');
        //this.getVehiculos();
        this.getTipoVehiculos();      
      }
      ngDoCheck(): void {//cierran sesion juntos
        this.loadUser();//metodo loaduser 
      }
      loadUser(){        
        
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        //this.token = this._tipoVehiculoService.getToken();
        
        console.log(this.identity);
      }

      //instancia del metodo de listar vehiculos
/*       getVehiculos(){
        //console.log('qqqqqqqqqqqqqqq')
        this._vehiculoService.getVehiculos(this.token).subscribe(
          response => {

            if(response == 'success'){
              this.vehicles = response.vehicles
              //console.log('aaaaaaaaaaaaa')           
              //console.log(this.vehicles);
            }
          },
          error => {
            console.log(error);          
          }
        );
      } */
      //instancia del metodo de listar vehiculos
      getTipoVehiculos(){
        this._tipoVehiculoService.getTipoVehiculos().subscribe(
          Response => {
            if(Response == 'success'){
              this.tipvehicles = Response.tipvehicles
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    
