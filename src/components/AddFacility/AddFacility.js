import './AddFacility.css';

function AddFacility(props) {
    return ( 
        <> 
            <section className='add-facility'>
                <h2>Add Facility</h2>
                <form 
                    className='form-align'
                    onSubmit={props.handleFacilitySubmit}>
                <label>
                    Name:
                </label>
                <input
                    name='name'
                    value={props.name}
                    onChange={props.handleFacilityChange}/>
                <button>{props.editMode
                    ? 'Update'
                    : 'Submit'}
                </button>
                <button value={props.newFacility}>
                        Cancel
                </button>
                </form>
            </section> 
        </>
    );
}

export default AddFacility;