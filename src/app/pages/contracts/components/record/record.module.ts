import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecordComponent } from './record.component';
import { RecordMaterialModule } from './record-material.module';
import { RecordRoutingModule } from './record-routing.module';


@NgModule({
  declarations: [
    RecordComponent,
  ],
  imports: [
    CommonModule,
    RecordMaterialModule,
    RecordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RecordComponent
  ]
})
export class RecordModule { }
