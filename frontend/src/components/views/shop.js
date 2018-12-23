/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class Shop {
    constructor(details) {
        this.name = details.name;
        this.id = details.id;
        this.address = details.address;
        this.lat = details.lat;
        this.lgn = details.lgn;
    }
};
