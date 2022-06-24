import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { vehiculoService } from 'src/app/services/vehiculo.service';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';


@Component({
  selector: 'app-lista-ve',
  templateUrl: './lista-ve.component.html',
  styleUrls: ['./lista-ve.component.css'],
  providers: [UserService, vehiculoService, tipoVehiculoService]
})
export class ListaVeComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  //public tipoVehiculos: Tipovehiculos
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vehiculoService: vehiculoService,
    private _tipoVehiculoService: tipoVehiculoService

  ){
    this.page_title = 'Lista de vehiculos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    //this.tipoVehiculos= new tipoVehiculos();
  }

}
