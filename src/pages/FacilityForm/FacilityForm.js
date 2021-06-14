import AddFacility from "../../components/AddFacility/AddFacility";

const FacilityForm = (props) => {
    return (
        <div>
            <AddFacility 
                name={props.name}
                climbs={props.climbs}
                editMode={props.editMode}
                newFacility={props.newFacility}
                handleFacilityChange={props.handleFacilityChange}
                handleFacilitySubmit={props.handleFacilitySubmit}
            />
        </div>
    );
}

export default FacilityForm;