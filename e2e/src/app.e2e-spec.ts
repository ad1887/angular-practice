import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

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
    page.navigateTo();
    browser.sleep(3000).then(() => {
      page.submtBtn().click();
      page.wait();
      expect(page.getNameValidationErrMsg()).toContain('Name is required');
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
