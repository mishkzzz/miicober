import Logo from '../components/Logo';

const EMAIL = 'bymishka.x@gmail.com';

type FooterProps = {
  onOpenIntake: () => void;
};

export default function Footer({ onOpenIntake }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-mark">
              <Logo size={28} />
              <span className="brand-text">MiiCober</span>
            </div>
            <p className="footer-tagline">
              Systems intelligence studio. We design the brand, growth, and operational
              architecture behind companies that compound.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <span className="footer-col-title">Systems</span>
              <a className="footer-link" href="#systems">Brand Audit</a>
              <a className="footer-link" href="#systems">Growth Architecture</a>
              <a className="footer-link" href="#systems">Workflow Design</a>
              <a className="footer-link" href="#systems">Infrastructure Mapping</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Studio</span>
              <a className="footer-link" href="#pipeline">Pipeline</a>
              <a className="footer-link" href="#trust">Trust signals</a>
              <a className="footer-link" href="#activate">Activate</a>
              <button
                className="footer-link"
                onClick={onOpenIntake}
                style={{ textAlign: 'left', padding: 0 }}
              >
                Request access
              </button>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Direct</span>
              <a className="footer-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a className="footer-link" href="#contact">WhatsApp</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MiiCober. Systems, not portfolios.</span>
          <span>Quiet intelligence · Built for execution</span>
        </div>
      </div>
    </footer>
  );
}
