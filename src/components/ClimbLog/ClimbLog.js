import './ClimbLog.css';

function ClimbLog(props) {
    return (
        <section>
            {props.climbs.map(c => (
                <article key={c._id}>
                    <div>
                        <span>DATE</span>
                        <p>{c.date}</p>
                    </div>
                    <div>
                        <span>FACILITY</span>
                        <p>{c.facility}</p>
                    </div>
                    <div className='diff-and-color'>
                        <span>{c.color} : {c.difficulty}</span>
                    </div>
                    <div>
                        <span>COMPLETED</span>
                        <p>{c.completed}</p>
                    </div>
                    <div>
                        <button 
                            className='update-climb btn' 
                            onClick={() => props.handleEdit(c._id)}>
                            Edit
                        </button>
                        <button
                            className='delete-climb btn'
                            onClick={() => {
                                const confirmBox = window.confirm('Are you sure you want to delete?');
                                if (confirmBox === true) {
                                    props.handleDelete(c._id);
                                }
                            }}>
                            Delete
                        </button>
                    </div>
                </article>
            ))}
        </section>

    );
}

export default ClimbLog;