import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';

import { UsuariomanagerAppComponent } from './usuariomanager-app.component';
import { UsuarioManagerRoutingModule } from './usuariomanager-routing.module';

import { DetailviewComponent } from './components/detailview/detailview.component';
import { EditDialogComponent } from './components/edit-usuario-dialog/edit-dialog.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NewDialogComponent } from './components/new-dialog/new-dialog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser'

@NgModule({
  declarations: [
    UsuariomanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewDialogComponent,
    DetailviewComponent,
    EditDialogComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    UsuarioManagerRoutingModule
  ],
  entryComponents: [NewDialogComponent, EditDialogComponent]
})
export class UsuariomanagerModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
   }
}
