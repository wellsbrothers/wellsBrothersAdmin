import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AdminsService } from '../../../admin/admins/admins.service';
import { BranchesService } from '../../../admin/branches/branches.service';
import { BrokersService } from '../../../admin/brokers/brokers.service';
import { CarriersService } from '../../../admin/carriers/carriers.service';
import { ConsigneesService } from '../../../admin/consignees/consignees.service';
import { SheepersService } from '../../../admin/sheepers/sheepers.service';
import { SharedService } from '../../../shared/shared.service';
import { ValidationsService } from '../../../validations/validations.service';
import { LoadsService } from '../../loads.service';

@Component({
  selector: 'app-load-modal',
  templateUrl: './load-modal.component.html',
  styleUrls: ['./load-modal.component.css'],
})
export class LoadModalComponent implements OnInit {
  @Input() loadModal: any;

  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;
  @ViewChild('pdfTableNew') pdfTableNew: ElementRef | undefined;
  @ViewChild('pdfTableBOL') pdfTableBOL: ElementRef | undefined;
  @ViewChild('pdfTableInvoice') pdfTableInvoice: ElementRef | undefined;

  loadId: string = '';
  role: number;
  percentage: number;
  states: any;

  sheeprOrConsignee: boolean;
  addSheeperModal: boolean;
  addConsigneeModal: boolean;
  addCarrier: boolean;
  errorMessageCreate: boolean;

  load: any = {};
  validationLoad: any;
  brokers: any;
  sheepers: any;
  sheeper: any;
  consignees: any;
  consignee: any;
  carriers: any;
  admins: any;
  branches: any;

  addBrokerModal: boolean;
  otherChargeSum: number

  searchBroker: any;
  searchCarrier: any;
  searchSheeper: any;
  searchConsignee: any;
  broker: any;
  carrier: any;

  deleteLoadText: string = '';
  fileCount: any;
  deleteLoadFileId: string = '';
  backUrl: string = '';

  sheepersTab: any;
  consigneesTab: any;
  showFiles: boolean = false;
  showDeleteFileText: boolean = false;
  showFileUpload: boolean = false;
  deleteLoadModal: boolean = false;

  loadMoalAddOrEdtit: boolean | undefined;

  mailingModalShow: boolean = false;

  invoiceTerm: string | number = '30';
  customDays: number | null = null;

  invoicePDF: string | null = '';
  ratePDF: string | null = '';
  bolPDF: string | null = '';

  private _defaultMailText: string = '';

  get defaultMailText(): string | undefined {
    // Always regenerate based on current values
    if (this.invoiceTerm == '15' || this.invoiceTerm == '30' || this.invoiceTerm == '45') {
      if (this.load?.num == this.load?.broker_load) {
        return `Hello,
Please find attached the invoice for customer Order #${this.load?.broker_load ?? ''}.
We kindly request ${this.invoiceTerm ?? ''} day ACH payment.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`
      } else {
        return `Hello,
Please find attached the invoice for Load #${this.load?.num ?? ''}.
Customer Order #${this.load?.broker_load ?? ''}.
We kindly request ${this.invoiceTerm ?? ''} day ACH payment.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`
      }
    }

    if (this.invoiceTerm == 'Due Upon Receipt') {
      if (this.load?.num == this.load?.broker_load) {
        return `Hello,
Please find attached the invoice for customer Order #${this.load?.broker_load ?? ''}.
We kindly request that payment be made via ACH, due upon receipt.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`;
      } else {
        return `Hello,
Please find attached the invoice for Load #${this.load?.num ?? ''}.
Customer Order #${this.load?.broker_load ?? ''}.
We kindly request that payment be made via ACH, due upon receipt.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`;
      }

    }

    if (this.invoiceTerm == 'custom') {
      if (this.load?.num == this.load?.broker_load) {
        return this._defaultMailText ||
          `Hello,
Please find attached the invoice for customer Order #${this.load?.broker_load ?? ''}.
We kindly request ${this.customDays ?? ''} day ACH payment.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`;
      }
      else {
        return this._defaultMailText ||
          `Hello,
Please find attached the invoice for Load #${this.load?.num ?? ''}.
Customer Order #${this.load?.broker_load ?? ''}.
We kindly request ${this.customDays ?? ''} day ACH payment.
If you have any questions regarding this invoice or payment details, please contact our accounting department at accounting@wellsbrothersnv.com.

Thank you for your business and prompt attention.

Best,
Wells Brothers Accounting Department
www.wellsbrothersnv.com
1(725) 977-9992`;
      }
    }
  }

