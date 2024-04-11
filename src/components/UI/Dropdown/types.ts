export interface DropdownProps {
  selected: string;
  handleSelect: (toCurrency: string) => void;
  options: string[];
  pos?: 'above' | 'below';
}
