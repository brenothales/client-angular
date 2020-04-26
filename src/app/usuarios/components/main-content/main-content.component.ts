import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBarRef, SimpleSnackBar, MatSnackBar,
          MatDialogConfig, MatTableDataSource, MatPaginator } from '@angular/material';

import { Observable } from 'rxjs';

import { EditDialogComponent } from '../edit-usuario-dialog/edit-dialog.component';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, AfterViewInit {


  @Input() usuariosData: Observable<Usuario[]>;

  @Input() usuarios: Usuario[];

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['id', 'name', 'lastname', 'login', 'password', 'actions'];
  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  usuario: Usuario;
  data: Usuario[];
  isLoadingResults = true;

  constructor(private usuarioService: UsuarioService,
     private router: Router,
     private route: ActivatedRoute,
     private dialog: MatDialog,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsuarios();

  }


  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
    this.dataSource.paginator = this.paginator;
  }


  public getAllUsuarios = () => {
    this.usuarioService.getData('users')
      .subscribe(res => {
        this.dataSource.data = res as Usuario[];
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  __cardClick(usuario) {
    this.router.navigate(['usuariomanager', usuario.id]);
  }

  openEditDialog(index: number, { id, name, lastname, login, password }: Usuario) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {id, name, lastname, login, password, index};
    const dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => {
        console.log('Dialog output:', val);
        this.openSnackBar('Atualizado com Sucesso', null);
      }
        );
        this.usuariosData = this.usuarioService.usuariosSet;
}

  openNewDialog() {
    const dialogRef = this.dialog.open(NewDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('Usuário Cadastro com sucesso', 'Exibir')
          .onAction().subscribe(() => {
            // navigate
            this.router.navigate(['usuariomanager', result.id]);
          });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
       duration: 5000,
     });
   }

  deleteItem(usuario: number) {
    this.usuarioService.deleteUsuario(usuario).subscribe(() => {
      this.openSnackBar('Cadastro Excluído', null);
    });
   }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
