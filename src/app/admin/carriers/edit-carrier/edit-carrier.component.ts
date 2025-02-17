import { Component, OnInit } from '@angular/core';
import {CarriersService} from '../carriers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';
import {FactoriesService} from '../../factory/factories.service';

@Component({
  selector: 'app-edit-carrier',
  templateUrl: './edit-carrier.component.html',
  styleUrls: ['./edit-carrier.component.css']
})
export class EditCarrierComponent implements OnInit {
  carrier: any;
  factories: any;
  reviewAdmin: any;
  states: any;
  carrierId: string;
  validateError: any;

  constructor(private carriersService: CarriersService,
              private validationsService: ValidationsService,
              private factoriesService: FactoriesService,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
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
    this.route.params.subscribe((param) => {
      this.carrierId = param.id;
      this.getCarrier();
    });
  }

  getCarrier(): void {
    this.sharedService.setLoader(true);
    this.carriersService.getOne(this.carrierId).subscribe( (res: any) => {
      if (!res.error) {
        this.factoriesService.getList(1, 0, {}).subscribe((res: any) => {
          if (!res.error) {
            this.factories = res.data;
          }
        });
        this.carrier = res.data;
        if (!this.carrier.review) {
          this.carrier.review = {
            status: 'standard',
            message: '',
            createdBy: null
          };
        } else {
          this.reviewAdmin = res.reviewAdmin;
        }

      }
      this.sharedService.setLoader(false);
    });
  }

  updateCarrier(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.carrier).error) {
      this.carriersService.update(this.carrier).subscribe( (res: any) => {
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
