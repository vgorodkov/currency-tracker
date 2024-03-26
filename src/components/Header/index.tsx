import styles from './styles.module.scss';

const ROUTES = [
  { path: '/home', name: 'Home' },
  { path: '/timeline', name: 'Timeline' },
  { path: '/bankcard', name: 'Bank card' },
  { path: '/contacts', name: 'Contacts' },
];

export function Header() {
  return (
    <nav className={styles.topnav}>
      {ROUTES.map((item) => (
        <a key={item.name} className={styles.navElement} href={item.path}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
