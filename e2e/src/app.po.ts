import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .container h3')).getText() as Promise<string>;
  }

  wait(promise, time, msg) {
    browser.wait(promise, time, msg);
  }

  waitForAngular() {
    browser.waitForAngular() as Promise<void>;
  }

  submtBtn () {
    return element(by.className('saveFrm')).click() as Promise<void>;
  }

  getValidationErrMsg () {
    return element(by.css('.form-group .invalid-feedback')).isPresent() as Promise<boolean>;
  }

  setFormFieldsVals (empMockData) {
    if(Object.keys(empMockData).length) {
      Object.keys(empMockData).forEach((val, key) => {
        element(by.css('input[formcontrolname="' + val + '"]')).sendKeys(empMockData[val]);
      });
    }
  }

  getEmpListSize () {
    return element.all(by.css('.empList > tbody > tr'));
  }
}
