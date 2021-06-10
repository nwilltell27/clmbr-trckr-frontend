import './Footer.css';

function Footer(props) {
    return (
        <footer className="footer">
            All Rights Reserved &copy; CLMBR TRCKR {(new Date().getFullYear())} | Created by Nathan Tellers
        </footer>
    );
}

export default Footer;