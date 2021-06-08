import { useState, useEffect } from 'react';
import './App.css';

// Import Components
import Header from './components/Header/Header';

export default function App() {
  
  // Setting initial State
  const [ climbState, setClimbState ] = useState({
    climbs: [],
    newClimb: {
      date: '', 
      facility: '',
      difficulty: 'V2',
      completed: 'No'
    }, 
    editMode: false
  });

  useEffect(() => {
    async function getClimbData() {
      const climbs = await fetch('http://localhost:3001/api/climbs')
      .then(res => res.json());
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
      const {_id, date, facility, difficulty, completed } = climbState.newClimb;
      try {
        const climbs = await fetch(`http://localhost:3001/api/climbs/${_id}`, {
          method: 'PUT', 
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(climbState.newClimb)
        })
        .then(res => res.json());
        setClimbState({
          climbs,
          newClimb: {
            date: '',
            facility: '',
            difficulty: 'V2',
            completed: 'No'
          },
          editMode: false
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const climb = await fetch('http://localhost:3001/api/climbs', {
          method: 'POST', 
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(climbState.newClimb)
        })
        .then(res => res.json());
        setClimbState({
          climbs: [...climbState.climbs, climb],
          newClimb: {
            date: '',
            facility: '',
            difficulty: 'V2',
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
      const climbs = await fetch(`http://localhost:3001/api/climbs/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
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

      <section className="add-climb">
        <h2>Log a Climb!</h2>
        <form className="form-align" onSubmit={handleSubmit}>
          <label>
            <span>Date: </span>
            <input type="date" name="date" value={climbState.newClimb.date} onChange={handleChange} />
          </label>
          <label>
            <span>Facility: </span>
            <input name="facility" value={climbState.newClimb.facility} onChange={handleChange} />
          </label>
          <label>
            <span>Difficulty: </span>
            <select name="difficulty" value={climbState.newClimb.difficulty} onChange={handleChange}>
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
          </label>
          <label>
            <span>Completed: </span>
            {/* <input 
              type="checkbox" 
              name="completed" 
              defaultChecked={climbState.newClimb.completed} 
              onChange={handleChange} 
            /> */}
            <select name="completed" value={climbState.newClimb.completed} onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </label>
          <button>{climbState.editMode ? 'Edit Climb' : 'Log Climb'}</button>
        </form>
      </section>

      <section>
        <h2>Here are all your Climbs!</h2>
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
            <div>
              <span>DIFFICULTY</span>
              <p>{c.difficulty}</p>
            </div>
            <div>
              <span>COMPLETED</span>
              <p>{c.completed}</p>
            </div>
            <div>
              <p
                className="update-btn"
                onClick={() => handleEdit(c._id)}>
              Update
              </p>
              <p
                className="delete-btn"
                onClick={() => handleDelete(c._id)}>
              Delete
              </p>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
