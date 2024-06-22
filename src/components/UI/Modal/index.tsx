import { MouseEvent, useEffect, useRef } from 'react';

import styles from './styles.module.scss';
import { ModalProps } from './types';

export const Modal = ({ isActive, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const onModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isActive && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isActive]);

  return (
    <div
      data-test="modalBackdrop"
      ref={modalRef}
      className={isActive ? `${styles.modalContainer} ${styles.active}` : styles.modalContainer}
      onClick={closeModal}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        role="none"
        className={
          isActive ? `${styles.modalContent} ${styles.activeContent}` : styles.modalContent
        }
        onClick={onModalClick}
      >
        {children}
      </div>
    </div>
  );
};
