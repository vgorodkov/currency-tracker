import styles from './styles.module.scss';

interface ConverterCurrencyItemProps {
  iconPath: string;
  name: string;
}

export const ConverterCurrencyItem = ({ iconPath, name }: ConverterCurrencyItemProps) => {
  return (
    <div className={styles.converterCurrencyItem}>
      {iconPath && <img className={styles.converterCurrencyIcon} src={iconPath} alt={name} />}
      <p className={styles.converterCurrencyName}>{name}</p>
    </div>
  );
};
