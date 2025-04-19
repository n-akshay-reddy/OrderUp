import * as styles from './ProfileCard.module.css';

const User = () => {
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>Akshay Nanobolu</h2>
              <p className={styles.cardText}>
                I'm a passionate learner and coder, exploring new technologies and
                building projects to solve real-world problems.
              </p>
              
            </div>
          </div>
        </div>
      );
};

export default User;
