import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../shared/shared.service';
import {CarriersService} from '../../../admin/carriers/carriers.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-carrier',
  templateUrl: './add-carrier.component.html',
  styleUrls: ['./add-carrier.component.css']
})
export class AddCarrierComponent implements OnInit {
  carrier: any;
  errorMessageCreate: boolean;
  addCarrier: boolean;
  createResponseMessage: string;
  states: any;
  validateError: any;
  constructor(private sharedService: SharedService,
              private validationsService: ValidationsService,
              private carriersService: CarriersService) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
    sharedService.addCarrierModal$.subscribe((res: boolean) => {
      this.addCarrier = res;
    });
  }

  ngOnInit(): void {
    this.seCarrier();
  }

  seCarrier(): void {
    this.validateError = {
      track: false,
      dotNumber: false,
      trailer: false,
      driver: false,
      phone: false,
      address: {
        address: false,
        city: false,
        zip: false,
        state: false
      },
      companyName: false,
      companyEmail: false,
      mc: false,
    };
    this.carrier = {
      track: '',
      dotNumber: 0,
      trailer: '',
      driver: '',
      phone: '',
      address: {
        address: '',
        city: '',
        zip: 0,
        state: ''
      },
      fax: '',
      companyName: '',
      companyEmail: '',
      mc: '',
    };
  }

  closeModal(): void {
    this.sharedService.openModalAddCarrier(false);
    this.seCarrier();
  }

  createCarrier(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.carrier).error) {
      this.carriersService.create(this.carrier).subscribe( (res: any) => {
        if (!res.error) {
          this.sharedService.openModalAddCarrier(false);
          this.seCarrier();
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('addCarrierForm');
      el.scrollIntoView();
    }
  }

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.loadCreatedFunc(false);
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }


}
