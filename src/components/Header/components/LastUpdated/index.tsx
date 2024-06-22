import statusSvg from '@/assets/icons/circle.svg?url';

import styles from './styles.module.scss';

export const LastUpdated = () => {
  return (
    <article className={styles.lastUpdatedContainer}>
      <img title="last updated at" src={statusSvg} className={styles.statusSvg} alt="status" />
      <p className={styles.lastUpdated}>Last updated at 11:59pm</p>
    </article>
  );
};
