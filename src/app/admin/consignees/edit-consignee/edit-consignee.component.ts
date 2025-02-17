import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConsigneesService} from '../consignees.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-edit-consignee',
  templateUrl: './edit-consignee.component.html',
  styleUrls: ['./edit-consignee.component.css']
})
export class EditConsigneeComponent implements OnInit {
  consignee: any;
  states: any;
  validateError: any;
  consigneeId: string;

  constructor(private consigneesService: ConsigneesService,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private validationsService: ValidationsService,
              private roter: Router) {
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
    this.route.params.subscribe((param) => {
      this.consigneeId = param.id;
      this.getConsignee();
    });
  }

  getConsignee(): void {
    this.sharedService.setLoader(true);
    this.consigneesService.getOne(this.consigneeId).subscribe( (res: any) => {
      if (!res.error) {
        this.consignee = res.data;
      }
      this.sharedService.setLoader(false);
    });
  }

  updateConsignee(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.consignee).error) {
      this.consigneesService.update(this.consignee).subscribe( (res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/consignees']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('editConsigneeForm');
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
