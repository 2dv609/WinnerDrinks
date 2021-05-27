import React, { useState } from 'react';

const authors = [
  {
    name: 'Caesar',
    github: 'https://github.com/Lennca'
  },
  {
    name: 'Joel',
    github: 'https://github.com/Martelleur'
  },
  {
    name: 'Delfi',
    github: 'https://github.com/delsehi'
  },
  {
    name: 'Susanna',
    github: 'https://github.com/SusannaP2018'
  },
  {
    name: 'Lucas',
    github: 'https://github.com/lucasj96'
  },
]

function About() {
  const [isActive, setActive] = useState('')
  return (
    <div>
      <div className="button" onClick={() => setActive(' is-active')}>About</div>
      <div className={'modal' + isActive} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">About</p>
            <button className="delete" onClick={() => setActive('')} aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p>
              <strong>Winner Drinks</strong>
              {' '}
              by
              {authors.map((author, index) => {
                const end = index === authors.length - 1 ? '. ' : ', '
                return (
                  <a target="_blank" href={author.github} rel="noreferrer" key={index}>
                    {' '}
                    {author.name}
                    {end}
                  </a>
                )
              })}
            </p>
            <p>This web app was built as a student project in the course 2DV609 at Linneaus University in 2021.</p>
            <p>
              It was built using React, TypeScript, MongoDB, Node.js, Bulma, Docker and Ansible,
              and deployed in the OpenStack cloud environment.
            </p>
            <p>
              You can find the source code and related documents in our
              <a target="_blank" rel="noreferrer" href="https://github.com/2dv609/WinnerDrinks">Github repository.</a>
            </p>

          </section>
        </div>
      </div>
    </div>

  );
}

export default About;
