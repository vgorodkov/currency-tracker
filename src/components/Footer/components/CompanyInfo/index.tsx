import logo from '@/assets/icons/logo.svg?url';

import styles from './styles.module.scss';

const companyInfoStrings = {
  appName: 'Modsen Currency Tracker',
  appDescription:
    "Since then, the company has grown organically to. Starsup is the world's largest tradingplatform, with $12 billion worth of currency trading and 500,000 tickets sold daily to tens of thousands of traders worldwide.",
};

export const CompanyInfo = () => {
  return (
    <div className={styles.companyInfo}>
      <div className={styles.companyTitle}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h3>{companyInfoStrings.appName}</h3>
      </div>
      <p>{companyInfoStrings.appDescription}</p>
    </div>
  );
};
