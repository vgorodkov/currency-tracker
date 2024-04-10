export interface Option {
  id: number;
  name: string;
}

export interface ElasticSearchProps {
  label: keyof Option;
  selectedVal: string;
  handleChange: (val: string) => void;
  options: Option[];
}
