import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { User } from 'src/app/models/user'; //importo mi modelo de usuario
import { UserService } from 'src/app/services/user.service';//importo el servicio para hacer uso de este

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]//cargo le userService
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public idid:any;
  public user: User;  //creo el objeto user de tipo user
  public status: string | undefined; //para que genere el status

  constructor(
    private _userService: UserService,//cargo el userService se escribe _userService por nomenclatura estandar
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Registrate';
    this.user = new User(this.idid,'','','','');//creo el objeto user con los campos vacios

  }

  ngOnInit(): void {
    console.log('Componente de resgitro lanzado!!');
    console.log(this._userService.test());
  }

  regresar(): any{
    this._router.navigate(['login']);
  }
  onSubmit(form:any){
   
    this._userService.register(this.user).subscribe(//metodo register
      response => {

        //console.log('aquiiiiii esss');
        //console.log(this.user);

        if(response.status == "success"){
          this.status = response.status;
          form.reset();//permite borrar el formulario una ves este lleno y se haya enviado
          
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
