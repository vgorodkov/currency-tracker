import { CONVERTER_API_URL } from '@/constants/api';
import { testConverterModalOpen } from 'cypress/support/utils';

describe('Converter module', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show error UI if request fails', () => {
    cy.intercept('GET', `${CONVERTER_API_URL}/BTC/ARS`, (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as('getConvertedError');

    testConverterModalOpen();
    cy.getDataTest('converter-error').should('exist');
  });

  it('should open currency converter modal and convert currencies', () => {
    cy.intercept('GET', `${CONVERTER_API_URL}/BTC/ARS`, {
      fixture: 'converted.json',
      delay: 3000,
    }).as('getConverted');

    testConverterModalOpen();
    cy.getDataTest('loader-spinner').should('exist');
    cy.wait(['@getConverted']);
    cy.getDataTest('dropdown-btn').should('exist').click();
    cy.getDataTest('dropdown-content').should('be.visible');
    cy.getDataTest('dropdown-option').eq(1).click();
    cy.getDataTest('convert-btn').should('exist').click();
  });
});
