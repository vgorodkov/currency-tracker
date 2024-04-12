/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add('getDataTest', (value) => {
  return cy.get(`[data-test="${value}"]`);
});
