import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import styles from './styles.module.scss';

const Contacts = () => {
  return (
    <div className={styles.contactsContainer}>
      <h1>We’ve been waiting for you.</h1>
      <h4>Let us know how we can help</h4>
      <form className={styles.formContainer}>
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" />
        <Button title="Get in touch" onClick={() => {}} />
      </form>
    </div>
  );
};

export default Contacts;
