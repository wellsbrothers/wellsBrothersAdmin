import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedComponentsModule } from '../shared/shared-components/shared-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddBrokerComponent } from './loadModal/add-broker/add-broker.component';
import { AddCarrierComponent } from './loadModal/add-carrier/add-carrier.component';
import { AddConsigneeComponent } from './loadModal/add-consignee/add-consignee.component';
import { AddSheeperComponent } from './loadModal/add-sheeper/add-sheeper.component';
import { LoadModalComponent } from './loadModal/load-modal/load-modal.component';
import { MergeLoadsModalComponent } from './merge-loads-modal/merge-loads-modal.component';


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
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoadModalComponent,
    MergeLoadsModalComponent,
    AddBrokerComponent,
    AddCarrierComponent,
    AddSheeperComponent,
    AddConsigneeComponent]
})
export class DashboardModule { }
