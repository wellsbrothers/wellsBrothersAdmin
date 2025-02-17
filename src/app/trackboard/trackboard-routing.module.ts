import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrackboardComponent} from './trackboard.component';

const routes: Routes = [{path: '', component: TrackboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackboardRoutingModule { }
