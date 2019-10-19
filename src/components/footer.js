import React from 'react';

import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-contact">
                <div className="footer-elect">
                    <div className="footer-elect-pad">
                        <div className="elect"><b>ELECT</b></div>
                        <div className="vote">In VOTE We TRUST</div>
                    </div>
                </div>
                <div className="footer-contact-info">
                    <div className="footer-info">Contact Us</div>
                    <div className="footer-email"><a href="/">Email: contact@elect.in.th</a></div>
                    <div className="footer-networks"><a href="/">Facebook</a> <a href="/">Twitter</a></div>
                </div>
            </div>

            <div className="footer-partnership">
                <div className="partnership">Partnership</div>
                <img src="src/images/logo-bml.png" alt="partnership" />
            </div>
        </footer>
    )
}

export default Footer;