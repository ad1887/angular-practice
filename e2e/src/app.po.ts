import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .container h3')).getText() as Promise<string>;
  }

  wait() {
    browser.waitForAngular();
  }

  submtBtn () {
    return element(by.className('mr-1'));
  }

  getNameValidationErrMsg () {
    return element(by.css('.invalid-feedback div')).getText() as Promise<string>;
  }
}
