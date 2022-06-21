import { Component, OnInit } from '@angular/core';
import { vehiculoService } from '../services/vehiculo.service';
import { tipoVehiculoService } from '../services/tipoVehiculo.service';
@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.css'],
  providers: [vehiculoService, tipoVehiculoService]
})
export class EjemploComponent implements OnInit {

  constructor(private _vehiculoService: vehiculoService, private _tipoVehiculo: tipoVehiculoService) {
    console.log("ahhhhhh")
   /*  this._vehiculoService.getVehiculos({}).subscribe(
      response=>{
        console.log("respuesta");
        console.log(response);
      }
    ); */
    this._tipoVehiculo.getAllVehiculo({}).subscribe(
      response=>{
        console.log("respuesta!")
        console.log(response)
      }
    )
   }

  ngOnInit(): void {
  }

}