  set defaultMailText(value: string) {
    // When user edits the textarea, keep their custom text
    this._defaultMailText = value;
  }

  mailTo: string = '';
  mailSubject: string = '';
  ccEmails: { email: string }[] = []; // array of objects


  constructor(
    private sharedService: SharedService,
    private loadsService: LoadsService,
    private validationsService: ValidationsService,
    private brokersService: BrokersService,
    private consigneesService: ConsigneesService,
    private sheepersService: SheepersService,
    public el: ElementRef,
    private carriersService: CarriersService,
    private adminsService: AdminsService,
    private branchesService: BranchesService
  ) {
    sharedService.role$.subscribe((val: number) => {
      this.role = val;
    });
    sharedService.addBrokerModal$.subscribe((res: boolean) => {
      this.addBrokerModal = res;
    });
    sharedService.percentage$.subscribe((val: number | any) => {
      this.percentage = val;
    });
    sharedService.loadMoalAddOrEdtit$.subscribe((val: any) => {
      this.loadMoalAddOrEdtit = val.add;
      this.loadId = val.loadId;
      if (val.add) {
        this.setNewLoad();
      } else {
        this.getLoad(this.loadId);
      }
    });
    sharedService.getJSON().subscribe((res: any) => {
      this.states = res;
    });
  }

  ngOnInit(): void {
    this.backUrl = environment.apiUrl;
    this.fileCount = [];

    this.sheeprOrConsignee = false;
    this.addSheeperModal = false;
    this.addConsigneeModal = false;
    this.addCarrier = false;

    this.showDeleteFileText = false;
    this.deleteLoadModal = false;
    this.errorMessageCreate = false;
    this.showFiles = false;
    this.showFileUpload = false;

    this.otherChargeSum = 0;
    this.searchSheeper = { type: 'searchWord', name: '' };
    this.searchConsignee = { type: 'searchWord', name: '' };
    this.searchBroker = {
      text: '',
      type: 'searchWord',
    };
    this.searchCarrier = {
      text: '',
      type: 'searchWord',
    };
    this.deleteLoadText = 'Are You Sure? !!!!';
    this.getBranches();
    this.getAdmins();
    this.setValidation();

    this.onClickOutside(document.getElementById("fileUploadModal"), () => {
      this.showFileUpload = false
    });

    this.onClickOutside(document.getElementById("fileUploadViewModal"), () => {
      this.showFiles = false
    });
  }

  onClickOutside = (element, callback) => {
    document.addEventListener('click', e => {
      if (!element?.contains(e.target)) callback();
    });
  };

  onSendMail(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.sharedService.setLoader(true);

    this.loadsService.sendMail({
      load_id: +this.load.num,
      message: this.defaultMailText,
      email: this.mailTo,
      subject: this.mailSubject,
      cc_email: this.ccEmails
        .map(cc => cc.email)        // extract the email strings
        .filter(email => email),    // remove empty entries // remove empty
    }).subscribe((res: any) => {
      if (!res.error) {
        console.log(res.error);
      }
      this.sharedService.setLoader(false);
      this.mailingModalShow = false;

      this.load.invoice.bool = true;
      this.createLoad();
    })
  }

  addCC() {
    this.ccEmails.push({ email: '' }); // push an object
  }

  removeCC(index: number) {
    this.ccEmails.splice(index, 1);
  }

