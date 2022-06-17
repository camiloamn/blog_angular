import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
import { delay } from 'rxjs';
import { User } from 'src/app/models/user';//importamos el modelo user
import { UserService } from 'src/app/services/user.service';//importamos el servicio
import { DatePipe } from '@angular/common';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]//cargamos el servicio de user      
})
export class LoginComponent implements OnInit {
  public page_title: String;
  public idid:any;
  public user: User;//hacemos publica la propiedad
  public status: any; //creo la propiedad
  public token: any;
  public identity: any;//propiedad identity esta con el la identidad del usuario identificado
  public v:any = true;
  today: Date = new Date();
  hora = new DatePipe('en-US');
  todayWithPipe:any = null;

  constructor(
    private _userService: UserService, //creamos la propiedad del userService
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(this.idid,'','','','');//creacion del objeto
        
  }

  ngOnInit(): void {
    //SE EJECUTA SIEMPRE Y CIERRA SESION SOLO CUANDO LE LLEGA EL PARAMETRO SURE POR LA URL
    this.logout();
    this.todayWithPipe = this.hora.transform(Date.now(),'h:mm a');//formato a la hora que aparce en el login
  }

  //metodo para el boton de crear usuario en el login
  goRegister(): any{
     //routerLink:'/register';
     this._router.navigate(['registro']);
  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(//me permite ver el token si no le paso le segundo parametro true
      response => {
        //console.log('esssss aquiiiiiii');
        //console.log(response);
        
        //me devuelve el TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          //console.log('yyyyy  esssss aquiiiiiii : )');
          //console.log(response);

          //OBJETO USUARIO IDENTIFCADO
          this._userService.signup(this.user, this.v).subscribe(//con el this.v "que es true" me permite ver los datos del usuario , los datos que  traen el token
            response => {
              this.identity = response;
              //console.log('tokennnn y datossss');  
              //console.log(this.token);
              //console.log(this.identity);

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
  //metodo para cerrar sesion
  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');//remueve el identity
        localStorage.removeItem('token');//remueve el toke 

        this.identity = null;
        this.token = null;

        //REDIRECCION A login cuando acciono salir 
        this._router.navigate(['login']);
      }

    });

  }
}
