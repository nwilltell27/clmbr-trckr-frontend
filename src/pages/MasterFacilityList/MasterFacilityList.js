import AddFacility from '../../components/AddFacility/AddFacility';
import FacilityList from '../../components/FacilityList/FacilityList';

const MasterFacilityList = (props) => {
    return (
        <div>
            <h1>My Facilities</h1>
            <AddFacility 
                name={props.name}
                climbs={props.climbs}
                editMode={props.editMode}
                newFacility={props.newFacility}
                handleFacilityChange={props.handleFacilityChange}
                handleFacilitySubmit={props.handleFacilitySubmit}
            />
            <br />
            <FacilityList 
                facilities={props.facilities}
                handleFacilityEdit={props.handleFacilityEdit}
                handleFacilityDelete={props.handleFacilityDelete}
            />
        </div>
    );
}

export default MasterFacilityList;