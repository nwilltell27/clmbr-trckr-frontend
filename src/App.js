import { useState, useEffect } from 'react';
import { 
  fetchClimbs, 
  updateClimb,
  createClimb,
  deleteClimb } from './services/climb-service';
import './App.css';

// Import Components
import Header from './components/Header/Header';
import AddClimb from './components/AddClimb/AddClimb';

export default function App() {
  
  // Setting initial State
  const [ climbState, setClimbState ] = useState({
    climbs: [],
    newClimb: {
      date: '', 
      facility: '',
      difficulty: 'V2',
      color: 'Red',
      completed: 'No'
    }, 
    editMode: false
  });

  useEffect(() => {
    async function getClimbData() {
      const climbs = await fetchClimbs();
      setClimbState(prevState => ({
          ...prevState,
          climbs
        }));
    }
    getClimbData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if(climbState.editMode) {
      try {
        const climbs = await updateClimb(climbState.newClimb);
        setClimbState({
          climbs,
          newClimb: {
            date: '',
            facility: '',
            difficulty: 'V2',
            color: 'Red',
            completed: 'No'
          },
          editMode: false
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const climb = await createClimb(climbState.newClimb);
        setClimbState({
          climbs: [...climbState.climbs, climb],
          newClimb: {
            date: '',
            facility: '',
            difficulty: 'V2',
            color: 'Red',
            completed: 'No'
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChange(e) {
    setClimbState((prevState) => ({
      ...prevState,
      newClimb: {
        ...prevState.newClimb,
        [e.target.name]: e.target.value
      }
    }));
  }

  function handleEdit(id) {
    const climbToEdit = climbState.climbs.find(climb => climb._id === id);
    setClimbState(prevState => ({
      ...prevState,
      newClimb: climbToEdit,
      editMode: true
    }));
  }

  async function handleDelete(id) {
    try {
      const climbs = await deleteClimb(id);
      setClimbState(prevState => ({
        ...prevState,
        climbs,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header />

      <AddClimb 
        date={climbState.newClimb.date}
        facility={climbState.newClimb.facility}
        difficulty={climbState.newClimb.difficulty}
        color={climbState.newClimb.color}
        completed={climbState.newClimb.completed}
        editMode={climbState.editMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <br />

      <section>
        <h2>View your Climb Log below:</h2>
        {climbState.climbs.map(c => (
          <article key={c._id}>
            <div>
              <span>DATE</span>
              <p>{c.date}</p>
            </div>
            <div>
              <span>FACILITY</span>
              <p>{c.facility}</p>
            </div>
            <div className="level-and-color">
              <span>{c.color} : {c.difficulty}</span>
              {/* <p></p> */}
            </div>
            <div>
              <span>COMPLETED</span>
              <p>{c.completed}</p>
            </div>
            <div>
              <button
                className="update-btn"
                onClick={() => handleEdit(c._id)}>
              Update
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  const confirmBox = window.confirm(
                    'Are you sure you want to delete?'
                  ) 
                  if (confirmBox === true) {
                    handleDelete(c._id);
                  }
                }}>
              Delete
              </button>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
