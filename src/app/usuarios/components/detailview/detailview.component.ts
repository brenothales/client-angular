import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {
  usuario: any;
  hide = true;
  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.usuarioService.getUsuarioById(id).subscribe(data => {
        if (data) {
          this.usuario = data as Usuario[];
          console.log(this.usuario);
        }
      });
    });
  }

  backToHome() {
    this.router.navigate(['']);
  }

}
