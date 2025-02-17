import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../shared/shared.service';
import {BrokersService} from '../../../admin/brokers/brokers.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-broker',
  templateUrl: './add-broker.component.html',
  styleUrls: ['./add-broker.component.css']
})
export class AddBrokerComponent implements OnInit {
  addBrokerModal: boolean;
  broker: any;
  validateError: any;
  states: any;
  createResponseMessage: string;
  errorMessageCreate: boolean;

  constructor(private sharedService: SharedService,
              private validationsService: ValidationsService,
              private brokersService: BrokersService) {
    sharedService.addBrokerModal$.subscribe((res: boolean) => {
      this.addBrokerModal = res;
    });
  }

  ngOnInit(): void {
    this.setBroker();
    this.getStates();
  }

  getStates(): void {
    if (this.broker.address.country === 'usa') {
      this.sharedService.getJSON().subscribe( (res: any) => {
        this.states = res;
      });
    } else {
      this.sharedService.getCAJSON().subscribe( (res: any) => {
        this.states = res;
      });
    }
  }

  setBroker(): void {
    this.validateError = {
      name: false,
      email: false,
      mc: false,
      address: {
        address: false,
        city: false,
        zip: false,
        country: false,
        state: false,
      },
      phones: [false]
    };
    this.broker = {
      name: '',
      email: '',
      mc: '',
      address: {
        address: '',
        city: '',
        zip: 0,
        country: 'usa',
        state: '',
      },
      phones: [{phoneNumber: ''}]
    };
  }

  addBrokerPhone(): void {
    this.broker.phones.push({phoneNumber: ''});
  }

  removeBrokerPhone(i): void {
    this.broker.phones.splice(i, 1);
  }
  addBroker(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.broker).error) {
      this.brokersService.create(this.broker).subscribe((res: any) => {
        if (!res.error) {
          this.sharedService.openModalAddBroker(false);
          this.setBroker();
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('addBrokerForm');
      el.scrollIntoView();
    }
  }

  closeModal(): void {
    this.sharedService.openModalAddBroker(false);
    this.setBroker();
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
