import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './layout/content/content.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class CoreModule { }
