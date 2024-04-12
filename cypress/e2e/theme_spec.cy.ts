describe('Theme module', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getDataTest('theme-toggle-btn').should('exist').click();
  });

  it('succesfully loads with data theme attr', () => {
    cy.get('html').should('have.attr', 'data-theme');
  });

  it('should change theme', () => {
    cy.get('html').invoke('attr', 'data-theme').should('not.eq', 'light');
  });

  it('should preserve selected theme after page reload', () => {
    cy.reload();
    cy.get('html').invoke('attr', 'data-theme').should('eq', 'dark');
  });

  it('should revert to initial theme after second click', () => {
    cy.get('html').invoke('attr', 'data-theme').should('eq', 'dark');
    cy.getDataTest('theme-toggle-btn').should('exist').click();
    cy.get('html').invoke('attr', 'data-theme').should('eq', 'light');
  });
});
