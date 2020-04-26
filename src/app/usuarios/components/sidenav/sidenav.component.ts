import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  vagas: Observable<Usuario[]>;
  isIndigoTheme = false;
  dir = 'ltr';
  constructor(zone: NgZone, private vagaService: UsuarioService, private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
   }

  ngOnInit() {}

  isScreenSmall(): boolean{
    return this.mediaMatcher.matches;
  }

  toggleDir(){
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
  }

  }
