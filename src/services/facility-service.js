const BASE_URL = 'http://localhost:3001/api/facilities';

export {
    fetchFacilities, 
    updateFacility, 
    createFacility, 
    deleteFacility
}

function fetchFacilities() {
    return fetch(BASE_URL).then(res => res.json());
}

function updateFacility({ name, climbs, _id }) {
    return fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({ name, climbs })
    }).then(res => res.json());
}

function createFacility(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function deleteFacility(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    }).then(res => res.json());
}
