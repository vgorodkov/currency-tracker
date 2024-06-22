export interface ChartCurrencySelectionProps {
  targetCurrency: string;
  openModalConnect: () => void;
  setTargetCurrencyConnect: (currency: string) => void;
}
