import './AddClimb.css';

function AddClimb(props) {
    return (
        <>
            <section className="add-climb">
                <h2>{props.editMode
                            ? 'Update Climb'
                            : 'Add Climb'}</h2>
                <form className="form-align" onSubmit={props.handleSubmit}>
                    <label>
                        Date:
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={props.date}
                        onChange={props.handleChange}/>
                    <label>
                        Facility:
                    </label>
                    <input name="facility" value={props.facility} onChange={props.handleChange}/>
                    <label>
                        Difficulty:
                    </label>
                    <select
                        name="difficulty"
                        value={props.difficulty}
                        onChange={props.handleChange}>
                        <option value="V0">V0</option>
                        <option value="V1">V1</option>
                        <option value="V2">V2</option>
                        <option value="V3">V3</option>
                        <option value="V4">V4</option>
                        <option value="V5">V5</option>
                        <option value="V6">V6</option>
                        <option value="V7">V7</option>
                        <option value="V8">V8</option>
                        <option value="V9">V9</option>
                        <option value="V10">V10</option>
                        <option value="V11">V11</option>
                        <option value="V12">V12</option>
                    </select>
                    <label>
                        Route Color:
                    </label>
                    <select name="color" value={props.color} onChange={props.handleChange}>
                        <option value="Red">Red</option>
                        <option value="Orange">Orange</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="Purple">Purple</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                    </select>
                    <label>
                        Completed:
                    </label>
                    {/* <input
                        type="checkbox"
                        name="completed"
                        defaultChecked={climbState.newClimb.completed}
                        onChange={handleChange}
                    /> */}
                    <select name="completed" value={props.completed} onChange={props.handleChange}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    <button>{props.editMode
                            ? 'Update'
                            : 'Submit'}
                    </button>
                    <button value={props.newClimb}>
                        Cancel
                    </button>
                </form>
            </section>
        </>
    );
}

export default AddClimb;