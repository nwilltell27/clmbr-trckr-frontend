import FacilityList from "../../components/FacilityList/FacilityList";

const MasterFacilityList = (props) => {
    return (
        <div>
            <FacilityList 
                facilities={props.facilities}
                handleFacilityEdit={props.handleFacilityEdit}
                handleFacilityDelete={props.handleFacilityDelete}
            />
        </div>
    );
}

export default MasterFacilityList;