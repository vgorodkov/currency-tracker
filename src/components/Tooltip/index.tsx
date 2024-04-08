import styles from './styles.module.scss';

export const Tooltip = ({ content }: { content: string }) => {
  return <div className={styles.tooltip}>{content}</div>;
};
