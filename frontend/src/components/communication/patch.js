/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendPromise(url, body) {
    return new Promise(function(resolve, reject) {
        var answer = sendInfo(url, body);
        resolve(answer);
        reject("error"); // ignored
    });
}

function sendInfo(url, body) {
    return fetch(url, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: 1234
        },
        body: JSON.stringify(body)
    })
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        console.error(error);
        return("error");
    });
}

export function patch (url, body) {
    return sendPromise(url, body)
    .then ((answer) => {
        return answer;
    })
    .catch((error) => {
        console.log(error);
    });
}
