import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {SettingsService} from './settings.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: any;
  states: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '18rem',
    minHeight: '4rem',
    translate: 'no',
  };
  editorConfig2: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '18rem',
    minHeight: '4rem',
    translate: 'no',
  };
  editorConfig3: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '18rem',
    minHeight: '4rem',
    translate: 'no',
  };
  constructor(private settingsService: SettingsService,
              private sharedService: SharedService,
  ) {
    sharedService.getJSON().subscribe( (res: any) => {
      this.states = res;
      console.log('States ::', this.states);
    });
  }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(): void {
    this.sharedService.setLoader(true);
    this.settingsService.get().subscribe((res: any) => {
      if (!res.error) {
        if (res.data && res.data.length > 0) {
          this.settings = res.data[0];
        } else {
          this.settings = {
            _id: '',
            pdf_note: '',
            pdf_note2: '',
            pdf_note3: '',
            phone: '',
            fax: '',
            email: '',
            companyName: '',
            mc: '',
            address: {
              address: '',
              state: '',
              zip: 0,
              city: ''
            },
            invoice: {
              phone: '',
              fax: '',
              email: '',
              companyName: '',
              mc: '',
              address: {
                address: '',
                state: '',
                zip: 0,
                city: ''
              },
            }
          };
        }
      }
      this.sharedService.setLoader(false);

    });
  }

  save(): void {
    this.sharedService.setLoader(true);
    if (this.settings._id && this.settings._id.length > 0) {
      this.settingsService.update(this.settings).subscribe((res: any) => {
        if (!res.error) {
          this.settings = res.data;
        }
        this.notiFuncion(res);
      });
    } else {
      this.settingsService.create(this.settings).subscribe((res: any) => {
        if (!res.error) {
          this.settings = res.data;
        }
        this.notiFuncion(res);
      });
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
