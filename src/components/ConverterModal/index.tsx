import { useSelector } from 'react-redux';

import { Modal } from '@/components/UI/Modal';
import { useAppDispatch } from '@/store/hooks';
import { closeConverter } from '@/store/slices/converterSlice';
import { isOpenSelector } from '@/store/slices/converterSlice/converterSelectors';

import { ConverterCurrencies } from './components/ConverterCurrencies';
import { ConverterFooter } from './components/ConverterFooter';
import styles from './styles.module.scss';

export const ConverterModal = () => {
  const dispatch = useAppDispatch();

  const isConverterOpen = useSelector(isOpenSelector);

  const closeModal = () => {
    dispatch(closeConverter());
  };

  if (!isConverterOpen) {
    return null;
  }

  return (
    <Modal isActive={isConverterOpen} closeModal={closeModal}>
      <div className={styles.converterModal}>
        <h3 className={styles.modalTitle}>Exchange Rates</h3>
        <ConverterCurrencies />
        <ConverterFooter />
      </div>
    </Modal>
  );
};
