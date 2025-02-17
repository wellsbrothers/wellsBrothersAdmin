import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SheepersService} from '../sheepers.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-edit-sheeper',
  templateUrl: './edit-sheeper.component.html',
  styleUrls: ['./edit-sheeper.component.css']
})
export class EditSheeperComponent implements OnInit {
  sheeper: any;
  validateError: any;
  states: any;
  sheeperId: string;

  constructor(private sheepersService: SheepersService,
              private route: ActivatedRoute,
              private validationsService: ValidationsService,
              private sharedService: SharedService,
              private roter: Router) {
    sharedService.getJSON().subscribe((res: any) => {
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
      this.sheeperId = param.id;
      this.getSheeper();
    });
  }

  getSheeper(): void {
    this.sharedService.setLoader(true);
    this.sheepersService.getOne(this.sheeperId).subscribe((res: any) => {
      if (!res.error) {
        this.sheeper = res.data;
      }
      this.sharedService.setLoader(false);
    });
  }

  updateSheeper(): void {
    this.sharedService.setLoader(true);
    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.sheeper).error) {
      this.sheepersService.create(this.sheeper).subscribe( (res: any) => {
        if (!res.error) {
          this.roter.navigate(['/admin/shippers']);
        }
        this.notiFuncion(res);
      });
    } else {
      this.sharedService.setLoader(false);
      this.validateError = this.validationsService.returndObj;
      const el = document.getElementById('editSheeperForm');
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
