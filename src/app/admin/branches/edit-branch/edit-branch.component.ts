import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BranchesService} from '../branches.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  states: any;
  branche: any;
  brancheId: string;
  validateError: any;


  constructor(private branchesService: BranchesService,
              private validationsService: ValidationsService,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private roter: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
      console.log('States ::', this.states);
    });
  }

  ngOnInit(): void {
    this.sharedService.setLoader(true);

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
    this.route.params.subscribe((param) => {
      this.brancheId = param.id;
      this.getBranche();
    });
  }

  getBranche(): void {
    this.branchesService.getOne(this.brancheId).subscribe( (res: any) => {
      if (!res.error) {
        this.branche = res.data;
        this.branche.phones.forEach((el, ind) => {
          this.validateError[ind] = false;
        });
      }
      this.sharedService.setLoader(false);
    });
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

  updateBranche(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.branche).error) {
      this.branchesService.update(this.branche).subscribe( (res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/branches']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('editBrancheForm');
      el.scrollIntoView();
    }
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
