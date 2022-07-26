import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { vehiculoService } from 'src/app/services/vehiculo.service';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';
import { Docvehiculos } from 'src/app/models/docvehiculos';


@Component({
  selector: 'app-doc-vehiculos',
  templateUrl: './doc-vehiculos.component.html',
  styleUrls: ['./doc-vehiculos.component.css'],
  providers: [UserService, vehiculoService, tipoVehiculoService]
})
export class DocVehiculosComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public docvehiculos: Docvehiculos;
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vehiculoService: vehiculoService,
    private _tipoVehiculoService: tipoVehiculoService

    
  ){
    this.page_title = 'Binevenido a los tipos de documentos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();    
    this.docvehiculos = new Docvehiculos(0,'','','','','','','','','','','','','','','',0,0);
   }

  ngOnInit(): void {
    
  }
  onSubmit(form:any){
    
  }

}
