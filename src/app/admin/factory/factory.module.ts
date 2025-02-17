import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryRoutingModule } from './factory-routing.module';
import { FactoryComponent } from './factory.component';
import { EditfactoryComponent } from './editfactory/editfactory.component';
import {SharedComponentsModule} from '../../shared/shared-components/shared-components.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [FactoryComponent, EditfactoryComponent],
  imports: [
    CommonModule,
    FactoryRoutingModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class FactoryModule { }
