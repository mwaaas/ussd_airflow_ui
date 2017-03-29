import { UssdAirflowUiPage } from './app.po';

describe('ussd-airflow-ui App', () => {
  let page: UssdAirflowUiPage;

  beforeEach(() => {
    page = new UssdAirflowUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
