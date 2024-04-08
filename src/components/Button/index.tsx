import { useState } from 'react';

import { Tooltip } from '@/components/Tooltip';

import styles from './styles.module.scss';

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipText?: string;
}

export const Button = ({ title, onClick, disabled = false, tooltipText }: ButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    if (disabled) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={styles.buttonWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button disabled={disabled} type="button" onClick={onClick} className={styles.button}>
        {title}
      </button>
      {isTooltipVisible && tooltipText && <Tooltip content={tooltipText} />}
    </div>
  );
};
