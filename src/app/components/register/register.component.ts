import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;  //creo el objeto user de tipo user
  public status: string | undefined; 

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Registrate';
    this.user = new User('','','','','');//creacion del objeto

  }

  ngOnInit(): void {
    console.log('Componente de resgitro lanzado!!');
    console.log(this._userService.test());
  }

  regresar(): any{
    this._router.navigate(['inicio']);
  }
  onSubmit(form:any){
    
    this._userService.register(this.user).subscribe(
      response => {

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
