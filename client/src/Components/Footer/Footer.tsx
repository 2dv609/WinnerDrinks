
import About from './About'
import Instructions from './Instructions'

function Footer() {
  return (
    <footer className="footer" >
      <div className="content has-text-centered">
        <About />
        <Instructions />

      </div>
    </footer>
  );
}

export default Footer;