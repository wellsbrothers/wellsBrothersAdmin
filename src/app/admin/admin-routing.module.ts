import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import {AdminsComponent} from './admins/admins.component';
import {AddAdminComponent} from './admins/add-admin/add-admin.component';
import {BrokersComponent} from './brokers/brokers.component';
import {AddBrokerComponent} from './brokers/add-broker/add-broker.component';
import {CarriersComponent} from './carriers/carriers.component';
import {AddCarrierComponent} from './carriers/add-carrier/add-carrier.component';
import {ConsigneesComponent} from './consignees/consignees.component';
import {AddConsigneeComponent} from './consignees/add-consignee/add-consignee.component';
import {SheepersComponent} from './sheepers/sheepers.component';
import {AddSheeperComponent} from './sheepers/add-sheeper/add-sheeper.component';
import {EditAdminComponent} from './admins/edit-admin/edit-admin.component';
import {EditSheeperComponent} from './sheepers/edit-sheeper/edit-sheeper.component';
import {EditConsigneeComponent} from './consignees/edit-consignee/edit-consignee.component';
import {EditCarrierComponent} from './carriers/edit-carrier/edit-carrier.component';
import {EditBrokerComponent} from './brokers/edit-broker/edit-broker.component';
import {MyPageComponent} from './my-page/my-page.component';
import {BranchesComponent} from './branches/branches.component';
import {AddBranchComponent} from './branches/add-branch/add-branch.component';
import {EditBranchComponent} from './branches/edit-branch/edit-branch.component';
import {SettingsComponent} from './settings/settings.component';
import {FactoryComponent} from './factory/factory.component';
import {AddfactoryComponent} from './factory/addfactory/addfactory.component';
import {EditfactoryComponent} from './factory/editfactory/editfactory.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'my-page', component: MyPageComponent},
      { path: 'admins', component: AdminsComponent },
      { path: 'admins/add-admin', component: AddAdminComponent },
      { path: 'admins/edit-admin/:id', component: EditAdminComponent },
      { path: 'brokers', component: BrokersComponent },
      { path: 'brokers/add-broker', component: AddBrokerComponent },
      { path: 'brokers/edit-broker/:id', component: EditBrokerComponent },
      { path: 'carriers', component: CarriersComponent },
      { path: 'carriers/add-carrier', component: AddCarrierComponent },
      { path: 'carriers/edit-carrier/:id', component: EditCarrierComponent },
      { path: 'consignees', component: ConsigneesComponent },
      { path: 'consignees/add-consignee', component: AddConsigneeComponent },
      { path: 'consignees/edit-consignee/:id', component: EditConsigneeComponent },
      { path: 'shippers', component: SheepersComponent },
      { path: 'shippers/add-shipper', component: AddSheeperComponent },
      { path: 'shippers/edit-shipper/:id', component: EditSheeperComponent },
      { path: 'branches', component: BranchesComponent },
      { path: 'branches/add-branche', component: AddBranchComponent },
      { path: 'branches/edit-branche/:id', component: EditBranchComponent },
      { path: 'factories', component: FactoryComponent },
      { path: 'factories/add-factory', component: AddfactoryComponent },
      { path: 'factories/edit-factory/:id', component: EditfactoryComponent },
      { path: 'settings', component: SettingsComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
