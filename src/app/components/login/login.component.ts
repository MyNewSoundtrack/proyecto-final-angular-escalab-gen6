import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordar_pass: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar_pass = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Verificando credenciales ...'
    })
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe((respuesta) => {
      Swal.close();
      // console.log(respuesta);

      if (this.recordar_pass) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {
      Swal.close();
      // console.log(err);

      Swal.fire({
        icon: 'error',
        title: `Error ${err.error.error.code}`,
        text: `Mensaje: ${err.error.error.message}`
      })
    })
  }


}
