import './MasterLog.css';

import AddClimb from '../../components/AddClimb/AddClimb';
import ClimbLog from '../../components/ClimbLog/ClimbLog';

import { Link } from 'react-router-dom';

const MasterLog = (props) => {
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
            <br />
            <div>
                <button className='link-align'>
                    <Link
                        className='add-climb-nav-links'
                        to='/'>
                            Home
                    </Link>
                </button>
            </div>

            <br />

            <ClimbLog
                climbs={props.climbs}
                handleEdit={props.handleEdit}
                handleDelete={props.handleDelete}
            />

        </div>
    );
}

export default MasterLog;