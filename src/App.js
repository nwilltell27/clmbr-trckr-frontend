import { useState, useEffect } from 'react';

import './App.css';

export default function App() {
  
  const [ climbState, setClimbState ] = useState({
    climbs: [{
      date: '2021-05-15',
      facility: 'Hollywood Boulders', 
      difficulty: 'V2',
      completed: 'Yes'
    }],
    newClimb: {
      date: '', 
      facility: '',
      difficulty: 'V2',
      completed: false
    }
  });

  function logClimb(e) {
    e.preventDefault();
    setClimbState({
      climbs: [...climbState.climbs, climbState.newClimb],
      newClimb: {
        date: '',
        facility: '',
        difficulty: 'V2',
        completed: false
      }
    });
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>{'🧗'} CLMBR TRCKR</h1>
      </header>
      
      <section className="add-climb">
        <h2>Log a Climb!</h2>
        <form className="form-align" onSubmit={logClimb}>
          <label>
            <span>Date: </span>
            <input type="date" name="date" value={climbState.date} onChange={handleChange} />
          </label>
          <label>
            <span>Facility: </span>
            <input name="facility" value={climbState.facility} onChange={handleChange} />
          </label>
          <label>
            <span>Difficulty: </span>
            <select name="difficulty" value={climbState.difficulty} onChange={handleChange}>
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
            <input type="checkbox" name="completed" value={climbState.completed} onChange={handleChange} />
          </label>
          <button>Log Climb</button>
        </form>
      </section>

      <section>
        <h2>Here are all your Climbs!</h2>
        {climbState.climbs.map((c, i) => (
          <article key={i}>
            <div>
              <p>DATE</p>
              <p>{c.date}</p>
            </div>
            <div>
              <p>FACILITY</p>
              <p>{c.facility}</p>
            </div>
            <div>
              <p>DIFFICULTY</p>
              <p>{c.difficulty}</p>
            </div>
            <div>
              <p>COMPLETED?</p>
              <p>{c.completed ? 'Yes!' : 'Not yet!'}</p>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
