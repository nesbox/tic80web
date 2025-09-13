import { Link } from 'react-router-dom';

const Footer = () => {
  return (
  <footer className="footer">

    <div className="container">

      <hr/  >

      <div className="pull-right">
        <a title="Github" rel="tooltip" href="https://github.com/nesbox/TIC-80">Github</a> <span className="text-muted">| </span>
        <a title="Forum" rel="tooltip" href="https://github.com/nesbox/TIC-80/discussions">Forum</a> <span className="text-muted">| </span>
        <a title="Telegram chat" rel="tooltip" href="https://t.me/tic80">Telegram</a> <span className="text-muted">| </span>
        <a title="Discord chat" rel="tooltip" href="https://discord.gg/HwZDw7n4dN">Discord</a> <span className="text-muted">| </span>
        <a title="@nesboxcom" rel="tooltip" href="https://twitter.com/tic_computer">Twitter</a> <span className="text-muted"></span>
      </div>
      
      <div className="pull-left">(C) 2025 Nesbox&nbsp;<Link to="/terms">Terms</Link></div>
    </div>
    
  </footer>
  );
};

export default Footer;
