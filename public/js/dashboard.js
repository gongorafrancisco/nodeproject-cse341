import { getUserUrl, getTicketsUrl, addTicketsUrl, getTicketIdUrl, deleteTicketUrl, completeTicketUrl } from './modules/urls.js';
import { createRequest, fail, postNewTicket, deleteTicketRequest, completeTicketRequest } from './modules/requests.js';
import {userInfoBox, ticketsInfoBox, ticketsList} from './modules/elements.js';

document.addEventListener('DOMContentLoaded', defaultUIConstructor);

// UI Constructors
function defaultUIConstructor() {
    const userInfoUrl = getUserUrl;
    const ticketsInfoUrl = getTicketsUrl;
    createRequest(userInfoUrl, getUserInfo, fail);
    createRequest(ticketsInfoUrl, getTicketsInfo, fail);
}

function afterAddTicketUIConstructor() {
    removeChilds(ticketsList);
    removeChilds(ticketsInfoBox);
    ticketsInfoBox.appendChild(ticketsList);
    const ticketsInfoUrl = getTicketsUrl;
    createRequest(ticketsInfoUrl, getTicketsInfo, fail);
}

// Functions to create or delete elements
function elementConstructor(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    return el;
}

function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function userInfoConstructor(data, element) {

    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled', 'my-5');

    const name = elementConstructor('li', 'Welcome ' + data.user_name);
    const email = elementConstructor('li', 'Email: ' + data.user_email);
    const company = elementConstructor('li', 'Company: ' + data.company_name);

    const createBox = document.createElement('li');
    const createLink = elementConstructor('a', 'New ticket');
    createLink.href = '#';
    createLink.onclick = createAddForm;
    createLink.classList.add('btn', 'btn-primary', 'mx-1', 'my-2');
    createBox.appendChild(createLink);

    const logoutBox = document.createElement('li');
    const logoutLink = elementConstructor('a', 'Logout');
    logoutLink.href = '/logout';
    logoutLink.classList.add('btn', 'btn-secondary', 'mx-1', 'my-2');
    logoutBox.appendChild(logoutLink);

    ul.appendChild(name);
    ul.appendChild(email);
    ul.appendChild(company);
    ul.appendChild(createBox);
    ul.appendChild(logoutBox);
    element.appendChild(ul);
}

function ticketListConstructor(data, element) {
    const li = document.createElement('li');
    if (data.ticket_closed) {
        li.classList.add('alert', 'alert-secondary');
    } else {
        li.classList.add('alert', 'alert-primary');
    }
    const statusBox = document.createElement('div');
    const titleBox = document.createElement('div');
    const actionsBox = document.createElement('div');
    titleBox.classList.add('my-2');

    const prettyDate = dateWithZero(new Date(data.ticket_date));
    const ticketDate = elementConstructor('span', prettyDate);
    ticketDate.classList.add('mr-2', 'text-muted')

    const titleLink = elementConstructor('a', data.ticket_title);
    titleLink.href = '#';
    titleLink.onclick = (event) => {
        event.preventDefault();
        getTicket(data.ticket_id);
    };
    titleLink.classList.add('alert-link');
    
    let status;
    if (data.ticket_closed) {
        status = elementConstructor('span', 'Status: Closed');
        status.classList.add('badge', 'badge-dark');
    } else {
        status = elementConstructor('span', 'Status: Open');
        status.classList.add('badge', 'badge-info');
    }

    if (!data.ticket_closed) {
        const completeLink = elementConstructor('a', 'Complete');
        completeLink.href = '#';
        completeLink.onclick = (event) => {
            event.preventDefault();
            completeTicket(data.ticket_id);
        };
        completeLink.classList.add('btn', 'btn-success', 'mr-3');
        actionsBox.appendChild(completeLink);
    }


    const deleteLink = elementConstructor('a', 'Delete');
    deleteLink.href = '#';
    deleteLink.onclick = (event) => {
        event.preventDefault();
        deleteTicket(data.ticket_id);
    }
    deleteLink.classList.add('btn', 'btn-danger');

    statusBox.appendChild(status);
    titleBox.appendChild(ticketDate);
    titleBox.appendChild(titleLink);
    actionsBox.appendChild(deleteLink);
    li.appendChild(statusBox);
    li.appendChild(titleBox);
    li.appendChild(actionsBox);
    element.appendChild(li);
}

function createAddForm(event) {
    event.preventDefault();

    removeChilds(ticketsInfoBox);
    const backBtn = elementConstructor('a', 'Back to tickets');
    backBtn.href = '#';
    backBtn.onclick = (event) => {
        event.preventDefault();   
        afterAddTicketUIConstructor();
    };
    backBtn.classList.add('btn', 'btn-primary');

    const addForm = document.createElement('form');
    addForm.id = 'newTicketForm';
    addForm.onsubmit = createNewTicketRequest;
    addForm.classList.add('my-3');

    const tiFormGroup = document.createElement('div');
    tiFormGroup.classList.add('form-group');

    const tiLabel = elementConstructor('label', 'Ticket title');
    tiLabel.htmlFor = 'title';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    titleInput.classList.add('form-control');

    const tiHelp = elementConstructor('small', 'Enter the title of your request');
    tiHelp.classList.add('form-text', 'text-muted');
    tiFormGroup.appendChild(tiLabel);
    tiFormGroup.appendChild(titleInput);
    tiFormGroup.appendChild(tiHelp);

    const ciFormGroup = document.createElement('div');
    ciFormGroup.classList.add('form-group');

    const ciLabel = elementConstructor('label', 'Description');
    ciLabel.htmlFor = 'content';

    const contentInput = document.createElement('textarea');
    contentInput.id = 'content'
    contentInput.name = 'content';
    contentInput.required = true;
    contentInput.classList.add('form-control');

    const ciHelp = elementConstructor('small', 'Write the description of your request');
    ciHelp.classList.add('form-text', 'text-muted');
    ciFormGroup.appendChild(ciLabel);
    ciFormGroup.appendChild(contentInput);
    ciFormGroup.appendChild(ciHelp);

    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.value = 'Create ticket';
    submitBtn.classList.add('btn', 'btn-primary');

    addForm.appendChild(tiFormGroup);
    addForm.appendChild(ciFormGroup);
    addForm.appendChild(submitBtn);
    
    ticketsInfoBox.appendChild(backBtn);
    ticketsInfoBox.appendChild(addForm);
}

