import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css']
})
export class TipoVehiculoComponent implements OnInit {
  public page_title: String;
  constructor(

  ) {
    this.page_title = 'bienvenido tipovehiculo';

  }

  ngOnInit(): void {
  }

}
