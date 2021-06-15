import './FacilityList.css';

function FacilityList(props) {
    return (
        <>
            <h2>Facilities</h2>
            <section>
                {props.facilities.map(f => (
                    <article key={f._id}>
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
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
}

export default FacilityList;