import { MONTH_LENGTH } from '@/pages/timeline/constants';
import { getMockPriceData } from '@/utils/getMockPriceData';
import { handlePriceInputForTest } from '@/utils/handlePriceInputForTest';

describe('Chart dummy', () => {
  it('succesfully loads with chartDummy', () => {
    cy.visit('/timeline');
    cy.getDataTest('chart-dummy').should('exist');
  });
});

describe('Chart modal for data input', () => {
  const prices = getMockPriceData(1);

  beforeEach(() => {
    cy.visit('/timeline');
    cy.getDataTest('chart-selection-btn').should('exist').click();
  });

  it('should build chart based on valid data input', () => {
    handlePriceInputForTest(prices);
    cy.getDataTest('chart-canvas').should('exist');
  });

  it('should not build chart if close price equal to open price', () => {
    cy.getDataTest('input-openPrice').should('exist').type('200');
    cy.getDataTest('input-lowPrice').should('exist').type('100');
    cy.getDataTest('input-highPrice').should('exist').type('500');
    cy.getDataTest('input-closePrice').should('exist').type('200');
    cy.getDataTest('chart-build-btn').should('exist').should('be.disabled');
    cy.getDataTest('chart-canvas').should('not.exist');
  });

  it('should be able to pick start date', () => {
    cy.getDataTest('chart-date-input').should('exist').type('2009-12-12');
    cy.getDataTest('chart-date-input').should('exist').type('2024-12-12');
  });

  it('should not be able to change open because it basis on prev day close', () => {
    handlePriceInputForTest(prices);
    cy.getDataTest('input-openPrice').should('have.attr', 'readonly', 'readonly');
  });
});

describe('Candlestick chart with month data', () => {
  const prices = getMockPriceData(MONTH_LENGTH);

  it('should be able to build chart for month', () => {
    cy.visit('/timeline');
    cy.getDataTest('chart-selection-btn').should('exist').click();
    handlePriceInputForTest(prices);
    cy.getDataTest('chart-toast')
      .should('exist')
      .contains(/The chart was successfully built for one month/i);
  });
});
