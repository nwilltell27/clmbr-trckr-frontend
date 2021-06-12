import './ClimbLogger.css';
import { Link } from 'react-router-dom';

import AddClimb from '../../components/AddClimb/AddClimb';

const ClimbLogger = (props) => {
    return (
        <div>
            <AddClimb 
                date={props.date}
                facility={props.facility}
                difficulty={props.difficulty}
                color={props.color}
                completed={props.completed}
                editMode={props.editMode}
                newClimb={props.newClimb}
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
            />
            <button>
                <Link
                    className='view-log'
                    to='climb-log'>
                        View Climb Log
                </Link>
            </button>
        </div>
    );
}

export default ClimbLogger;