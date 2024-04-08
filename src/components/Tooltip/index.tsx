import { useState } from 'react';

import styles from './styles.module.scss';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  shouldShow: boolean;
}

export const Tooltip = ({ content, children, shouldShow }: TooltipProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && shouldShow && <div className={styles.tooltip}>{content}</div>}
    </div>
  );
};
