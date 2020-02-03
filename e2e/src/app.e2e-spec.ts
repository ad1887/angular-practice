import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { empMockData } from './mockdata'

describe('Angular Practice App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should validate Employee Registration form label', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Add new Employee');
  });

  it('should check the validation messages on blank form submission', () => {
    browser.sleep(3000).then(() => {
      page.submtBtn().click();
      // verify if err mesg found
      expect(page.getValidationErrMsg()).toBe(true);
    });
  });

  it('should submit the form with entered values and verify if new employee added in the list', () => {
    page.getEmpListSize().then((emp) => {
      let empListSize = emp.length;
      console.log('current employees count in the list:', empListSize);
      page.setFormFieldsVals(empMockData);
      // verify if no err mesg found
      expect(page.getValidationErrMsg()).toBe(false);
      page.submtBtn().click().then(() => {
        browser.sleep(5000).then(() => {
          // verify if new record added in employee list
          page.getEmpListSize().then((empl) => {
            console.log('count after added new employee in the list', empl.length);
            expect(empl.length).toBeGreaterThan(empListSize);
          });
        });
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
