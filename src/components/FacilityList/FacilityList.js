import './FacilityList.css';

function FacilityList(props) {
    return (
        <div>
            <section>
                <h2>Facilities</h2>
                {props.facilities.map(f => (
                    <article key={f._id}>
                        <div>{f.name}</div>
                        <div>{f.climbs}</div>
                        <button onClick={() => props.handleFacilityEdit(f._id)}>Edit</button>
                        <button onClick={() => props.handleFacilityDelete(f._id)}>Delete</button>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default FacilityList;