import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordar_pass: boolean = true;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    // console.log(form.value);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando ...'
    })
    Swal.showLoading();

    this.auth.registrarse(this.usuario).subscribe((respuesta) => {
      // console.log(respuesta);
      Swal.close();

      if (this.recordar_pass) {
        localStorage.setItem('email', this.usuario.email);
      }
      
      this.router.navigateByUrl('/home');

    }, (err) => {
      Swal.close();

      Swal.fire({
        icon: 'error',
        title: `Error ${err.error.error.code}`,
        text: `Mensaje: ${err.error.error.message}`
      })
    })
  }

}
