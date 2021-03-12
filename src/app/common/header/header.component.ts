import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  boton_logout: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.estaLogueado()) {
      this.boton_logout = true;
    } else {
      this.boton_logout = false;
    }
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }

}
