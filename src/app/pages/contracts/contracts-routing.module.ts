import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts.component';


const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./components/list/list.module').then(mod => mod.ListModule)
      },
      {
        path: 'record/:id',
        loadChildren: () => import('./components/record/record.module').then(mod => mod.RecordModule)
      },
      {
        path: 'record',
        loadChildren: () => import('./components/record/record.module').then(mod => mod.RecordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
