import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//la importo para podeder cargar formularios
import { HttpClientModule} from '@angular/common/http';

import { routing, appRoutingProviders} from './app.routing';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { TipoVehiculoComponent } from './components/tipo-vehiculo/tipo-vehiculo.component';

//importamos los modulos
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    VehiculosComponent,
    TipoVehiculoComponent,
  ],
  imports: [
    BrowserModule,
    routing,    
    FormsModule,
    HttpClientModule,
    //FroalaEditorModule.forRoot(),
    //FroalaViewModule.forRoot()
  ],

  //cargamos los servicios
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
