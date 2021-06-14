import './App.css';
import { useState, useEffect } from 'react';
import { 
  fetchClimbs, 
  updateClimb,
  createClimb,
  deleteClimb } from './services/climb-service';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import AddClimb from './components/AddClimb/AddClimb';
// import ClimbLog from './components/ClimbLog/ClimbLog';

import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ClimbLogger from './pages/ClimbLogger/ClimbLogger';
import MasterLog from './pages/MasterLog/MasterLog';
// import FacilityForm from './pages/FacilityForm/FacilityForm';

export default function App() {
  
  // Climb State & Functions
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

  // Facility State & Functions
  const [ facilityState, setFacilityState ] = useState({
    facilities: [],
    newFacility: {
      name: '',
      climbs: []
    },
    editMode: false
  });

  useEffect(() => {
    async function getFacilityData() {
      const facilities = await fetch('http://localhost:3001/api/facilities')
      .then(res => res.json());
      setFacilityState(prevState => ({
        ...prevState,
        facilities
      }));
    }
    getFacilityData();
  }, []);

  function handleFacilityChange(e) {
    setFacilityState((prevState) => ({
      ...prevState,
      newFacility: {
        ...prevState.newFacility,
        [e.target.name]: e.target.value
      }
    }));
  }

  async function handleFacilitySubmit(e) {
    e.preventDefault();
    if(facilityState.editMode) {
      const { _id, name, climbs } = facilityState.newFacility;
      try {
        const facilities = await fetch(`http://localhost:3001/api/facilities/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify({ name, climbs })
        }).then(res => res.json());
          setFacilityState({
          facilities,
          newFacility: {
            name: '',
            climbs: []
          },
          editMode: false
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const facility = await fetch('http://localhost:3001/api/facilities', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(facilityState.newFacility)
        }).then(res => res.json());
          setFacilityState({
          facilities: [...facilityState.facilities, facility],
          newFacility: {
            name: '',
            climbs: []
          }
        });
      } catch (error) {
        console.log(error);
      }

    }
  }

  function handleFacilityEdit(id) {
    const facilityToEdit = facilityState.facilities.find(facility => facility._id === id);
    setFacilityState(prevState => ({
      ...prevState,
      newFacility: facilityToEdit,
      editMode: true
    }));
  }
  
  async function handleFacilityDelete(id) {
    try {
      const facilities = await fetch(`http://localhost:3001/api/facilities/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
      setFacilityState(prevState => ({
        ...prevState,
        facilities,
      }));
    }  catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header />

      <main>

        <section>
          <h2>Add Facility</h2>
          <form onSubmit={handleFacilitySubmit}>
            <label>
              Name: 
            </label>
            <input 
              name="name" 
              value={facilityState.newFacility.name} 
              onChange={handleFacilityChange}
            />
            <button>{facilityState.editMode ? 'Edit' : 'Submit' }</button>
          </form>
        </section>
        
        <section>
          <h2>Facilities</h2>
          {facilityState.facilities.map(f => (
            <article key={f._id}>
              <div>{f.name}</div>
              <div>{f.climbs}</div>
              <button onClick={() => handleFacilityEdit(f._id)}>Edit</button>
              <button onClick={() => handleFacilityDelete(f._id)}>Delete</button>
            </article>
          ))}
        </section>

        <Switch>
          <Route
            exact path='/'
            render={() => (
              <HomePage

              />
            )}
          />

          <Route 
            path='/add-climbs'
            render={() => (
              <ClimbLogger
                // AddClimb
                date={climbState.newClimb.date}
                facility={climbState.newClimb.facility}
                difficulty={climbState.newClimb.difficulty}
                color={climbState.newClimb.color}
                completed={climbState.newClimb.completed}
                editMode={climbState.editMode}
                newClimb={climbState.newClimb}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
          />

          <Route 
            path='/climb-log'
            render={() => (
              <MasterLog 
                // ClimbLog
                climbs={climbState.climbs}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          />

        </Switch>

      </main>

      <br />
      <Footer />
    </div>
  );
}
