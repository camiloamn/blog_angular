//IMPORTS NECESARIOS 
import { ModuleWithProviders } from "@angular/core";//me permite cargarlas cosas del router
import { Routes, RouterModule } from "@angular/router";//me permite importar las rutas

//IMPORTAR COMPONENTES
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { VehiculosComponent } from "./components/vehiculos/vehiculos.component";
import { TipoVehiculoComponent } from "./components/tipo-vehiculo/tipo-vehiculo.component";

//DEFINIR LAS RUTAS en un array con los objetos json 
const appRoutes: Routes = [
    {path: '', component: LoginComponent},//esta es la pagina de arranque 
    {path: 'inicio', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'registro', component:RegisterComponent},
    {path: 'ajustes', component:UserEditComponent},
    {path: 'crear-vehiculo', component:VehiculosComponent},
    {path: 'tipo-vehiculos', component:TipoVehiculoComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTAR CONFIGURACION 
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);    