import './HomePage.css';

import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <>
            <h1>Welcome, Climber!</h1>
                <div className='HomePage'>
                    <Link
                        className='link'
                        to='/facility-list'>
                            My Facilities
                    </Link>
                    <Link
                        className='link'
                        to='/climb-log'>
                            View Climb Log
                    </Link>
                </div>
        </>
    );
}

export default HomePage;