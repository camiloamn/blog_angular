import { Component, OnInit } from '@angular/core';
import { Tipovehiculos } from 'src/app/models/tipovehiculos';
import { tipoVehiculoService } from 'src/app/services/tipoVehiculo.service';
import { global } from 'src/app/services/global';
import { Listas } from 'src/app/models/listas';
import { listasService } from 'src/app/services/listas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[tipoVehiculoService, listasService]

})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url:any;
  public tipoVehiculos:any = Tipovehiculos;
  //public Listas: Array<Listas>; //original pero no funciona
  public Listas:any=[];
  //public array:any=[];
  public status:any;

  constructor(
    private _tipoVehiculoService: tipoVehiculoService,
    private _listasService: listasService

  ){ 
    this.page_title = 'Inicio';
    this.url = global.url;  
    
  }

  ngOnInit(): void {
    this.getTipoVehiculos();
    this.getListass();
  }

  getListass(){
    this._listasService.getListass().subscribe(
      response => {
        if(response.status == 'success'){
          this.Listas = response.Listas;

        } 
      },
      error =>{
        console.log(error);
      }

    );
      

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
