import './Footer.css';

function Footer(props) {
    return (
        <footer className="footer">
            All Rights Reserved &copy; CLMBR TRCKR {(new Date().getFullYear())}
        </footer>
    );
}

export default Footer;