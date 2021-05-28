import React from 'react'
import About from './About'
import AlcoholRecommendation from './AlcoholRecommendation'
import Instructions from './Instructions'

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <div className="columns">
          <About />
          <Instructions />
          <AlcoholRecommendation />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
