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

function postNewTicket ( url, requestOptions, success, fail) {
    fetch(url, requestOptions)
        .then((response) => handleErrors(response))
        .then((data) => success(data))
        .catch((error) => fail(error));
}

function deleteTicketRequest(url, requestOptions, success, fail) {
    fetch(url, requestOptions)
        .then((response) => handleErrors(response))
        .then((data) => success(data))
        .catch((error) => fail(error));
}

function completeTicketRequest(url, requestOptions, success, fail) {
    fetch(url, requestOptions)
    .then((response) => handleErrors(response))
    .then((data) => success(data))
    .catch((error) => fail(error));
}
export { createRequest, fail, handleErrors, postNewTicket, deleteTicketRequest, completeTicketRequest };