import Link from 'next/link'
// import Layout from '../components/Layout'
import styles from '../styles/about.module.css';

const AboutPage = () => (
  <div className={styles.about}>
    <div className={styles.aboutDesc}>
      <h1>About</h1>
      <h2>Welcome to CareCompanion, where learning meets friendship. 
        Our AI chatbot serves as your personal tutor and buddy, providing support whenever you need it.
      </h2>
    </div>
    {/* <p>
      <Link href="/">Go home</Link>
    </p> */}
  </div>
)

export default AboutPage
