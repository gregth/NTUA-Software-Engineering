/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class Product {
    constructor(details) {
        this.name = details.name;
        this.barcode = details.barcode;
        this.price = details.price;
        this.shop = details.shop;
        this.favourite = details.favourite;
        this.id = details.id;
    }
};