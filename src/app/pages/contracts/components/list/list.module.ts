import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { ListMaterialModule } from './list-material.module';
import { ListRoutingModule } from './list-routing.module';
import { DialogConfirmComponent } from '../dialog-confirm';

@NgModule({
  declarations: [
    ListComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    ListMaterialModule,
    ListRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
