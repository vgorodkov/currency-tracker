import { EXCHANGES_API_URL } from '@/constants/api';

const MOCK_API_URL = `${EXCHANGES_API_URL}?filter_asset_id=BTC%3BARS%3BEUR%3BCAD%3BJPY%3BAUD%3BCNY%3BGBP&invert=true`;

describe('Exchange rates module', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show loader UI while fetching rates', () => {
    cy.getDataTest('loading-fallback').should('exist');
  });

  it('should show error UI if error during request occurred', () => {
    cy.intercept('GET', MOCK_API_URL, (req) => {
      req.reply({
        statusCode: 500,
      });
    });
    cy.getDataTest('error-fallback').should('exist');
  });

  it('should show exchange rates if request succeed', () => {
    cy.intercept('GET', MOCK_API_URL, { fixture: 'rates.json' }).as('getExchangeRates');
    cy.wait(['@getExchangeRates']);
    cy.getDataTest('rates-list').should('exist');
    cy.getDataTest('rates-list').find('ul').children().should('have.length.above', 0);
  });
});
