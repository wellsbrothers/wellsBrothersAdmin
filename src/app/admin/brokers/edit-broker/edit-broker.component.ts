import { Component, OnInit } from '@angular/core';
import {BrokersService} from '../brokers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-edit-broker',
  templateUrl: './edit-broker.component.html',
  styleUrls: ['./edit-broker.component.css']
})
export class EditBrokerComponent implements OnInit {
  broker: any;
  states: any;
  brokerId: string;

  validateError: any;

  constructor(private brokersService: BrokersService,
              private route: ActivatedRoute,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private roter: Router) {
  }

  ngOnInit(): void {
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
    this.route.params.subscribe((param) => {
      this.brokerId = param.id;
      this.getBroker();
    });
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

  getBroker(): void {
    this.sharedService.setLoader(true);
    this.brokersService.getOne(this.brokerId).subscribe( (res: any) => {
      if (!res.error) {
        this.broker = res.data;
        this.broker.address.country = !this.broker.address.country || this.broker.address.country == null ? 'usa' : this.broker.address.country;
        this.broker.phones.forEach((el, ind) => {
          this.validateError[ind] = false;
        });
        this.getStates();
      }
      this.sharedService.setLoader(false);
    });
  }

  updateBroker(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.broker).error) {
      this.brokersService.update(this.broker).subscribe((res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/brokers']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('editBrokerForm');
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
