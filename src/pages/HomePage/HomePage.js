import './HomePage.css';

import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <div className="HomePage">
            <Link
                className="link"
                to="/add-climbs">
                    Add Climbs Here
            </Link>
            <Link
                className="link"
                to='climb-log'>
                    View Climb Log
            </Link>
        </div>
    );
}

export default HomePage;