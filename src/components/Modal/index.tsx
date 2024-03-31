import { useEffect, useRef } from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  isActive: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isActive, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isActive && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isActive]);

  return (
    <div
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
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
