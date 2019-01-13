/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendPromise(url) {
    return new Promise(function(resolve, reject) {
        var answer = sendInfo(url);
        resolve(answer);
        reject("error"); // ignored
    });
}

function sendInfo(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: 1234
        }
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

export function delete_method (url) {
    return sendPromise(url)
    .then ((answer) => {
        return answer;
    })
    .catch((error) => {
        console.log(error);
    });
}
