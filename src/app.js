const doc = {
    tbody: null,
    saveButton: null
};
const state = {
    dolgozoLista: [],
    host: null
};

window.addEventListener('load', () => {
    init();
})

function init() {
    state.host = 'http://localhost:8000/';
    doc.tbody = document.querySelector('#tbody');
    doc.saveButton = document.querySelector('#saveButton');
    doc.saveButton.addEventListener('click', () => {
        console.log('műkszik')
    });
    getEmployee();
}

function getEmployee() {
    let endpoint = 'employees';
    let url = state.host + endpoint;
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        state.dolgozoLista = result;
        render();
    })
    .catch( err => {
        console.log('Hiba!')
        console.log(err)
    });
}

function deleteEmployee(id) {
    let endpoint = 'employees';
    let url = state.host + endpoint + '/' + id;
    console.log(url)
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        getEmployee();
        render();
    });
    
}

function startDeleteEmployee(event) {
    let id = event.getAttribute('data-id');
    deleteEmployee(id);
}


function render() {
    let rows = '';
    state.dolgozoLista.forEach( dolgozo => {
        rows += `
            <tr>
                <td>${dolgozo.id}</td>
                <td>${dolgozo.name}</td>
                <td>${dolgozo.city}</td>
                <td>${dolgozo.salary}</td>
                <td>
                    <button class="btn btn-warning"
                    onclick="startDeleteEmployee(this)"
                    data-id="${dolgozo.id}"
                    >Törlés</button>
                </td>
            </tr>
        `;

    });
    doc.tbody.innerHTML = rows;
    
}




