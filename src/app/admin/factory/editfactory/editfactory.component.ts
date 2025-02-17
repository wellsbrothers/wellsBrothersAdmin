import { Component, OnInit } from '@angular/core';
import {ValidationsService} from '../../../validations/validations.service';
import {SharedService} from '../../../shared/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FactoriesService} from '../factories.service';

@Component({
  selector: 'app-editfactory',
  templateUrl: './editfactory.component.html',
  styleUrls: ['./editfactory.component.css']
})
export class EditfactoryComponent implements OnInit {
  factory: any;
  reviewAdmin: any;
  states: any;
  factoryId: string;
  validateError: any;

  constructor(private factoriesService: FactoriesService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
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
    this.route.params.subscribe((param) => {
      this.factoryId = param.id;
      this.getFactory();
    });
  }

  getFactory(): void {
    this.sharedService.setLoader(true);
    this.factoriesService.getOne(this.factoryId).subscribe( (res: any) => {
      if (!res.error) {
        this.factory = res.data;
      }
      this.sharedService.setLoader(false);
    });
  }

  updateFactory(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.factory).error) {
      this.factoriesService.update(this.factory).subscribe( (res: any) => {
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