  onOpenMailingModal() {
    this.mailingModalShow = true;
    this.sharedService.setLoader(true);

    this.loadsService.getInvoicePdf({
      html: document.getElementById('pdfTableInvoice')?.innerHTML,
      loadNum: this.load.num,
    }).subscribe(
      () => {
        this.invoicePDF = `${this.backUrl}/pdf/${this.load.num}_invoice.pdf`;

        this.sharedService.setLoader(false);
      },
      (err) => {
        console.error('PDF generation error:', err);
        this.sharedService.setLoader(false);
      }
    );
  }

  onInvoiceTermChange() {
    if (!this.load.invoice.date) {
      this.load.invoice.date = new Date();
    }
    if (this.invoiceTerm === '15' || this.invoiceTerm === '30' || this.invoiceTerm === '45') {
      const today = new Date(this.load.invoice.date);
      today.setDate(today.getDate() + Number(this.invoiceTerm));


      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const year = today.getFullYear();

      this.load.invoice.dueDate = `${month}-${day}-${year}`

    } else if (this.invoiceTerm === 'custom') {
      this.customDays = null;
    } else if (this.invoiceTerm === 'Due Upon Receipt') {
      this.customDays = null;
      this.load.invoice.dueDate = this.invoiceTerm;
    }
  }

  onCustomDaysChange() {
    if (this.customDays && this.customDays > 0) {
      const today = new Date(this.load.invoice.date);
      today.setDate(today.getDate() + this.customDays);

      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const year = today.getFullYear();

      this.load.invoice.dueDate = `${month}-${day}-${year}`
    }
  }

  setNewLoad(): void {
    this.fileCount = [];
    this.sheepersTab = [true];
    this.consigneesTab = [true];
    this.invoiceTerm = '30';
    this.customDays = null;

    this.load = {
      num: 0,
      brocker_id: '',
      equipment: '',
      proNumber: '',
      check: '',
      size: 0,
      weight: 0,
      admin_id: JSON.parse(localStorage.getItem('admin') as any)._id,
      branch_id: '',
      broker_load: '',
      broker_rate: '',
      // bookedWidth: '',
      // loadNote: '',
      other_charges: [
        {
          note: '',
          price: 0,
        },
      ],
      line_houles: [
        {
          note: '',
          price: 0,
        },
      ],
      invoice: {
        date: '',
        dueDate: '',
        bool: false,
      },
      total_customer_invoice: 0,
      carrier_id: '',
      carrier_fee: null,
      carrier_gross_pay: 0,
      products: [
        {
          name: '',
          note: '',
        },
      ],
      sheeper: [
        {
          sheeper_id: '',
          address: '',
          date: '',
          time: '',
          note: '',
          poNumber: '',
          phone: '',
          qty: null,
          weight: null,
          specialServices: '',
        },
      ],
      consignee: [
        {
          consignee_id: '',
          address: '',
          date: '',
          time: '',
          note: '',
          poNumber: '',
          phone: '',
          qty: null,
          weight: null,
          specialServices: '',
        },
      ],
      pay: false,
      balance_owing: 0,
      bol_date: new Date(),
      process_date: new Date(),
      end_date: new Date(),
      driver_pay: false,
      locked: false,
      files: [],
      tonu: false,
      status: true,
      sortBool: true,
      sortBy: 'createdAt',
    };
  }

  setValidation(): void {
    if (!this.load._id && this.load._id === null) {
      this.validationLoad = {
        brocker_id: false,
        // branch_id: false,
        broker_load: false,
        broker_rate: false,
        carrier_id: false,
        // carrier_fee: false,
        sheeper: [
          {
            sheeper_id: false,
            address: false,
            date: false,
          },
        ],
        consignee: [
          {
            consignee_id: false,
            address: false,
            date: false,
          },
        ],
      };
    } else {
      this.validationLoad = {
        brocker_id: false,
        // branch_id: false,
        broker_load: false,
        broker_rate: false,
        carrier_id: false,
        // carrier_fee: false,
        sheeper: Array(this.load.sheeper.length).fill({
          sheeper_id: false,
          address: false,
          date: false,
        }),
        consignee: Array(this.load.consignee.length).fill({
          consignee_id: false,
          address: false,
          date: false,
        }),
      };
    }
  }

