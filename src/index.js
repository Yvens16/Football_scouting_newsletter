import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/Dosis-Regular.ttf';
import './assets/fonts/Dosis-SemiBold.ttf';
import './index.css';
import FirebaseProvider from './utils/external_apis/firebase';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Form from './form/Form';
// import Home from './pages/essaie_novembre/homepage';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
