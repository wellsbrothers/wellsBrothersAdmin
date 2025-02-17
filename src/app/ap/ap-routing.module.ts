import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApPaidComponent } from './ap-paid/ap-paid.component';
import { ApTbpComponent } from './ap-tbp/ap-tbp.component';

import { ApComponent } from './ap.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ApComponent },
  { path: 'tbp', component: ApTbpComponent },
  { path: 'paid', component: ApPaidComponent },
  // { path: 'tbp', loadChildren: () => import('./tbp/tbp.module').then(m => m.TbpModule) },
  // { path: 'paid', loadChildren: () => import('./paid/paid.module').then(m => m.PaidModule) }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApRoutingModule { }
