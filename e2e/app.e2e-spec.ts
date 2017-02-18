import { ECNTrackerPage } from './app.po';

describe('ecn-tracker App', () => {
  let page: ECNTrackerPage;

  beforeEach(() => {
    page = new ECNTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
