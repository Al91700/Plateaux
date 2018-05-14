import { PlateauxappPage } from './app.po';

describe('plateauxapp App', function() {
  let page: PlateauxappPage;

  beforeEach(() => {
    page = new PlateauxappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
