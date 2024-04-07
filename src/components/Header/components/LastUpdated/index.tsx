import statusSvg from '@/assets/icons/circle.svg?url';

import styles from './styles.module.scss';

export const LastUpdated = () => {
  return (
    <div className={styles.lastUpdatedContainer}>
      <img src={statusSvg} className={styles.statusSvg} alt="lastupdated" />
      <p className={styles.lastUpdated}>Last updated at 11:59pm</p>
    </div>
  );
};
