import styles from './styles.module.scss';
import { ConverterCurrencyItemProps } from './types';

export const ConverterCurrencyItem = ({ iconPath, name }: ConverterCurrencyItemProps) => {
  return (
    <div className={styles.converterCurrencyItem}>
      {iconPath && (
        <img title={name} className={styles.converterCurrencyIcon} src={iconPath} alt={name} />
      )}
      <p className={styles.converterCurrencyName}>{name}</p>
    </div>
  );
};
