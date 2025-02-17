import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadModalComponent } from './loadModal/load-modal/load-modal.component';
import { MergeLoadsModalComponent } from './merge-loads-modal/merge-loads-modal.component';
import { AddBrokerComponent } from './loadModal/add-broker/add-broker.component';
import { AddCarrierComponent } from './loadModal/add-carrier/add-carrier.component';
import { AddSheeperComponent } from './loadModal/add-sheeper/add-sheeper.component';
import { AddConsigneeComponent } from './loadModal/add-consignee/add-consignee.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoadModalComponent,
    MergeLoadsModalComponent,
    AddBrokerComponent,
    AddCarrierComponent,
    AddSheeperComponent,
    AddConsigneeComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    DashboardRoutingModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [
    LoadModalComponent,
    MergeLoadsModalComponent,
    AddBrokerComponent,
    AddCarrierComponent,
    AddSheeperComponent,
    AddConsigneeComponent
  ]
})
export class DashboardModule { }
