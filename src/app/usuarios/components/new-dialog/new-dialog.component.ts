import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-new-usuario-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent implements OnInit {

  usuario: Usuario;

  constructor(private dialogRef: MatDialogRef<NewDialogComponent>,
              private usuarioService: UsuarioService) { }


  ngOnInit() {
    this.usuario = new Usuario();
  }
  onSave() {
    this.usuarioService.addusuario(this.usuario).subscribe(data => {
      this.dialogRef.close(data);
    });

  }
  onCancel() {
    this.dialogRef.close(null);
  }
}
