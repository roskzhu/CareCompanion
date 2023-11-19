// import Link from 'next/link'
import Layout from '../components/Layout'
import AboutPage from './about'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <div className='gradient-circle' style={{right:'10em', top:'10em'}}/>
    <div className='gradient-circle' 
      style={{right:'11em', top:'18em', width:'15em', height:'15em', 
        background: 'radial-gradient(circle, #82b8ff, #ffe74b)', opacity:'0.6'}}/>
    <div className='gradient-circle' 
      style={{right:'20em', top:'22em', width:'11em', height:'11em',
        background: 'radial-gradient(circle, #00ff1e, #0033ff)'}}/>

    <div className='title'>
      <h1>
        Elevate your learning <br/>
        with a {" "}
        <span style={{color:'black'}}>personalized <br/>
        tutor </span>
        and <br/>
        <span>
          companion</span>
      </h1>
      
      <h2>
        <span style={{fontWeight:'700'}}>
          Chat, Learn, Grow: 
        </span> {" "}
        Explore a New World of Tutoring and Companionship with CareCompanion.
      </h2>
    <a href="/about">
        Get Started        
      </a>
    </div>
    <AboutPage></AboutPage>
  </Layout>
)

export default IndexPage


