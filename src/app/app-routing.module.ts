import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error-404';
import { AuthGuard } from './shared/services/guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contracts/list',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'contracts',
    loadChildren: () => import('./pages/contracts/contracts.module').then(mod => mod.ContractsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
