import { Component, OnInit } from '@angular/core';
import {CarriersService} from '../carriers.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';
import {FactoriesService} from '../../factory/factories.service';

@Component({
  selector: 'app-add-carrier',
  templateUrl: './add-carrier.component.html',
  styleUrls: ['./add-carrier.component.css']
})
export class AddCarrierComponent implements OnInit {
  states: any;
  carrier: any;
  validateError: any;
  factories: any;
  constructor(private carriersService: CarriersService,
              private validationsService: ValidationsService,
              private factoriesService: FactoriesService,
              private sharedService: SharedService,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
      console.log('States ::', this.states);
    });
  }

  ngOnInit(): void {
    this.factoriesService.getList(1, 0, {}).subscribe((res: any) => {
      if (!res.error) {
        this.factories = res.data;
      }
    });
    this.carrier = {
      track: '',
      dotNumber: 0,
      trailer: '',
      driver: '',
      phone: '',
      bank_name: '',
      routing_number: '',
      account_number: '',
      ach: '',
      address: {
        address: '',
        city: '',
        zip: 0,
        state: ''
      },
      fax: '',
      factoryId: null,
      companyName: '',
      companyEmail: '',
      mc: '',
    };
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
  }

  createCarrier(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.carrier).error) {
      this.carriersService.create(this.carrier).subscribe( (res: any) => {
        if (!res.error) {
          this.router.navigate(['/admin/carriers']);
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
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }


}
