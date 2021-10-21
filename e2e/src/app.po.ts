import {browser, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getLinkText(link: string): Promise<string> {
    const el = link === 'Home' ? element(by.css('[routerLink=""]')) : element(by.css('[routerLink="favorites"]'));
    return el.getText();
  }

  async getSetOfImages(): Promise<ElementArrayFinder> {
    return element.all(by.css('app-home .home-container .images-container .img-mr'));
  }

  getFavoriteContainerClass(): ElementFinder {
    return element(by.css('app-favorites .images-container'));
  }
}
