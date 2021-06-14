import './AddFacility.css';

function AddFacility(props) {
    return (
        <>
            <section>
                <h2>Add Facility</h2>
                <form onSubmit={props.handleFacilitySubmit}>
                    <label>
                        Name: 
                    </label>
                    <input 
                        name="name" 
                        value={props.name} 
                        onChange={props.handleFacilityChange}    
                    />
                    <button>Submit</button>
                </form>
            </section>
        </>
    );
}

export default AddFacility;