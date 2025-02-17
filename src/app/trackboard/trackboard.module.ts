import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackboardRoutingModule } from './trackboard-routing.module';
import { TrackboardComponent } from './trackboard.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';


@NgModule({
  declarations: [TrackboardComponent],
  imports: [
    SharedComponentsModule,
    CommonModule,
    TrackboardRoutingModule
  ]
})
export class TrackboardModule { }
