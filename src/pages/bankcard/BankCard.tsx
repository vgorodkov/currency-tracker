import 'mapbox-gl/dist/mapbox-gl.css';

import { useState } from 'react';

import { ElasticSearch } from '@/components/ElasticSearch';
import { Map } from '@/components/Map';

const MINSK_GEO = {
  lng: 27.567444,
  lat: 53.893009,
};

const options = [
  { id: 1, name: 'USD' },
  {
    id: 2,
    name: 'BYN',
  },
];

const BankCard = () => {
  const [currencyQuery, setCurrencyQuery] = useState(options[0].name);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <ElasticSearch
          options={options}
          label="name"
          selectedVal={currencyQuery}
          handleChange={(val) => setCurrencyQuery(val)}
        />
      </div>
      <Map startPos={MINSK_GEO} currency={currencyQuery} zoom={10} />
    </div>
  );
};

export default BankCard;
