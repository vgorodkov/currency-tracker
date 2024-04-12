describe('Converter module', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('succesfully loads', () => {
    cy.url().should('include', '/');
  });

  it('should have exchange rates', () => {
    cy.getDataTest('rates-list').should('exist');
    cy.getDataTest('rates-list').find('ul').children().should('have.length.above', 0);
  });

  it('should open currency converter modal  and convert  currencies', () => {
    cy.getDataTest('rates-list').should('exist');
    cy.getDataTest('rates-list').find('ul').children().should('have.length.above', 0);
    cy.getDataTest('currency-card-BTC').should('exist').click();
    cy.getDataTest('converter-modal').should('be.visible');
    cy.getDataTest('convert-btn').click();
    cy.getDataTest('dropdown-btn').should('exist').click();
    cy.getDataTest('dropdown-content').should('be.visible');
    cy.getDataTest('dropdown-option').eq(1).click();
    cy.getDataTest('convert-btn').should('exist').click();
  });
});
