import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {HttpClientModule} from '@angular/common/http';
import {NotificationComponent} from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }
