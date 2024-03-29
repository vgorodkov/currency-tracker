import styles from './styles.module.scss';
import Euro from '@/assets/icons/euro.svg';

export function CurrencyCard() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconContainer}>
        <Euro className={styles.icon} />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.currencyName}>Euro</p>
        <p className={styles.currencyValue}>R$ 5,43</p>
      </div>
    </div>
  );
}

export default CurrencyCard;
