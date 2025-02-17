import { Component, OnInit } from '@angular/core';
import {SheepersService} from '../sheepers.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-sheeper',
  templateUrl: './add-sheeper.component.html',
  styleUrls: ['./add-sheeper.component.css']
})
export class AddSheeperComponent implements OnInit {
  sheeper: any;
  states: any;
  validateError: any;
  constructor(private sheepersService: SheepersService,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private router: Router) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
    this.sheeper = {
      name: '',
      address: {
        address: '',
        zip: 0,
        city: '',
        state: ''
      }
    };
    this.validateError = {
      name: false,
      phone: false,
      address: {
        address: false,
        zip: false,
        city: false,
        state: false
      }
    };
  }

  createSheeper(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.sheeper).error) {
      this.sheepersService.create(this.sheeper).subscribe( (res: any) => {
        if (!res.error) {
          this.router.navigate(['/admin/shippers']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('addSheeperForm');
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
