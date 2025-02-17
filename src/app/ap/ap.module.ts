import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApRoutingModule } from './ap-routing.module';
import { ApComponent } from './ap.component';
import {FormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import { ApTbpComponent } from './ap-tbp/ap-tbp.component';
import { ApPaidComponent } from './ap-paid/ap-paid.component';


@NgModule({
  declarations: [ApComponent, ApTbpComponent, ApPaidComponent],
    imports: [
        CommonModule,
        ApRoutingModule,
        FormsModule,
        SharedComponentsModule,
        NgSelectModule
    ]
})
export class ApModule { }