function ticketSummaryConstructor(data, element) {
    removeChilds(element);
    const backBtn = elementConstructor('a', 'Back to tickets');
    backBtn.href = '#';
    backBtn.onclick = (event) => {
        event.preventDefault();   
        afterAddTicketUIConstructor();
    };
    backBtn.classList.add('btn', 'btn-primary');

    const list = document.createElement('ul');
    list.classList.add('list-unstyled', 'my-3');

    let status;
    if (data.ticket_closed) {
        status = elementConstructor('span', 'Status: Closed');
        status.classList.add('badge', 'badge-dark');
    } else {
        status = elementConstructor('span', 'Status: Open');
        status.classList.add('badge', 'badge-info');
    }

    const ticketNo = elementConstructor('li', 'Ticket #: ' + data.ticket_id);
    ticketNo.classList.add('font-weight-bold');
    const prettyDate = dateWithZero(new Date(data.ticket_date));
    const date = elementConstructor('li', 'Creation date: ' + prettyDate);
    date.classList.add('text-muted');
    
    const title = elementConstructor('li', 'Title: ' + data.ticket_title);
    title.classList.add('my-2');
    const content = elementConstructor('li', 'Request: ' + data.ticket_content);
    content.classList.add('my-2');
    const actionsBox = document.createElement('li');
    actionsBox.classList.add('my-5');
    
    if (!data.ticket_closed) {
        const completeLink = elementConstructor('a', 'Complete');
        completeLink.href = '#';
        completeLink.onclick = (event) => {
            event.preventDefault();
            completeTicket(data.ticket_id);
        };
        completeLink.classList.add('btn', 'btn-success', 'mr-3');
        actionsBox.appendChild(completeLink);
    }

    const deleteLink = elementConstructor('a', 'Delete');
    deleteLink.href = '#';
    deleteLink.onclick = (event) => {
        event.preventDefault();
        deleteTicket(data.ticket_id);
    }
    deleteLink.classList.add('btn', 'btn-danger');

    element.appendChild(backBtn);
    list.appendChild(status);
    list.appendChild(ticketNo);
    list.appendChild(date);
    list.appendChild(title);
    list.appendChild(content);
    actionsBox.appendChild(deleteLink);
    list.appendChild(actionsBox);
    element.appendChild(list);
}
// Function to get a specific ticket 

function getTicket(id) {
    const url = getTicketIdUrl + id;
    createRequest(url, handleGetTicketRequest, fail);
}

function deleteTicket(id) {
    const url = deleteTicketUrl;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("ticket_id", id);
    
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    deleteTicketRequest(url, requestOptions, handleDeleteRequest);
 }

function completeTicket(id) {
    const url = completeTicketUrl;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("ticket_id", id);
    
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    completeTicketRequest(url, requestOptions, handleCompleteTicketRequest);
}

// Functions to handle objects on AJAX calls sucess responses 
function getUserInfo(data) {
    const userInfo = data[0];
    userInfoConstructor(userInfo, userInfoBox, ticketsInfoBox);
};

function getTicketsInfo(data) {
    const ticketsInfo = data;
    for (const key in ticketsInfo) {
        ticketListConstructor(ticketsInfo[key], ticketsList);
    }
};

function addTicketSuccess(data) {
    afterAddTicketUIConstructor();
}

function handleGetTicketRequest(data) {
    const ticketInfo = data[0];
    ticketSummaryConstructor(ticketInfo, ticketsInfoBox);
}

function handleDeleteRequest(data) {
    afterAddTicketUIConstructor();
}

function handleCompleteTicketRequest(data) {
    afterAddTicketUIConstructor();
}

// Functions to send POST Requests
function createNewTicketRequest(event) {
    event.preventDefault();
    console.log("A new ticket request is on its way....");
    this.addEventListener('formdata', sendNewTicket);
    new FormData(this);
}

function sendNewTicket(event){
    console.log('formdata fired');
    // Get the form data from the event object
    const data = event.formData;

   const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    
    for (const pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        urlencoded.append(pair[0], pair[1]);
    }
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
postNewTicket(addTicketsUrl,requestOptions, addTicketSuccess, fail);

}

function dateWithZero(date){ 
    let day, month, hours, minutes, seconds;
    const year = date.getFullYear();
    (date.getDate() < 10 ? day = '0' + date.getDate() : day = + date.getDate());
    (date.getMonth() < 10 ? month = '0' + date.getMonth() : month = + date.getMonth());
    (date.getHours() < 10 ? hours = '0' + date.getHours() : hours = + date.getHours());
    (date.getMinutes() < 10 ? minutes = '0' + date.getMinutes() : minutes = + date.getMinutes());
    (date.getSeconds() < 10 ? seconds = '0' + date.getSeconds() : seconds = + date.getSeconds());
    const pd = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return pd;
  }
