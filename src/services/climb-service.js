const BASE_URL = 'https://clmbr-trckr.herokuapp.com/api/climbs';

function fetchClimbs() {
    return fetch(BASE_URL).then(res => res.json());
}

function updateClimb({ date, facility, difficulty, color, completed, _id }) {
    return fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT', 
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({ date, facility, difficulty, color, completed, _id })
      }).then(res => res.json());
}

function createClimb(data) {
    return fetch(BASE_URL, {
        method: 'POST', 
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json());
}

function deleteClimb(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    }).then(res => res.json());
}

export {
    fetchClimbs, 
    updateClimb,
    createClimb,
    deleteClimb
}