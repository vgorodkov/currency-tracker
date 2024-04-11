export interface ModalProps {
  isActive: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}
