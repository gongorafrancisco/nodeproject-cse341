const getUserUrl = '/users/';
const getTicketsUrl = '/tickets/user/';
const userId = '2';
const rootElement = document.getElementById('root');
const leftPanel = document.getElementById('left');
const rightPanel = document.getElementById('right');
const userInfoBox = document.createElement('div');
const ticketsInfoBox = document.createElement('div');
const ticketsList = document.createElement('ul');
const ticketsH1 = elementConstructor('h2', 'Tickets Summary');

leftPanel.classList.add('mt-5');
rightPanel.classList.add('mt-5');
ticketsList.classList.add('list-unstyled', 'my-3');

leftPanel.appendChild(userInfoBox);
rightPanel.appendChild(ticketsInfoBox);
ticketsInfoBox.appendChild(ticketsH1);
ticketsInfoBox.appendChild(ticketsList);
document.addEventListener('DOMContentLoaded', defaultUIConstructor);

function defaultUIConstructor(){
    userInfoUrl = getUserUrl + userId;
    ticketsInfoUrl = getTicketsUrl + userId;
    createRequest(userInfoUrl, getUserInfo, fail);
    createRequest(ticketsInfoUrl, getTicketsInfo, fail);
}


// Functions to handle objects on AJAX calls sucess responses 
function getUserInfo(data) {
    const userInfo = data[0];
    userInfoConstructor(userInfo, userInfoBox);
};

function getTicketsInfo(data) {
    const ticketsInfo = data;
    for (const key in ticketsInfo) {
        ticketListConstructor(ticketsInfo[key], ticketsList);
    }
};

/*
Functions to construct or delete elements
*/
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
    
    const logoutBox = document.createElement('li');
    const logoutLink = elementConstructor('a', 'Logout');
    logoutLink.href = '/logout/' + data.user_id;
    logoutBox.appendChild(logoutLink);

    const createBox = document.createElement('li');
    const createLink = elementConstructor('a', 'New ticket');
    createLink.href = '#';
    createBox.appendChild(createLink);
    
    ul.appendChild(name);
    ul.appendChild(email);
    ul.appendChild(company);
    ul.appendChild(logoutBox);
    ul.appendChild(createBox);
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
    deleteLink.classList.add('mx-2','badge', 'badge-danger');
    
    li.appendChild(ticketDate);
    li.appendChild(titleLink);
    li.appendChild(completeLink);
    li.appendChild(deleteLink);
    element.appendChild(li);
}

/* 
Functions to use webservices
*/
function createRequest(url, success, fail) {
    fetch(url)
        .then((response) => handleErrors(response))
        .then((data) => success(data))
        .catch((error) => fail(error));
};

// Function to handle AJAX failure
function fail(error) {
    console.log(error);
};

// Function to handle AJAX errors response
function handleErrors(response) {
    if (!response.ok) {
        throw (response.status + ': ' + response.statusText);
    }
    return response.json();
};