import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'usuariomanager', loadChildren: './usuarios/usuariomanager.module#UsuariomanagerModule' },
  { path: '**', redirectTo: 'usuariomanager'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
