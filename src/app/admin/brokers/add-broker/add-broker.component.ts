import { Component, OnInit } from '@angular/core';
import {BrokersService} from '../brokers.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-broker',
  templateUrl: './add-broker.component.html',
  styleUrls: ['./add-broker.component.css']
})
export class AddBrokerComponent implements OnInit {
  broker: any;
  states: any;
  validateError: any;

  constructor(private brokersService: BrokersService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private roter: Router) {
  }

  ngOnInit(): void {
    this.broker = {
      name: '',
      email: '',
      mc: '',
      address: {
        address: '',
        country: 'usa',
        city: '',
        zip: 0,
        state: '',
      },
      phones: [{phoneNumber: ''}]
    };
    this.validateError = {
      name: false,
      email: false,
      mc: false,
      address: {
        address: false,
        country: false,
        city: false,
        zip: false,
        state: false,
      },
      phones: [false]
    };
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

  addBroker(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.broker).error) {
      this.brokersService.create(this.broker).subscribe((res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/brokers']);
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

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }

  addPhone(): void {
    this.broker.phones.push({phoneNumber: ''});
    this.validateError.phones.push(false);
  }

  removePhone(i): void {
    this.broker.phones.splice(i, 1);
    this.validateError.phones.splice(i, 1);
  }

}
