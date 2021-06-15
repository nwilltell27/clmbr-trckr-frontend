import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className='header'>
            <Link 
                className='home-link'
                to="/">
                    <h1>{'🧗'} CLMBR TRCKR</h1>
            </Link>
            <nav className='main-nav'>
                <Link
                    className='nav-link'
                    to='/facility-list'>
                        Facilities
                </Link>
                <Link
                    className='nav-link'
                    to='/climb-log'>
                        View Log
                </Link>
            </nav>
        </header>
    );
}

export default Header;