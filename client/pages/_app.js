// pages/_app.js
import '../styles/globals.css'; // Adjust the path based on your project structure

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
