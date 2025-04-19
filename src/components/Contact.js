import styles from './Contact.module.css';

const ContactCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact Me</h1>
        <div>
          <div className={styles.row}>
            <div className={styles.col}>
              <i className={`bi bi-instagram ${styles.icon} ${styles['text-danger']}`}></i>
              <a href="https://www.instagram.com/n_akshay_reddy/" className={styles.link}>Instagram</a>
            </div>
            <div className={styles.col}>
              <i className={`bi bi-github ${styles.icon} ${styles['text-dark']}`}></i>
              <a href="https://github.com/n-akshay-reddy" className={styles.link}>GitHub</a>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <i className={`bi bi-linkedin ${styles.icon} ${styles['text-primary']}`}></i>
              <a href="https://www.linkedin.com/in/n-akshay-kumar-reddy/" className={styles.link}>LinkedIn</a>
            </div>
            <div className={styles.col}>
              <i className={`bi bi-envelope ${styles.icon} ${styles['text-warning']}`}></i>
              <a href="mailto:akshaynanobolu@gmail.com" className={styles.link}>Email Me</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
