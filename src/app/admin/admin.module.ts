import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { BrokersComponent } from './brokers/brokers.component';
import { AddBrokerComponent } from './brokers/add-broker/add-broker.component';
import { CarriersComponent } from './carriers/carriers.component';
import { EditAdminComponent } from './admins/edit-admin/edit-admin.component';
import { EditSheeperComponent } from './sheepers/edit-sheeper/edit-sheeper.component';
import { EditConsigneeComponent } from './consignees/edit-consignee/edit-consignee.component';
import { EditCarrierComponent } from './carriers/edit-carrier/edit-carrier.component';
import { EditBrokerComponent } from './brokers/edit-broker/edit-broker.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MyPageComponent } from './my-page/my-page.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {ConsigneesComponent} from './consignees/consignees.component';
import {AddConsigneeComponent} from './consignees/add-consignee/add-consignee.component';
import {SheepersComponent} from './sheepers/sheepers.component';
import {AddSheeperComponent} from './sheepers/add-sheeper/add-sheeper.component';
import {FormsModule} from '@angular/forms';
import {NotificationComponent} from '../notification/notification.component';
import {AddCarrierComponent} from './carriers/add-carrier/add-carrier.component';
import { BranchesComponent } from './branches/branches.component';
import { AddBranchComponent } from './branches/add-branch/add-branch.component';
import { EditBranchComponent } from './branches/edit-branch/edit-branch.component';
import { SettingsComponent } from './settings/settings.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { AddfactoryComponent } from './factory/addfactory/addfactory.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminsComponent,
    AddAdminComponent,
    BrokersComponent,
    AddBrokerComponent,
    CarriersComponent,
    EditAdminComponent,
    EditSheeperComponent,
    ConsigneesComponent,
    AddConsigneeComponent,
    EditConsigneeComponent,
    EditCarrierComponent,
    EditBrokerComponent,
    HeaderComponent,
    SheepersComponent,
    AddSheeperComponent,
    SidebarComponent,
    AddCarrierComponent,
    MyPageComponent,
    BranchesComponent,
    AddBranchComponent,
    EditBranchComponent,
    SettingsComponent,
    AddfactoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AngularEditorModule,
    SharedComponentsModule
  ]
})
export class AdminModule { }
