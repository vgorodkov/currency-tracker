import { OHLC } from '@/types/candlestickChart';

export const testChartPriceInput = (prices: OHLC[]) => {
  prices.forEach((dayPrice, index) => {
    if (index === 0) {
      cy.getDataTest('input-openPrice').should('exist').type(dayPrice.openPrice.toString());
    }
    cy.getDataTest('input-lowPrice').should('exist').type(dayPrice.lowPrice.toString());
    cy.getDataTest('input-highPrice').should('exist').type(dayPrice.highPrice.toString());
    cy.getDataTest('input-closePrice').should('exist').type(dayPrice.closePrice.toString());
    cy.getDataTest('chart-build-btn').should('exist').click();
  });
};

export const testConverterModalOpen = () => {
  cy.getDataTest('rates-list').should('exist');
  cy.getDataTest('rates-list').find('ul').children().should('have.length.above', 0);
  cy.getDataTest('currency-card-BTC').should('exist').click();
  cy.getDataTest('converter-modal').should('be.visible');
  cy.getDataTest('convert-btn').click();
};
