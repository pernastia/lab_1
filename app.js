//state
const state = {
    tickets: [],
    nextId: 1,
    editingId: null,
    searchQuery: "",
    sortBy: ""
};

//зберігання в пам'яті
function saveToStorage(){
    localStorage.setItem("tickets", JSON.stringify(state.tickets));
}

function loadFromStorage(){
    const data = localStorage.getItem("tickets");

    if(data){
        state.tickets = JSON.parse(data);
    }
}

//юзери
const usersList = [
    {id:1, name:"Ivan Petrenko"},
    {id:2, name:"Olena Koval"},
    {id:3, name:"Pavlo Melnyk"}
];

//статуси
const statuses = [
    {id:1, name:"Open"},
    {id:2, name:"In Progress"},
    {id:3, name:"Closed"}
];

//DOM-elements
const form = document.getElementById("ticketForm");
const table = document.getElementById("ticketTable");
const statusSelect = document.getElementById("status");
const authorSelect = document.getElementById("author");

//select
function loadLookups(){

    statuses.forEach(s=>{
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = s.name;
        statusSelect.appendChild(opt);
    });

    usersList.forEach(u=>{
        const opt = document.createElement("option");
        opt.value = u.id;
        opt.textContent = u.name;
        authorSelect.appendChild(opt);
    });
}

function readForm(){
    return {
        subject: document.getElementById("subject").value.trim(),
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        message: document.getElementById("message").value.trim(),
        author: document.getElementById("author").value
    };
}

//валідація
function validate(data){

    let valid = true;
    clearErrors();

    if(data.subject.length < 4){
        setError("subject","Minimum 4 symbols");
        valid=false;
    }
    
    if(!data.status){
        setError("status","Choose status");
        valid=false;
    }

    if(!data.priority){
        setError("priority","Choose priority");
        valid=false;
    }


    if(data.message.length < 8){
        setError("message","Too short");
        valid=false;
    }

    if(!data.author){
        setError("author","Choose name");
        valid=false;
    }

    return valid;
}

function setError(field, message){
    const input = document.getElementById(field);
    input.classList.add("invalid");
    document.getElementById(field+"Error").textContent = message;
}

function clearErrors(){
    document.querySelectorAll(".invalid")
        .forEach(el=>el.classList.remove("invalid"));

    document.querySelectorAll(".error-text")
        .forEach(el=>el.textContent="");
}

//add item
function addItem(data){

    const ticket = {
        id: state.nextId++,
        subject: data.subject,
        statusId: Number(data.status),
        priority: data.priority,
        message: data.message,
        authorId: Number(data.author)
    };

    state.tickets.push(ticket);
    saveToStorage();
}

function editItem(id){

    clearErrors();
    const ticket = state.tickets.find(t => t.id === id);
    if(!ticket) return;

    document.getElementById("subject").value = ticket.subject;
    document.getElementById("status").value = String(ticket.statusId);
    document.getElementById("priority").value = ticket.priority;
    document.getElementById("message").value = ticket.message;
    document.getElementById("author").value = String(ticket.authorId);

    state.editingId = id;

    form.querySelector("button[type='submit']").textContent = "Save";
}

function updateItem(data){
    const index = state.tickets.findIndex(t => t.id === state.editingId);
    if(index === -1) return;

    state.tickets[index] = {
        id: state.editingId,
        subject: data.subject,
        statusId: Number(data.status),
        priority: data.priority,
        message: data.message,
        authorId: Number(data.author)
    };
    saveToStorage();
}

function deleteItem(id){
    state.tickets = state.tickets.filter(t => t.id !== id);
    saveToStorage();
}

//render (інтерфейс)
function renderTickets(){

    table.innerHTML="";

    let ticketsToShow = [...state.tickets];

    //пошук
    if(state.searchQuery && state.searchQuery.trim() !== ""){
        ticketsToShow = ticketsToShow.filter(ticket =>
            ticket.subject
                .toLowerCase()
                .includes(state.searchQuery.toLowerCase())
        );
    }

    //сортування
    if(state.sortBy === "priority"){
        const order = {Low:3, Medium:2, High:1};

        ticketsToShow.sort((a,b)=>
            order[a.priority] - order[b.priority]
        );
    }

    ticketsToShow.forEach(ticket=>{

        const statusName = statuses.find(s=>s.id===ticket.statusId)?.name;
        const userName = usersList.find(u=>u.id===ticket.authorId)?.name;
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${ticket.id}</td>
        <td>${ticket.subject}</td>
        <td>${statusName}</td>
        <td>${ticket.priority}</td>
        <td>${userName}</td>
        <td>${ticket.message}</td>
        <td>
            <button type="button" class="edit-btn" data-id="${ticket.id}">
               Edit
            </button>
            <button type="button" class="delete-btn" data-id="${ticket.id}">
               Delete
            </button>
        </td>
        `;

        table.appendChild(row);
    });
}

//handlers (реакція на подію)
form.addEventListener("submit",function(e){
    e.preventDefault();

    const formData = readForm();
    if(!validate(formData)) return;

    if(state.editingId !== null){
        updateItem(formData);
    }
    else{
        addItem(formData);
    }
    saveToStorage();
    renderTickets();
    form.reset();
    clearErrors();
    state.editingId = null;
    form.querySelector("button[type='submit']").textContent = "Add";
});

    table.addEventListener("click",function(e){
    if(e.target.classList.contains("delete-btn")){
        const id = Number(e.target.dataset.id);
        deleteItem(id);
        renderTickets();
    }

    if(e.target.classList.contains("edit-btn")){
        const id = Number(e.target.dataset.id);
        editItem(id);
    }
});

//помилки вводу
document.querySelectorAll("input, textarea, select")
.forEach(el=>{
    el.addEventListener("input",()=>{
        el.classList.remove("invalid");
        const error = document.getElementById(el.id+"Error");
        if(error) error.textContent="";
    });
});

//пошук
document.getElementById("searchInput")
.addEventListener("input", e=>{
    state.searchQuery = e.target.value;
    renderTickets();
});

//сортування
document.getElementById("sortSelect")
.addEventListener("change", e=>{
    state.sortBy = e.target.value;
    renderTickets();
});

//start
loadLookups();
loadFromStorage();
renderTickets();
