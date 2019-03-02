/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import cookie from 'react-cookies';

function sendPromise(url) {
    return new Promise(function(resolve, reject) {
        var answer = sendInfo(url);
        resolve(answer);
        reject("error"); // ignored
    });
}

function sendInfo(url) {
    if (cookie.load('loggedin')) {
        try {
            var token = cookie.load('token');
        }
        catch(error) {
            console.log(error);
        }
        return fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-OBSERVATORY-AUTH': token
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
    else {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
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
}

export function delete_method (url) {
    var url_final = window.http + url;
    return sendPromise(url_final)
    .then ((answer) => {
        return answer;
    })
    .catch((error) => {
        console.log(error);
    });
}
