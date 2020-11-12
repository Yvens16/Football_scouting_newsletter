/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from 'react';
import MailSVG from '../assets/email_sent.svg';
import { FirebaseContext } from '../utils/firebase';
import { createAirtableContact } from '../utils/airtable';

require('./form.scss');

export default function Form() {
  const firebase = useContext(FirebaseContext);
  const [background, setBackground] = useState('white');
  const [pageIndex, setpageIndex] = useState(0);
  const [formState, setFormState] = useState({
    name: '',
    tel: '',
    email: '',
    selectedOption: '',
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const goToNextPage = (e) => {
    const { name, tel, email } = formState;
    e.preventDefault();
    setpageIndex(pageIndex + 1);
    const createAndAddContactToList = firebase.functions().httpsCallable('createAndAddContactToList');
    createAndAddContactToList({ contactName: name, contactMobile: tel, contactEmail: email })
      .then(() => {}, (error) => console.log(error));
  };

  useEffect(() => {
    const {
      name, tel, email, selectedOption,
    } = formState;
    if (pageIndex % 2 !== 0) {
      setBackground('black');
    } else if (pageIndex === 2) {
      createAirtableContact({
        name, tel, email, selectedOption,
      });
      setBackground('white');
    } else {
      setBackground('white');
    }
  }, [formState, pageIndex]);

  const FirstPage = () => (
    <>
      <div className="register_form_title">
        <h3>Jusqu'ou sera tu prêt à aller pour réaliser ton rêve ?</h3>
      </div>
      <div className="register_form_sub"><h4>Je veux recevoir les détections :</h4></div>
      <form className="register_form_inputs" onSubmit={(e) => goToNextPage(e)}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Prénom"
          onChange={handleChange}
          value={formState.name}
        />
        <input
          type="tel"
          name="tel"
          id="tel"
          placeholder="Numéro de téléphone"
          onChange={handleChange}
          value={formState.tel}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={formState.email}
        />
        <button type="submit" value="Submit">Inscris-toi</button>
      </form>
    </>
  );

  const SecondPage = () => (
    <>
      <div className="register_form_title">
        <h3>Jusqu&rsquo;ou sera tu prêt à aller pour réaliser ton rêve ?</h3>
      </div>
      <div className="register_form_sub"><h4>Je veux :</h4></div>
      <form className="register_form_inputs" onSubmit={(e) => goToNextPage(e)}>
        <label htmlFor="advice">
          <input type="radio" name="selectedOption" id="advice" onChange={handleChange} checked={formState.selectedOption === 'freeAdvice'} value="freeAdvice" data-testid="radio" />
          Recevoir des conseils pour les détections (Gratuit)
        </label>
        <label htmlFor="region">
          <input type="radio" name="selectedOption" id="region" onChange={handleChange} checked={formState.selectedOption === 'detectionRegion'} value="detectionRegion" data-testid="detectionRegion" />
          Les détections l'île de France 7€/mois
        </label>
        <label htmlFor="country">
          <input type="radio" name="selectedOption" id="country" onChange={handleChange} checked={formState.selectedOption === 'detectionRegionAndFrance'} value="detectionRegionAndFrance" />
          Les détections de la France entière 9€/mois
        </label>
        <label htmlFor="abroad">
          <input type="radio" name="selectedOption" id="abroad" onChange={handleChange} checked={formState.selectedOption === 'detectionFranceAndAway'} value="detectionFranceAndAway" />
          Les détections en France et à l'étranger 15€/mois
        </label>
        <button type="submit" value="Submit">Inscris-toi</button>
      </form>
    </>
  );

  const ThirdPage = () => (
    <div className="register_form_validated" data-testid="validated">
      <div onSubmit={(e) => goToNextPage(e)}>
        Merci d'avoir rejoint la bêta, nous te comptons parmi nos premiers testeurs !
        Tu sera bientôt contacter par notre équipe pour discutter de ton cas ! Merci&nbsp;
        {formState.name} 😉
      </div>
      <img src={MailSVG} alt="mail sent svg" className="register_form_mailsvg" />
    </div>
  );

  const renderPage = () => {
    if (pageIndex === 0) return FirstPage();
    if (pageIndex === 1) return SecondPage();
    return ThirdPage();
  };
  return (
    <>
      <div className={`register_form ${background || ''}`}>
        {renderPage() }
      </div>
    </>
  );
}
