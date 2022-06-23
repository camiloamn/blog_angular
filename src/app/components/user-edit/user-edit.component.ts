import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { User } from 'src/app/models/user'; //importo el modelo
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity: any;
  public token: any;
  public status: string | undefined; 
  //public status:any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title= 'Ajustes de usuario';
    this.user = new User(0,'','','','');
    this.identity = this._userService.getIdentity();
    this.token= this._userService.getToken();    
    
    this.user = new User(
      this.identity.id,
      this.identity.nombre,
      this.identity.apellidos,
      this.identity.email,
      this.identity.password

    ); //RELLENA EL OBJETO USUARIO
    
  }

  ngOnInit(): void {
  }

  regresar(): any{
    this._router.navigate(['inicio']);
  }

  onSubmit(form:any){
    
    this._userService.update(this.token, this.user).subscribe(
      response => {
       
        if(response && response.status){
          console.log(response);
          this.status = 'success';
          form.reset();//permite borrar el formulario una ves este lleno y se haya enviado


          //ACTUALIZAR USUARIO EN SESION
          if(response.changes.id){
            this.user.id  = response.changes.id; 
          } 
          if(response.changes.nombre){
            this.user.nombre = response.changes.nombre; 
          }
          if(response.changes.apellidos){
            this.user.apellidos  = response.changes.apellidos; 
          }
          if(response.changes.email){
            this.user.email  = response.changes.email; 
          }
          if(response.changes.email){
            this.user.apellidos  = response.changes.apellidos; 
          }
          if(response.changes.password){
            this.user.password  = response.changes.password; 
          }             
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          
        }else{
          this.status = 'error';
        }
               
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );    

  }

}



