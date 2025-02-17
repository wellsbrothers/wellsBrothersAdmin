import { Component, OnInit } from '@angular/core';
import {SheepersService} from '../../../admin/sheepers/sheepers.service';
import {SharedService} from '../../../shared/shared.service';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-add-sheeper',
  templateUrl: './add-sheeper.component.html',
  styleUrls: ['./add-sheeper.component.css']
})
export class AddSheeperComponent implements OnInit {
  sheeper: any;
  errorMessageCreate: boolean;
  addSheeperModal: boolean;
  createResponseMessage: string;
  states: any;
  validateError: any;
  constructor(private sharedService: SharedService,
              private validationsService: ValidationsService,
              private sheepersService: SheepersService) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
    });
    sharedService.addSheeperModal$.subscribe((res: boolean) => {
      this.addSheeperModal = res;
    });
  }

  ngOnInit(): void {
    this.setSheeper();
  }

  setSheeper(): void {
    this.validateError = {
      name: false,
      address: {
        address: false,
        zip: false,
        city: false,
        state: false
      }
    };
    this.sheeper = {
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
    this.sharedService.openModalAddSheeper(false);
    this.setSheeper();
  }

  createSheeper(): void {
    this.sharedService.setLoader(true);

    this.validationsService.returndObj = this.validateError;
    if (!this.validationsService.validation(this.validateError, this.sheeper).error) {
      this.sheepersService.create(this.sheeper).subscribe( (res: any) => {
        if (!res.error) {
          this.closeModal();
          this.setSheeper();
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
      this.sharedService.loadCreatedFunc(false);
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 2500);
  }


}
