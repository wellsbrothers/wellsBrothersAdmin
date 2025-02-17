import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  returndObj: any;

  constructor() { }

  validation(validatorObj, validatedObj): any {
    const isNotEmpty = /\S+/;
    const isNumber = /^\d+$/;
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for (const [key, value] of Object.entries(validatedObj)) {
      if (validatorObj.hasOwnProperty(key)) {
        if (!validatedObj[key] || validatedObj[key] == null || typeof  validatedObj[key] === 'undefined') {
          validatorObj[key] = true;
        } else {
          if (key === 'phones') {
            validatedObj[key].forEach((el, ind) => {
              validatorObj[key][ind] = !isNotEmpty.test(el.phoneNumber);
            });
          } else if (key === 'loadNumber') {
            validatedObj[key].forEach((el, ind) => {
              validatorObj[key][ind] = ((!isNotEmpty.test(el.loadNumber) && !isNumber.test(el.loadNumber)) || el.loadNumber === 0);
            });
          } else if (key === 'email' || key === 'companyEmail') {
            validatorObj[key] = !isNotEmpty.test(validatedObj[key]) && !isEmail.test(validatedObj[key]);
          } else if (key === 'address') {
            validatorObj[key].address = !isNotEmpty.test(validatedObj[key].address);
            validatorObj[key].city = !isNotEmpty.test(validatedObj[key].city);
            validatorObj[key].zip = (validatedObj[key].zip === null || !isNotEmpty.test(validatedObj[key].zip));
            validatorObj[key].state = !isNotEmpty.test(validatedObj[key].state);
          } else {
            validatorObj[key] = !isNotEmpty.test(validatedObj[key]);
          }
        }
      }
    }
    this.returndObj = validatorObj;
    return {error: (Object.values(validatorObj).indexOf(true) >= 0 ||
        (validatorObj.hasOwnProperty('address') ? Object.values(validatorObj.address).indexOf(true) >= 0 : false) ||
        (validatorObj.hasOwnProperty('phones') ? validatorObj.phones.indexOf(true) >= 0 : false))} ;
  }

  validationLoad(validatorObj, validatedObj): any {
    let checkSheeperValid = false;
    let checkConsigneeValid = false;
    const isNotEmpty = /\S+/;
    const isNumber = /^\d+$/;
    for (const [key, value] of Object.entries(validatedObj)) {
      if (validatorObj.hasOwnProperty(key)) {
        if (!validatedObj[key] || validatedObj[key] == null || typeof  validatedObj[key] === 'undefined') {
          validatorObj[key] = ((key === 'broker_rate' || key === 'carrier_fee') && validatedObj[key] === 0) ? false : true;
        } else {
          if (!validatedObj.tonu) {
            if (key === 'sheeper' || key === 'consignee') {
              const keyWord = (key === 'sheeper') ? 'sheeper_id' : 'consignee_id';
              validatedObj[key].forEach((el, ind) => {
                validatorObj[key][ind][keyWord] = !isNotEmpty.test(el[keyWord]);
                validatorObj[key][ind].address = !isNotEmpty.test(el.address);
                validatorObj[key][ind].date = !isNotEmpty.test(el.date);
              });
              console.log(1, validatorObj);
            } else {
              validatorObj[key] = !isNotEmpty.test(validatedObj[key]);
            }
            checkSheeperValid = typeof validatorObj.sheeper.find(x => {
              return x.address ||
                x.date ||
                x.sheeper_id
            }) !== 'undefined';

            checkConsigneeValid = typeof validatorObj.consignee.find(x => {
              return x.address ||
                x.date ||
                x.consignee_id
            }) !== 'undefined';
            console.log('error', Object.values(validatorObj).indexOf(true) >= 0 , checkSheeperValid , checkConsigneeValid);
          } else {
            if (key === 'sheeper' || key === 'consignee') {
              const keyWord = (key === 'sheeper') ? 'sheeper_id' : 'consignee_id';
              validatedObj[key].forEach((el, ind) => {
                validatorObj[key][ind][keyWord] = false;
                validatorObj[key][ind].address = false;
                validatorObj[key][ind].date = false;
              });

              console.log(2, validatorObj);
            } else {
              validatorObj[key] = !isNotEmpty.test(validatedObj[key]);
            }
          }
        }
      }
    }
    this.returndObj = validatorObj;
    return {error: (Object.values(validatorObj).indexOf(true) >= 0 ||  checkSheeperValid || checkConsigneeValid)} ;
  }

}
