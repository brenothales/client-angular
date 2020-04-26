import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariomanagerAppComponent } from './usuariomanager-app.component';
import { DetailviewComponent } from './components/detailview/detailview.component';
import { MainContentComponent } from './components/main-content/main-content.component';


const routes: Routes = [
  { path: '', component: UsuariomanagerAppComponent,
    children: [
      { path: ':id', component: DetailviewComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioManagerRoutingModule { }
