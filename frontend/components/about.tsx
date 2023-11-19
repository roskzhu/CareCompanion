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
    <div className={styles.features}>
      <h1>
        CareCompanion offers ...
      </h1>
      <div className={styles.featuresDesc}>
      <div style={{display:'flex', marginTop: '2.5em'}}>
        <div className={styles.featuresLine} style={{width: '5em'}}></div>
        <h2>
          Intelligent Chatbot Companion
        </h2>
        </div>
        <ul style={{paddingLeft: '9em'}}>
        <li>
          Interact with a state-of-the-art AI chatbot that understands, learns, and adapts to your unique needs.
        </li>
        <li>
          Engage in natural conversations, receive personalized tutoring, and build a lasting bond with your virtual companion.
        </li>
      </ul>
      {/* <div style={{paddingLeft: '6em', marginTop: '2.5em'}}> */}
      
      <div>
        <div style={{display:'flex', marginTop: '2.5em'}}>
          <div className={styles.featuresLine} style={{width: '10em'}}></div>
          <h2>
            Tailored Learning Experiences
          </h2>
        </div>
        <ul style={{paddingLeft: '14em'}}>
        <li>
        Enjoy a personalized learning journey designed just for you.
        </li>
        <li>
        Receive customized study plans, resources, and feedback to enhance your educational experience based on your preferences and progress.
        </li>
      </ul>
      </div>
      {/* <div style={{marginLeft:'14em', marginTop: '2.5em'}}> */}
      <div>
      <div style={{display:'flex', marginTop: '2.5em'}}>
          <div className={styles.featuresLine} style={{width: '15em'}}></div>
          <h2>
          24/7 Support and Companionship
          </h2>
        </div>
        <ul style={{marginLeft:'16em'}}>
        <span style={{fontStyle:'italic'}}>Never feel alone on your learning path. </span> <br/>
        <li>
        CareCompanion is available round the clock to provide support, guidance, and friendly conversations whenever you need them.
        </li>
      </ul>
      </div>
    </div>
    </div>
    <div className={styles.howTo}>
      <div className={styles.howTitle}>
        <h1>?</h1>
        <h3>How do I meet my companion</h3>
      </div>
      <div className={styles.howDesc}>
        <h2>
        Meeting your companion is easy.
        </h2>
        <h4>
        Step 1: Sign Up or Log In <br/>
        Step 2: Set Your Preferences <br/>
        Step 3: Chat with Your Companion <br/>
        Step 4: Personalized Tutoring <br/>
        Step 5: Track Your Progress <br/>
        Step 6: 24/7 Support
        </h4>
        </div>
    </div>
  </div>
)

export default AboutPage
