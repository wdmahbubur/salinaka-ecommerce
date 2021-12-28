
import logo from '../../images/logo-full.png';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Developed by
            {' '}
            <a href="https://github.com/wdmahbubur/">Mahbubur Rahman</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src={logo} />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
            Fork this project &nbsp;
            <a href="#">HERE</a>
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
