import CurrencyCard from '@/components/CurrencyCard';
import styles from './styles.module.scss';

const MOCK_DATA = Array(11)
  .fill('')
  .map((_, index) => index);

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.currencyList}>
        {MOCK_DATA.map((item) => (
          <CurrencyCard key={item} />
        ))}
      </div>
    </div>
  );
}
