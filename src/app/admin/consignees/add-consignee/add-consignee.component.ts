import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConsigneesService} from '../consignees.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-consignee',
  templateUrl: './add-consignee.component.html',
  styleUrls: ['./add-consignee.component.css']
})
export class AddConsigneeComponent implements OnInit {
  consignee: any;
  states: any;
  validateError: any;
  constructor(private consigneesService: ConsigneesService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
    this.validateError = {
      name: false,
      address: {
        address: false,
        zip: false,
        city: false,
        state: false
      }
    };
    this.consignee = {
      name: '',
      phone: '',
      address: {
        address: '',
        zip: 0,
        city: '',
        state: ''
      }
    };
  }

  createConsignee(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.consignee).error) {
      this.consigneesService.create(this.consignee).subscribe( (res: any) => {
        if (!res.error) {
          this.router.navigate(['/admin/consignees']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('addConsigneeForm');
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
