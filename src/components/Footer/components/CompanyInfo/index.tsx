import logo from '@/assets/icons/logo.svg?url';

import { companyInfoStrings } from './constants';
import styles from './styles.module.scss';

export const CompanyInfo = () => {
  return (
    <div className={styles.companyInfo}>
      <div className={styles.companyTitle}>
        <img title="company logo" src={logo} className={styles.logo} alt="logo" />
        <h3>{companyInfoStrings.appName}</h3>
      </div>
      <p>{companyInfoStrings.appDescription}</p>
    </div>
  );
};
