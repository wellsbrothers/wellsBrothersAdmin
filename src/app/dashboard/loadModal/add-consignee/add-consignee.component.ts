import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../shared/shared.service';
import {ConsigneesService} from '../../../admin/consignees/consignees.service';
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
  addConsigneeModal: boolean;
  errorMessageCreate: boolean;
  createResponseMessage: string;

  constructor(private sharedService: SharedService,
              private validationsService: ValidationsService,
              private consigneesService: ConsigneesService) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
    sharedService.addConsigneeModal$.subscribe((res: boolean) => {
      this.addConsigneeModal = res;
    });
  }

  ngOnInit(): void {
    this.setConsignee();
  }

  setConsignee(): void {
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

  closeModal(): void {
    this.sharedService.openModalAddConsignee(false);
    this.setConsignee();
  }

  createConsignee(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.consignee).error) {
      this.consigneesService.create(this.consignee).subscribe( (res: any) => {
        if (!res.error) {
          this.closeModal();
          this.setConsignee();
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
      this.sharedService.loadCreatedFunc(false);
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }


}
