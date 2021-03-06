import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//la importo para podeder cargar formularios
import { HttpClientModule} from '@angular/common/http';//lo importo para utilizar ajax  
import { routing, appRoutingProviders} from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader";//lo importo para utilizar el btn de subir archivos

//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { TipoVehiculoComponent } from './components/tipo-vehiculo/tipo-vehiculo.component';
import { ListaVeComponent } from './components/lista-ve/lista-ve.component';
import { DocVehiculosComponent } from './components/doc-vehiculos/doc-vehiculos.component';
import { TDocumentosComponent } from './components/t-documentos/t-documentos.component';
import { ListasComponent } from './components/listas/listas.component';

//import { EjemploComponent } from './ejemplo/ejemplo.component';

//importamos los modulos, las cosas que van a imprimir algo
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
    ListaVeComponent,
    DocVehiculosComponent,
    TDocumentosComponent,
    ListasComponent,
    //EjemploComponent,
  ],
  // se cargan los modulos
  imports: [
    BrowserModule,
    routing,    
    FormsModule,
    HttpClientModule,
    //FroalaEditorModule.forRoot(),
    //FroalaViewModule.forRoot()
    AngularFileUploaderModule,//lo grego para el uso de btn que sube archivos
  ],

  //cargamos los servicios
  providers: [
    appRoutingProviders
  ],
  //se carga el componente principal
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
