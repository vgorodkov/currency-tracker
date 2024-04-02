import { useSelector } from 'react-redux';

import { closeConverter } from '@/redux/slices/converterSlice';
import { RootState, useAppDispatch } from '@/redux/store';

import { Modal } from '../Modal';
import { ConverterButton } from './components/ConverterButton';
import { ConverterList } from './components/ConverterList';
import { ConverterSelection } from './components/ConverterSelection';
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
        <h3 className={styles.modalTitle}>Exchange Rate</h3>
        <ConverterList />
        <ConverterSelection />
        <ConverterButton />
      </div>
    </Modal>
  );
};
