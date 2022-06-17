import { Component, OnInit } from '@angular/core';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[tipoVehiculoService]

})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url:any;
  public tipoVehiculos:any = Tipovehiculos

  constructor(
    private _tipoVehiculoService: tipoVehiculoService

  ){ 
    this.page_title = 'Inicio';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getTipoVehiculos();
  }

  getTipoVehiculos(){
    this._tipoVehiculoService.getTipoVehiculos().subscribe(
      response => {
        if(response.status == 'success'){
          this.tipoVehiculos = response.tipoVehiculos;

          console.log('nuevoooo intento')
          console.log(this.tipoVehiculos);

        }

      },
      error => {
        console.log(error);
      }      
    )
  }

}
