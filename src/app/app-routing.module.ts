import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotfoundComponent} from './notfound/notfound.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {roles: [0, 1, 2]}
  },
  { path: 'trackboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./trackboard/trackboard.module').then(m => m.TrackboardModule),
    data: {roles: [0, 1, 2]}
  },
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {roles: [0, 1]}
  },
  { 
    path: 'ap',
    canActivate: [AuthGuard],
    data: {roles: [0, 1]}, 
    loadChildren: () => import('./ap/ap.module').then(m => m.ApModule) 
  },

  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '404', component: NotfoundComponent },
  { path: 'home', canActivate: [AuthGuard], data: {roles: [0, 1, 2]}, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'factory', canActivate: [AuthGuard], data: {roles: [0, 1, 2]}, loadChildren: () => import('./admin/factory/factory.module').then(m => m.FactoryModule) },
  { path: '**', pathMatch   : 'full', redirectTo: '/404' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
