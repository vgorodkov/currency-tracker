import { Component } from 'react';

import { ElasticSearch } from '@/components/ElasticSearch';
import { Map } from '@/components/Map';

import styles from './styles.module.scss';

interface BankCardProps {}

interface BankCardState {
  currencyQuery: string;
}

const MINSK_GEO = {
  lng: 27.567444,
  lat: 53.893009,
};

const options = [
  { id: 1, name: 'USD' },
  { id: 2, name: 'BYN' },
];

class BankCard extends Component<BankCardProps, BankCardState> {
  constructor(props: BankCardProps) {
    super(props);
    this.state = {
      currencyQuery: options[0].name,
    };
  }

  handleCurrencyChange = (val: string) => {
    this.setState({ currencyQuery: val });
  };

  render() {
    const { currencyQuery } = this.state;
    return (
      <>
        <div className={styles.elasticSearchContainer}>
          <ElasticSearch
            options={options}
            label="name"
            selectedVal={currencyQuery}
            handleChange={this.handleCurrencyChange}
          />
        </div>
        <Map startPos={MINSK_GEO} currency={currencyQuery} zoom={10} />
      </>
    );
  }
}

export default BankCard;
