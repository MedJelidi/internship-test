import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display favorites link', async () => {
    await page.navigateTo();
    expect(await page.getLinkText('Favorites')).toEqual('Favorites');
  });

  it('should display home link', async () => {
    await page.navigateTo();
    expect(await page.getLinkText('Home')).toEqual('Home');
  });

  it('should list 12 images', async () => {
    await page.navigateTo();
    page.getSetOfImages().then((images) => {
      expect(images.length).toBe(12);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
