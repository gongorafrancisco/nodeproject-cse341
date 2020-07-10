import { getUserUrl, getTicketsUrl, addTicketsUrl } from './modules/urls.js';
import { createRequest, fail, postNewTicket } from './modules/requests.js';
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
    li.classList.add('alert', 'alert-primary');

    const parsedDate = new Date(data.ticket_date);
    const prettyDate = parsedDate.getDate() + '/' + parsedDate.getMonth() + '/' + parsedDate.getFullYear();
    const ticketDate = elementConstructor('span', prettyDate);
    ticketDate.classList.add('mr-2')

    const titleLink = elementConstructor('a', data.ticket_title);
    titleLink.href = '#';
    titleLink.classList.add('alert-link');

    const completeLink = elementConstructor('a', 'Complete');
    completeLink.href = '#';
    completeLink.classList.add('mx-2', 'badge', 'badge-success');

    const deleteLink = elementConstructor('a', 'Delete');
    deleteLink.href = '#';
    deleteLink.classList.add('mx-2', 'badge', 'badge-danger');

    li.appendChild(ticketDate);
    li.appendChild(titleLink);
    li.appendChild(completeLink);
    li.appendChild(deleteLink);
    element.appendChild(li);
}

function createAddForm(event) {
    event.preventDefault();

    removeChilds(ticketsInfoBox);

    const addForm = document.createElement('form');
    addForm.id = 'newTicketForm';
    addForm.onsubmit = createNewTicketRequest;

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

    ticketsInfoBox.appendChild(addForm);
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
    console.log(data);
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
    let data = event.formData;

   var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("userNo", "2");

    for (const pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        urlencoded.append(pair[0], pair[1]);
    }
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
postNewTicket(addTicketsUrl,requestOptions, addTicketSuccess, fail);

}
