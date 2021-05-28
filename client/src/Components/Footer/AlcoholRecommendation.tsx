/**
 * A button the user can click to get recomendations on sound alcoholic consumption.
 * @author Joel Martelleur
 */
import React, { useState } from 'react';

function AlcoholRecommendation() {
  const [isActive, setActive] = useState('')
  return (
    <div className="column">
      <div className="button is-fullwidth" onClick={() => setActive(' is-active')}>Alcohol Recommendations</div>
      <div className={`modal${isActive}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Alcohol Recommendations</p>
            <button className="delete" onClick={() => setActive('')} aria-label="close" />
          </header>
          <section className="modal-card-body">
            <p>
              Drink responsibly!
            </p>
            <p>
              Never drink and drive!
            </p>
            <p>
              Never drink if you are under age!
            </p>
            <p>
              Never drink if are you pregnant!
            </p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => setActive('')}>Got it!</button>

          </footer>
        </div>
      </div>
    </div>

  );
}

export default AlcoholRecommendation;