  getBranches(): void {
    this.branchesService.getAll().subscribe((res: any) => {
      if (!res.error) {
        this.branches = res.data;
      }
    });
  }

  searchBrokers(e: any): void {
    this.brokersService
      .search({ field: this.searchBroker.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.brokers = res.data;
        }
      });
  }

  searchSheeprFunc(e: any): void {
    this.sheepersService
      .search({ field: this.searchSheeper.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.sheepers = res.data;
        }
      });
  }

  searchConsigneeFunc(e: any): void {
    this.consigneesService
      .search({ field: this.searchConsignee.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.consignees = res.data;
        }
      });
  }

  setSheeperAddress(i: any): void {
    const sheeperAddres = this.sheepers.filter((el: any) => {
      return el._id === this.load.sheeper[i].sheeper_id;
    })[0];
    this.load.sheeper[
      i
    ].address = `${sheeperAddres.address.address},${sheeperAddres.address.city}, ${sheeperAddres.address.state}, ${sheeperAddres.address.zip}`;
  }

  setConsigneeAddress(i: any): void {
    const consigneeAddres = this.consignees.filter((el: any) => {
      return el._id === this.load.consignee[i].consignee_id;
    })[0];
    this.load.consignee[
      i
    ].address = `${consigneeAddres.address.address},${consigneeAddres.address.city}, ${consigneeAddres.address.state}, ${consigneeAddres.address.zip}`;
  }

  searchCarrierFunc(e: any): void {
    this.carriersService
      .search({ field: this.searchCarrier.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.carriers = res.data;
        }
      });
  }

  oalCustomerInvoicFunc(): void {
    this.otherChargeSum = this.load.other_charges.reduce((a: any, b: any) => {
      return a + b.price;
    }, 0);
    this.load.total_customer_invoice =
      this.otherChargeSum + this.load.broker_rate;
  }

  getAdmins(): void {
    if (this.role !== 2) {
      this.adminsService.getAll().subscribe((res: any) => {
        if (!res.error) {
          this.admins = res.data;
        }
      });
    }
  }

  getLoad(id): void {
    this.sharedService.loadCreatedFunc(true);

    this.loadsService.getOne(id).subscribe((res: any) => {
      if (!res.error) {
        // let date = this.load.invoice.date;
        this.load = res.data;
        // this.load.invoice.date = date

        this.load.sheeper.forEach((el: any, ind: any) => {
          this.sheepersTab[ind] = ind === 0;
          this.validationLoad.sheeper[ind] = {
            sheeper_id: false,
            address: false,
            date: false,
          };
        });
        this.load.consignee.forEach((el: any, ind: any) => {
          this.consigneesTab[ind] = ind === 0;
          this.validationLoad.consignee[ind] = {
            consignee_id: false,
            address: false,
            date: false,
          };
        });
        this.brokers = res.data.broker;
        this.carriers = res.data.carrier;
        this.sheepers = res.data.sheepersList;
        this.consignees = res.data.consigneesList;
        this.mailTo = res.data.broker[0].email_to;
        this.ccEmails = (res.data.broker[0].email_cc || []).map((e: string) => ({ email: e }));
        return this.load;
      } else {
        this.setNewLoad();
      }
      this.sharedService.loadCreatedFunc(false);
      this.notiFuncion(res);
    });
  }

  getFileUploadedAdminName(id: any): any {
    const username = this.load.files_addedBy.filter((el1: any) => {
      return id === el1._id;
    });
    return username[0]
      ? username[0].username + (username[0].note ? '-' + username[0].note : '')
      : '-';
  }

  deleteUploadFile(): void {
    this.sharedService.setLoader(true);
    this.loadsService
      .deleteFile(this.load._id, this.deleteLoadFileId)
      .subscribe((res: any) => {
        if (!res.error) {
          this.load.files = this.load.files.filter(
            (el: any) => el.file_id !== this.deleteLoadFileId
          );
          this.showDeleteFileText = false;
        }
        this.sharedService.setLoader(false);
      });
  }

  deleteLoad(): void {
    this.sharedService.setLoader(true);
    if (this.load.files.length > 0) {
      this.load.files.forEach((el: any) => {
        this.deleteLoadFileId = el.file_id;
        this.deleteUploadFile();
      });
    }

    this.loadsService.deleteLoad(this.load._id).subscribe((res: any) => {
      if (!res.error) {
        this.deleteLoadText = 'Load Deleted Succesffuly';
        this.sharedService.reloadLoads();
        this.sharedService.loadCreatedFunc(true);
        setTimeout(() => {
          this.deleteLoadModal = false;
          this.loadModal.show = false;
        }, 1500);
      } else {
        this.deleteLoadText = res.message;
      }
      this.sharedService.setLoader(false);
    });
  }

  addProduct(): void {
    if (!this.load.products) {
      this.load.products = [{ name: '', note: '' }];
    } else {
      this.load.products.push({ note: '', price: 0 });
    }
  }

  removeProduct(i: number): void {
    this.load.products.splice(i, 1);
  }

  addOtherCharge(): void {
    this.load.other_charges.push({ note: '', price: 0 });
  }

  removeOtherCharge(i: number): void {
    this.load.other_charges.splice(i, 1);
  }

  addlineHoul(): void {
    this.load.line_houles.push({ note: '', price: 0 });
  }

  removelineHoul(i: number): void {
    this.load.line_houles.splice(i, 1);
  }

  /**
   * sheepers tabs
   */
  changeSheepersTab(i): void {
    this.sheepersTab = this.sheepersTab.map((el: any, ind: number) => {
      return i === ind;
    });
  }

  addSheeperTab(): void {
    this.sheepersTab.push(false);
    this.sheepersTab = this.sheepersTab.map((el: any, ind: number) => {
      return ind === this.sheepersTab.length - 1;
    });
    this.load.sheeper.push({
      sheeper_id: '',
      address: '',
      date: '',
      time: '',
      note: '',
      poNumber: '',
      qty: null,
      weight: null,
      phone: '',
      specialServices: '',
    });
    this.validationLoad.sheeper.push({
      sheeper_id: false,
      address: false,
      date: false,
    });
  }

  removeSheeperTab(i): void {
    this.load.sheeper.splice(i, 1);
    this.sheepersTab.splice(i, 1);
    this.validationLoad.sheeper.splice(i, 1);
    this.sheepersTab[0] = true;
  }

  /**
   * consignee tabs
   */
  changeConsigneeTab(i): void {
    this.consigneesTab = this.consigneesTab.map((el: any, ind: number) => {
      return i === ind;
    });
  }

  addConsigneeTab(): void {
    this.consigneesTab.push(false);
    this.consigneesTab = this.consigneesTab.map((el: any, ind: number) => {
      return ind === this.consigneesTab.length - 1;
    });
    this.load.consignee.push({
      consignee_id: '',
      address: '',
      date: '',
      time: '',
      note: '',
      poNumber: '',
      qty: null,
      weight: null,
      phone: '',
      specialServices: '',
    });
    this.validationLoad.consignee.push({
      consignee_id: false,
      address: false,
      date: false,
    });
  }

  removeConsigneeTab(i): void {
    this.load.consignee.splice(i, 1);
    this.validationLoad.consignee.splice(i, 1);
    this.consigneesTab.splice(i, 1);
    this.consigneesTab[0] = true;
  }

  notiFuncion(data): void {
    this.sharedService.setnotShow(true);
    this.sharedService.setnotError(data.error);
    this.sharedService.setnotMessage(data.message);
    this.sharedService.setLoader(false);
    setTimeout(() => {
      this.sharedService.setnotShow(false);
      this.sharedService.setnotMessage('');
    }, 3000);
  }

  createLoad(): void {
    this.sharedService.setLoader(true);
    if (
      !this.validationsService.validationLoad(this.validationLoad, this.load)
        .error
    ) {
      this.load.pay ? (this.load.payedStatus = 2) : (this.load.payedStatus = 0);
      if (this.loadMoalAddOrEdtit) {
        this.loadsService.create(this.load).subscribe((res: any) => {
          if (!res.error) {
            this.carriersService
              .updateCarrierLastLoadId({
                _id: this.load.carrier_id,
                last_load_id: res.data._id,
              })
              .subscribe((resp: any) => {
                if (!resp.error) {
                  this.loadModal.show = false;
                  this.sharedService.reloadLoads();
                  this.sharedService.loadCreatedFunc(false);
                  if (this.fileCount.length > 0) {
                    this.upload(res.data._id);
                  }
                  this.setNewLoad();
                  this.setValidation();
                }
              });
          }
          this.notiFuncion(res);
        });
      } else {
        this.loadsService.update(this.load).subscribe((res: any) => {
          if (!res.error) {
            this.carriersService
              .updateCarrierLastLoadId({
                _id: this.load.carrier_id,
                last_load_id: res.data._id,
              })
              .subscribe((resp: any) => {
                if (!resp.error) {
                  this.loadModal.show = false;
                  this.sharedService.reloadLoads();
                  this.sharedService.loadCreatedFunc(false);
                  if (this.fileCount.length > 0) {
                    this.upload(res.data._id);
                  }
                  this.setNewLoad();
                  this.setValidation();
                }
              });
          }
          this.notiFuncion(res);
        });
      }
      this.sharedService.setLoader(false);
    } else {
      this.sharedService.loadCreatedFunc(false);
      this.sharedService.setLoader(false);
      this.validationLoad = this.validationsService.returndObj;
    }
  }

  /**
   * file upload
   */

  upload(loadId): void {
    const files = this.fileCount;
    const allUploadedFiles: any = [];
    const inputEl: HTMLInputElement =
      this.el.nativeElement.querySelector('#file');

    for (let i = 0; i < files.length; i++) {
      const formData: any = new FormData();
      formData.append('file', inputEl.files?.item(i));
      this.loadsService.upload(loadId, formData).subscribe((res: any) => {
        if (!res.error) {
          allUploadedFiles.push({ error: false, message: '' });
        } else {
          allUploadedFiles.push({
            error: true,
            message: 'Error on uploading File - ' + files[i].name,
          });
        }
      });
    }

    const bool = allUploadedFiles.filter((el) => el.error);
    if (bool.length > 0) {
      alert(bool[0].message);
    }
  }

  onChange(fileInput: any): void {
    this.fileCount = fileInput.target.files;
    console.log('file', this.fileCount, typeof this.fileCount);
  }

  onDateChange(newValue: any) {
    this.onInvoiceTermChange();
  }

  openPDF(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getRatePdf({
        html: document.getElementById('pdfTable')?.innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadRatePdf');
          doc?.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFNew(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getRatePdfNew({
        html: document.getElementById('pdfTableNew')?.innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadRatePdfNew');
          doc?.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFBOL(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getBol({
        html: document.getElementById('pdfTableBOL')?.innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadBolPdf');
          doc?.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFInvoice(): void {
    this.sharedService.setLoader(true);
    this.loadsService
      .getInvoicePdf({
        html: document.getElementById('pdfTableInvoice')?.innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadInvoicePdf');
          doc?.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  getMailSubject(): string {
    return `Invoice for load #${this.load.num}`
  }

  openModalAddSheeper(): void {
    this.sharedService.openModalAddSheeper(true);
  }
  openModalAddConsignee(): void {
    this.sharedService.openModalAddConsignee(true);
  }
  openModalAddBroker(): void {
    this.sharedService.openModalAddBroker(true);
  }
  openModalAddCarrier(): void {
    this.sharedService.openModalAddCarrier(true);
  }
}
