import './FacilityList.css';

import { Link } from 'react-router-dom';

function FacilityList(props) {
    return (
        <>
            <section className='FacilityList'>
                {props.facilities.map(f => (
                    <article className='FacilityList-cards' key={f._id}>
                        <div>
                            <span style={{fontWeight: 'bold'}}>{f.name}</span>
                            <br />
                            <br />
                            <span style={{fontWeight: 'bold'}}>{f.climbs.length} </span> 
                            Climbs Logged
                            <br />
                            <br />
                            <button 
                                className='update-facility btn'
                                onClick={() => props.handleFacilityEdit(f._id)}>
                                Edit
                            </button>
                            <button 
                                className='delete-facility btn'
                                onClick={() => {
                                    const confirmBox = window.confirm(`Are you sure you want to delete ${f.name}?`);
                                    if (confirmBox === true) {
                                        props.handleFacilityDelete(f._id);
                                    }
                                }}>
                                Delete
                            </button>
                            <button
                                className='facility-climb-log btn'>
                                <Link
                                    className='my-climbs-link'
                                    to={`/${f.name}-climb-log`}>
                                    Climb Log 
                                </Link>
                            </button>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
}

export default FacilityList;