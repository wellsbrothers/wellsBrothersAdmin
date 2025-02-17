import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/shared.service';
import {LoadsService} from '../../loads.service';
import {BrokersService} from '../../../admin/brokers/brokers.service';
import {ConsigneesService} from '../../../admin/consignees/consignees.service';
import {SheepersService} from '../../../admin/sheepers/sheepers.service';
import {CarriersService} from '../../../admin/carriers/carriers.service';
import {AdminsService} from '../../../admin/admins/admins.service';
import {BranchesService} from '../../../admin/branches/branches.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ValidationsService} from '../../../validations/validations.service';

@Component({
  selector: 'app-load-modal',
  templateUrl: './load-modal.component.html',
  styleUrls: ['./load-modal.component.css'],
})
export class LoadModalComponent implements OnInit {
  @Input() loadModal: any;

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('pdfTableNew') pdfTableNew: ElementRef;
  @ViewChild('pdfTableBOL') pdfTableBOL: ElementRef;
  @ViewChild('pdfTableInvoice') pdfTableInvoice: ElementRef;

  loadId: string;
  role: number;
  percentage: number;
  states: any;

  sheeprOrConsignee: boolean;
  addSheeperModal: boolean;
  addConsigneeModal: boolean;
  addCarrier: boolean;
  errorMessageCreate: boolean;

  load: any;
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
  otherChargeSum: number;

  searchBroker: any;
  searchCarrier: any;
  searchSheeper: any;
  searchConsignee: any;
  broker: any;
  carrier: any;

  deleteLoadText: string;
  fileCount: any;
  deleteLoadFileId: string;
  backUrl: string;

  sheepersTab: any;
  consigneesTab: any;
  showFiles: boolean;
  showDeleteFileText: boolean;
  showFileUpload: boolean;
  deleteLoadModal: boolean;

  loadMoalAddOrEdtit: boolean;

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
      console.log('modal', this.role, typeof this.role);
    });
    sharedService.addBrokerModal$.subscribe((res: boolean) => {
      this.addBrokerModal = res;
    });
    sharedService.percentage$.subscribe((val: number) => {
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
  }

  setNewLoad(): void {
    this.fileCount = [];
    this.sheepersTab = [true];
    this.consigneesTab = [true];
    this.load = {
      num: 0,
      brocker_id: '',
      equipment: '',
      proNumber: '',
      check: '',
      size: 0,
      weight: 0,
      admin_id: JSON.parse(localStorage.getItem('admin'))._id,
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

  searchBrokers(e): void {
    this.brokersService
      .search({ field: this.searchBroker.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.brokers = res.data;
        }
      });
  }

  searchSheeprFunc(e): void {
    this.sheepersService
      .search({ field: this.searchSheeper.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.sheepers = res.data;
        }
      });
  }

  searchConsigneeFunc(e): void {
    this.consigneesService
      .search({ field: this.searchConsignee.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.consignees = res.data;
        }
      });
  }

  setSheeperAddress(i): void {
    const sheeperAddres = this.sheepers.filter((el) => {
      return el._id === this.load.sheeper[i].sheeper_id;
    })[0];
    this.load.sheeper[
      i
    ].address = `${sheeperAddres.address.address},${sheeperAddres.address.city}, ${sheeperAddres.address.state}, ${sheeperAddres.address.zip}`;
  }

  setConsigneeAddress(i): void {
    const consigneeAddres = this.consignees.filter((el) => {
      return el._id === this.load.consignee[i].consignee_id;
    })[0];
    this.load.consignee[
      i
    ].address = `${consigneeAddres.address.address},${consigneeAddres.address.city}, ${consigneeAddres.address.state}, ${consigneeAddres.address.zip}`;
  }

  searchCarrierFunc(e): void {
    this.carriersService
      .search({ field: this.searchCarrier.type, text: e.term })
      .subscribe((res: any) => {
        if (!res.error) {
          this.carriers = res.data;
        }
      });
  }

  oalCustomerInvoicFunc(): void {
    this.otherChargeSum = this.load.other_charges.reduce((a, b) => {
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
        this.load = res.data;
        this.load.sheeper.forEach((el, ind) => {
          this.sheepersTab[ind] = ind === 0;
          this.validationLoad.sheeper[ind] = {
            sheeper_id: false,
            address: false,
            date: false,
          };
        });
        this.load.consignee.forEach((el, ind) => {
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
        return this.load;
      } else {
        this.setNewLoad();
      }
      this.sharedService.loadCreatedFunc(false);
      this.notiFuncion(res);
    });
  }

  getFileUploadedAdminName(id): any {
    const username = this.load.files_addedBy.filter((el1) => {
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
            (el) => el.file_id !== this.deleteLoadFileId
          );
          this.showDeleteFileText = false;
        }
        this.sharedService.setLoader(false);
      });
  }

  deleteLoad(): void {
    this.sharedService.setLoader(true);
    if (this.load.files.length > 0) {
      this.load.files.forEach((el) => {
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

  removeProduct(i): void {
    this.load.products.splice(i, 1);
  }

  addOtherCharge(): void {
    this.load.other_charges.push({ note: '', price: 0 });
  }

  removeOtherCharge(i): void {
    this.load.other_charges.splice(i, 1);
  }

  addlineHoul(): void {
    this.load.line_houles.push({ note: '', price: 0 });
  }

  removelineHoul(i): void {
    this.load.line_houles.splice(i, 1);
  }

  /**
   * sheepers tabs
   */
  changeSheepersTab(i): void {
    this.sheepersTab = this.sheepersTab.map((el, ind) => {
      return i === ind;
    });
  }

  addSheeperTab(): void {
    this.sheepersTab.push(false);
    this.sheepersTab = this.sheepersTab.map((el, ind) => {
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
    this.consigneesTab = this.consigneesTab.map((el, ind) => {
      return i === ind;
    });
  }

  addConsigneeTab(): void {
    this.consigneesTab.push(false);
    this.consigneesTab = this.consigneesTab.map((el, ind) => {
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
    const allUploadedFiles = [];
    const inputEl: HTMLInputElement =
      this.el.nativeElement.querySelector('#file');

    for (let i = 0; i < files.length; i++) {
      const formData: any = new FormData();
      formData.append('file', inputEl.files.item(i));
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

  openPDF(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getRatePdf({
        html: document.getElementById('pdfTable').innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadRatePdf');
          doc.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFNew(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getRatePdfNew({
        html: document.getElementById('pdfTableNew').innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadRatePdfNew');
          doc.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFBOL(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getBol({
        html: document.getElementById('pdfTableBOL').innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadBolPdf');
          doc.click();
        }
        this.sharedService.setLoader(false);
      });
  }

  openPDFInvoice(): void {
    this.sharedService.setLoader(true);
    this.getLoad(this.loadId);
    this.loadsService
      .getInvoicePdf({
        html: document.getElementById('pdfTableInvoice').innerHTML,
        loadNum: this.load.num,
      })
      .subscribe((res) => {
        if (!res.error) {
          const doc = document.getElementById('downloadInvoicePdf');
          doc.click();
          // window.open(this.backUrl + '/invoice.pdf');
        }
        this.sharedService.setLoader(false);
      });
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
