import Footer from '../../../../components/Footer/Footer';
import Header from '../../../../components/Header/Header';

import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Footer />
    </div>
  );
};

export default Dashboard;
