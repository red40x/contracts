import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavBarComponent } from './top-nav-bar.component';
import { TopNavBarMaterialMaterialModule } from './top-nav-bar-material.module';

@NgModule({
  declarations: [
    TopNavBarComponent
  ],
  imports: [
    CommonModule,
    TopNavBarMaterialMaterialModule,
  ],
  exports: [
    TopNavBarComponent
  ]
})
export class TopNavBarModule { }
