import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @ViewChild('idvalue', { static: true }) idvalue: ElementRef;
  @ViewChild('indexvalue', { static: true }) indexvalue: ElementRef;

  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private usuarioService: UsuarioService,

      @Inject(MAT_DIALOG_DATA) { id, name, lastname, login, password, index }) {
      this.form = fb.group({
        id: [id],
        name: [name, [Validators.required]],
        lastname: [lastname, [Validators.required]],
        login: [login, [Validators.email, Validators.required]],
        password: [password, [Validators.required]],
        index: [index]
      });
    }

  ngOnInit() {

  }

  onEdit() {
    this.usuarioService.update(this.form.value).subscribe(data => {
      this.dialogRef.close(data);
      this.usuarioService.getJSON();
    });

   }

  onCancel() {
    this.dialogRef.close();
  }

}
