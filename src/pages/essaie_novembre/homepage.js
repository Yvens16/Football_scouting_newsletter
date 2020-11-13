import React from 'react';
import Form from '../../form/Form';

require('./homepage.scss');

const content = [
  {
    title: 'Pas besoin de chercher',
    text: 'Tu recevras chaque mois les dates et adresses des détections.',
  },
  {
    title: 'Des conseils pour réussir',
    text: 'Tu recevras les conseils des coachs organisateurs des détections pour avoir toutes les chances de ton côté.',
  },
  {
    title: 'Tous âges',
    text: 'Les sessions de recrutement proposées sont ouvertes aux joueurs de 10 à 24 ans.',
  },
  {
    title: 'Des clubs de haut niveau',
    text: 'Que ton but soit de devenir pro ou de jouer au plus haut niveau, nous proposons tous types de détections (R3, national, centre de formations etc ...)',
  },
];

export default function home() {
  return (
    <div className="home">
      <div className="home__content">
        <div className="home__content__hero">
          <div className="home__content__hero-title">
            <h1>Reçois tes détections par sms, chaque mois.</h1>
            <h2>
              Tu ne sais pas comment trouver des détections ?
              Inscrit toi simplement et reçois toutes les détections
              par sms chaque mois.
            </h2>
          </div>
          <div className="home__content__hero_form">
            <Form />
          </div>
        </div>
        <div className="home__content__benefits">
          <div className="home__content__benefits_content">
            {content.map((c) => (
              <div className="inner-content" key={c.title}>
                <h2>{c.title}</h2>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
        <footer>© 2020 Insert Name Here. All rights reserved</footer>
      </div>
    </div>
  );
}
