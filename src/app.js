const doc = {
    tbody: document.querySelector('#tbody'),
    saveButton: document.querySelector('#saveButton'),
    idInput: document.querySelector('#id'),
    nameInput: document.querySelector('#name'),
    cityInput: document.querySelector('#city'),
    salaryInput: document.querySelector('#salary')
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
    doc.saveButton.addEventListener('click', () => {
        startAddEmployee();
    });
    getEmployee();
}

function startAddEmployee() {
    let name = doc.nameInput.value;
    let city = doc.cityInput.value;
    let salary = Number(doc.salaryInput.value);
    let employee = {
        name: name,
        city: city,
        salary: salary
    };
    addEmployee(employee);
}

function addEmployee(employee) {
    let endpoint = 'employees';
    let url = state.host + endpoint;
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( response => response.json())
    .then( result => {
        console.log(result);
        clearModalFields();
    });
}

function clearModalFields() {
    doc.nameInput.value = '';
    doc.cityInput.value = '';
    doc.salaryInput.value = '';
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




