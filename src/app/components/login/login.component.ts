import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user';//importamos el modelo user
import { UserService } from 'src/app/services/user.service';//importamos el servicio

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]//cargamos el servicio de user      
})
export class LoginComponent implements OnInit {
  public page_title: String;
  public user: User;//hacemos publica la propiedad
  public status: any; //creo la propiedad
  public token: any;
  public identity: any;
  public v:any = true;

  constructor(
    private _userService: UserService, //creamos la propiedad del userService
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User('', '', '', '', '');//el objeto 

  }

  ngOnInit(): void {
    //SE EJECUTA SIEMPRE Y CIERRA SESION SOLO CUANDO LE LLEGA EL PARAMETRO SURE POR LA URL
    this.logout();
  }

  goRegister(): any{
     //routerLink:'/register';
     this._router.navigate(['registro']);
  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(
      response => {
        //TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //OBJETO USUARIO IDENTIFCADO
          this._userService.signup(this.user, this.v).subscribe(
            response => {
              //console.log("esteeee!");
              console.log(response);

              if(response.status != 'Error'){
                this.identity = response;
                this.identity;
                this.token;
                //obtener el objeto persistido(en todas las pestañas en la que navege)
                //persistir datos usuario identificado
                localStorage.setItem('token', this.token);//localstorage es una especie de memoria web
                localStorage.setItem('identity', JSON.stringify(this.identity));//el objeto se lo debe pasar a json
  
                //REDIRECCION A INICIO
                this._router.navigate(['inicio']);
              }else{
                this._router.navigate(['login']);
              }

            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        } else {
          alert("Usuario incorrecto");
          this.status = 'error';
          
        }
        form.reset();
      },
      error => {
        this.status = 'error';
        console.log("incorectoooooooooo")
        console.log(<any>error);
      }
    );
  }
  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');//remueve el identity
        localStorage.removeItem('token');//remueve el toke 

        this.identity = null;
        this.token = null;

        //REDIRECCION A INICIO 
        this._router.navigate(['login']);
      }

    });

  }
}
