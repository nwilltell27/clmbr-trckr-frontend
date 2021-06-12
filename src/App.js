import { useState, useEffect } from 'react';
import { 
  fetchClimbs, 
  updateClimb,
  createClimb,
  deleteClimb } from './services/climb-service';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AddClimb from './components/AddClimb/AddClimb';
import ClimbLog from './components/ClimbLog/ClimbLog';

import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ClimbLogger from './pages/ClimbLogger/ClimbLogger';
import MasterLog from './pages/MasterLog/MasterLog';

export default function App() {
  
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

      <main>

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
