import { ChartDayData } from '@/types/candlestickChart';

export interface ChartInputModalProps {
  chartDayData: ChartDayData;
  isInpuModalOpen: boolean;
  closeModalConnect: () => void;
  setChartDataConnect: () => void;
  isFirstDateSelected: boolean;
}
