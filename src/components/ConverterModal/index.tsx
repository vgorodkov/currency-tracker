import { useSelector } from 'react-redux';

import { Modal } from '@/components/Modal';
import { closeConverter } from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import { ConverterFooter } from './components/ConverterFooter';
import { ConverterList } from './components/ConverterList';
import styles from './styles.module.scss';

export const ConverterModal = () => {
  const dispatch = useAppDispatch();
  const isConverterOpen = useSelector((state: RootState) => state.converter.isConverterOpen);

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
        <ConverterList />
        <ConverterFooter />
      </div>
    </Modal>
  );
};
