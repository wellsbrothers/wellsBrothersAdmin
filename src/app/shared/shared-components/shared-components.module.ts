import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RateConfirmationComponent } from '../../dashboard/rate-confirmation/rate-confirmation.component';
import { RateConfirmationComponentNew } from '../../dashboard/rate-confirmation-new/rate-confirmation.component';
import { BolComponent } from '../../dashboard/bol/bol.component';

import { InvoiceComponent } from '../../dashboard/invoice/invoice.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    RateConfirmationComponent,
    RateConfirmationComponentNew,
    BolComponent,
    InvoiceComponent,
    PaginationComponent,
  ],
  exports: [
    RateConfirmationComponent,
    RateConfirmationComponentNew,
    BolComponent,
    InvoiceComponent,
    PaginationComponent,
    CommonModule,
  ],
})
export class SharedComponentsModule {}
