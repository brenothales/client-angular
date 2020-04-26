import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { NewDialogComponent } from '../new-dialog/new-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  openDialog(){
   let dialogRef =  this.dialog.open(NewDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);

      if(result){
        this.openSnackBar("Usuario adicionado", "detalhes")
        .onAction().subscribe(()=>{
          //navigate
          this.router.navigate(['/usuariomanager', result.id]);
        });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
   return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
