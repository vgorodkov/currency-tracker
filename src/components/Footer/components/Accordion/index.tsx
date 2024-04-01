import styles from './styles.module.scss';

interface AccordionProps {
  links: string[];
  isAccordionActive: boolean;
}

export const Accordion = ({ links, isAccordionActive }: AccordionProps) => {
  return (
    <div className={isAccordionActive ? `${styles.accordion} ${styles.active}` : styles.accordion}>
      {links.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};
