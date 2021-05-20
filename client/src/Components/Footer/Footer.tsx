import React from 'react';

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

function Footer() {
  return (
    <footer className="footer" style={{position: 'absolute', left: '0', bottom: '0', padding: '1.5rem 1.5rem 3rem', width:'100%'}}>
      <div className="content has-text-centered">
        <p>
          <strong>Winner Drinks</strong> by
          {authors.map((author, index) => {
            const end = index === authors.length - 1 ? '. ' : ', '
            return <a target="_blank" href={author.github} rel="noreferrer"> {author.name}{end}</a>
          })}
        </p>
        <p>
          Source code can be found at the open 
          <a target="_blank" rel="noreferrer" href="https://github.com/2dv609/WinnerDrinks"> Github repo</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;