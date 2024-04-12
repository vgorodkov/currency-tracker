declare namespace Cypress {
  interface Chainable {
    getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
  }
}
