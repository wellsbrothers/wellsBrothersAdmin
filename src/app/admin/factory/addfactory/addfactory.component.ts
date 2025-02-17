import { Component, OnInit } from '@angular/core';
import {ValidationsService} from '../../../validations/validations.service';
import {SharedService} from '../../../shared/shared.service';
import {Router} from '@angular/router';
import {FactoriesService} from '../factories.service';

@Component({
  selector: 'app-addfactory',
  templateUrl: './addfactory.component.html',
  styleUrls: ['./addfactory.component.css']
})
export class AddfactoryComponent implements OnInit {
  states: any;
  factory: any;
  validateError: any;
  constructor(private factoriesService: FactoriesService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
    this.factory = {
      name: '',
      bankName: 0,
      routing: '',
      account: '',
      email: '',
      phone: '',
      address: {
        address: '',
        city: '',
        zip: 0,
        state: ''
      },
    };
    this.validateError = {
      name: false,
      bankName: false,
      routing: false,
      account: false,
      email: false,
      address: {
        address: false,
        city: false,
        zip: false,
        state: false
      },
      phone: false,
    };
  }

  createFactory(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.factory).error) {
      this.factoriesService.create(this.factory).subscribe( (res: any) => {
        if (!res.error) {
          this.router.navigate(['/admin/factories']);
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
