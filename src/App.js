import { useState, useEffect } from 'react';

import './App.css';

export default function App() {
  
  // Setting initial State
  const [ climbState, setClimbState ] = useState({
    climbs: [],
    newClimb: {
      date: '', 
      facility: '',
      difficulty: 'V2',
      completed: 'NO'
    }
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
  
  /* function getClimbData() {
    fetch('http://localhost:3001/api/climbs')
    .then(res => res.json())
    .then(data => 
      setClimbState(prevState => ({
        ...prevState,
        climbs: data
      })))
    .catch(err => console.log(err))
  } */

  function logClimb(e) {
    e.preventDefault();
    setClimbState({
      climbs: [...climbState.climbs, climbState.newClimb],
      newClimb: {
        date: '',
        facility: '',
        difficulty: 'V2',
        completed: 'NO'
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
              <option value="NO">Not Yet!</option>
              <option value="YES">Yes!</option>
            </select>
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
              <p>{c.completed}</p>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}
