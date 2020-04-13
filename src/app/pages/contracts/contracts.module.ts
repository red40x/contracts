import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContractsComponent } from './contracts.component';
import { ContractsRoutingModule } from './contracts-routing.module';
import { TopNavBarModule } from './components/top-nav-bar';
import { ContractMaterialModule } from './contract-material.module';
import { LeftSideNavComponent } from './components/left-side-nav';
import { RecordModule } from './components/record';


@NgModule({
  declarations: [
    ContractsComponent,
    LeftSideNavComponent
  ],
  imports: [
    CommonModule,
    TopNavBarModule,
    ContractsRoutingModule,
    RouterModule,
    ContractMaterialModule,
    RecordModule
  ],
  exports: [
    ContractsComponent
  ]
})
export class ContractsModule { }
