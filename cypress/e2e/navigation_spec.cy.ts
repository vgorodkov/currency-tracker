describe('Navigation module', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.url().should('include', '/');
  });

  it('should navigate to timeline page', () => {
    cy.getDataTest('navlink-timeline').click();
    cy.url().should('include', '/timeline');
  });

  it('should navigate to bankcard page', () => {
    cy.getDataTest('navlink-bank card').click();
    cy.url().should('include', '/bankcard');
  });

  it('should navigate to contacts page', () => {
    cy.getDataTest('navlink-contacts').click();
    cy.url().should('include', '/contacts');
  });
});
