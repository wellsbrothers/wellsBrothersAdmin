import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BranchesService} from '../branches.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  states: any;
  branche: any;
  validateError: any;

  constructor(private branchesService: BranchesService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private roter: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
      console.log('States ::', this.states);
    });
  }

  ngOnInit(): void {
    this.validateError = {
      name: false,
      mc: false,
      address: {
        address: false,
        city: false,
        zip: false,
        state: false,
      },
      phones: [false]
    };
    this.branche = {
      name: '',
      mc: '',
      address: {
        address: '',
        city: '',
        zip: 0,
        state: '',
      },
      phones: [{phoneNumber: ''}]
    };
  }

  addBranche(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.branche).error) {
      this.branchesService.create(this.branche).subscribe( (res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/branches']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('addBranchForm');
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
    this.branche.phones.push({phoneNumber: ''});
    this.validateError.phones.push(false);
  }

  removePhone(i): void {
    this.branche.phones.splice(i, 1);
    this.validateError.phones.splice(i, 1);
  }

}
