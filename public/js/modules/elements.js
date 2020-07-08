const rootElement = document.getElementById('root');
const leftPanel = document.getElementById('left');
const rightPanel = document.getElementById('right');
const userInfoBox = document.createElement('div');
const ticketsInfoBox = document.createElement('div');
const ticketsList = document.createElement('ul');
const ticketsH2 = document.createElement('h2')
ticketsH2.textContent ='Tickets Summary';

leftPanel.classList.add('mt-5');
rightPanel.classList.add('mt-5');
ticketsList.classList.add('list-unstyled', 'my-3');

leftPanel.appendChild(userInfoBox);
rightPanel.appendChild(ticketsH2);
rightPanel.appendChild(ticketsInfoBox);
ticketsInfoBox.appendChild(ticketsList);

export {userInfoBox, ticketsInfoBox, ticketsList};