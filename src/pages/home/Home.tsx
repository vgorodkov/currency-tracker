import { useCallback, useState } from 'react';

import { ConverterModal } from '@/components/ConverterModal';
import { CurrencyExchangeList } from '@/components/CurrencyExchangeList';
import { Modal } from '@/components/Modal';
import { CurrencyInfo } from '@/types';

const Home = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [fromCurrencyInfo, setFromCurrencyInfo] = useState<CurrencyInfo | null>(null);

  const closeModal = () => {
    setIsModalActive(false);
  };

  const onCurrencyCardClick = useCallback((currencyInfo: CurrencyInfo) => {
    setFromCurrencyInfo(currencyInfo);
    setIsModalActive(true);
  }, []);

  return (
    <main>
      <Modal isActive={isModalActive} closeModal={closeModal}>
        {fromCurrencyInfo && <ConverterModal fromCurrencyInfo={fromCurrencyInfo} />}
      </Modal>
      <CurrencyExchangeList onCurrencyCardClick={onCurrencyCardClick} />
    </main>
  );
};
export default Home;
