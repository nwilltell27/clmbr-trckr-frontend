import ClimbLog from "../../components/ClimbLog/ClimbLog";

const MasterLog = (props) => {
    return (
        <div>
            <ClimbLog
                climbs={props.climbs}
                handleEdit={props.handleEdit}
                handleDelete={props.handleDelete}
            />
        </div>
    );
}

export default MasterLog;