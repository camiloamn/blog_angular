    import { Component, OnInit, DoCheck } from '@angular/core';
    import { UserService } from './services/user.service';
    import { vehiculoService } from './services/vehiculo.service';
    import { tipoVehiculoService } from './services/tipoVehiculo.service';
    import { ActivatedRoute } from '@angular/router';
    import { Router } from '@angular/router';
    

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

      constructor(
         private route: ActivatedRoute,
         private router: Router,
         private _userService: UserService,
         private _vehiculoService:vehiculoService,
         private _tipoVehiculoService:tipoVehiculoService,)
         {    
        this.loadUser();
      }
      //creo los metodos 
      ngOnInit(): void {//cierran sesion juntos
        console.log('web app cargada correctamente :)');
        this.getVehiculos();
      }
      ngDoCheck(): void {//cierran sesion juntos
        this.loadUser();
      }
      loadUser(){        
        
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        //this.token = this._tipoVehiculoService.getToken();
        
        console.log(this.identity);
      }

      getVehiculos(){
        this._vehiculoService.getVehiculos().subscribe(
          Response => {
            if(Response == 'success'){
              this.vehicles = Response.vehicles
            }
          },
          error => {
            console.log(error);
          }
        );
      }
      getTipoVehiculos(){
        this._tipoVehiculoService.getTipoVehiculos().subscribe(
          Response => {
            if(Response == 'success'){
              this.vehicles = Response.vehicles
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }

    
