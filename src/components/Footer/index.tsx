import { CompanyInfo } from './components/CompanyInfo';
import { HorizontalNav } from './components/HorizontalNav';
import styles from './styles.module.scss';

export const Footer = () => {
  return (
    <footer>
      <section className={styles.mainFooterContent}>
        <CompanyInfo />
        <HorizontalNav />
      </section>
      <p className={styles.copyrightText}>Startsup © 2023-2024, All Rights Reserved</p>
    </footer>
  );
};
