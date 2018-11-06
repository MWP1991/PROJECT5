/**
 *   @author Page, Marshall (mpage@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 5 || created: 11.5.2018
 *   @todo
 */

'use strict';

const PROMPT = require('readline-sync');

const GENRES = ['Classical', 'Easy Listening', 'Jazz', 'Pop', 'Rock', 'Other'];
const PRICE = [
    {min: 0, max: 2.99, name: '$3.00 and under'},
    {min: 3, max: 5.99, name: '$3.00 to $5.99'},
    {min: 6, max: 9.99, name: '$6.00 to $9.99'},
    {min: 10, max: 9999, name: '$10.00 and over'}
];
const MENU = [
    {text: '0. Purchase', action: makePurchase},
    {text: '1. Receipt', action: receipt},
    {text: '2. Exit', action: exit}
];

let sales;
let genres;
let Exit = false;

/**
 * main
 */
function main() {
    setSales();
    setGenres();

    while(!Exit) {
        showMainMenu();
        setGenreTotals();
    }
}

/**
 * Starting page
 */
function showMainMenu() {
    console.log('Please select a command: ');
    for(let i = 0; i < MENU.length; i++) {
        console.log(`\t${MENU[i].text}`);
    }
    let menuSelection = PROMPT.questionInt('--> ');
    if(menuSelection >= 0 && menuSelection < MENU.length) {
        MENU[menuSelection].action();
    }
}

/**
 * genres
 */
function setGenres() {
    genres = new Array(GENRES.length);
    for(let i = 0; i < GENRES.length; i++) {
        genres[i] = { id: i, genre: GENRES[i], numOfTransactions: 0, totalSales: 0 };
    }
}

/**
 * sales
 */
function setSales() {
    sales = [];
}

/**
 * finds the price and genre
 */
function makePurchase() {
    let price = findPrice();
    let genre = findGenre();

    sales.push({ price, genre });
}

/**
 * receipt.
 */
function showReceipt(genreList) {
    for(let i = 0; i < genreList.length; i++) {
        console.log(`----- ${genreList[i].genre} -----`);
        for(let x = 0; x < PRICE.length; x++) {
            let currPrice = PRICE[x];
            let filteredTransactions = filterTransactions(x, genreList[i].id);
            console.log(`${currPrice.name}:\t${filteredTransactions.length}`);
        }
        console.log('\n');
    }
}

/**
 * Show a report for all genres without sorting.
 */
function receipt() {
    showReceipt(genres);
}


/**
 *
 */
function filterTransactions(price, genre) {
    let result = sales.filter((el) => {
        return el.price >= PRICE[price].min && el.price <= PRICE[price].max && el.genre === genre;
    });
    return result;
}

/**
 * Ask how much
 *
 */
function findPrice() {
    let price = PROMPT.questionFloat('Please enter purchase amount: ');

    if(price >= 0) {
        return price;
    } else {
        console.log('Price must be positive!');
        return findPrice();
    }
}

/**
 * Genres
 */
function findGenre() {
    console.log('Types of genres: ');
    for(let i = 0; i < genres.length; i++) {
        console.log(`${i}. ${genres[i].genre}`);
    }

    let genre = PROMPT.questionInt('Genre: ');

    if(genre >= 0 && genre < genres.length) {
        return genre;
    } else {
        console.log('Please select a genre.');
        return findGenre();
    }
}

/**
 * total sales and number of sales
 */
function setGenreTotals() {
    for(let i = 0; i < sales.length; i++) {
        genres[sales[i].genre].totalSales += sales[i].price;
        genres[sales[i].genre].numOfTransactions += 1;
    }
}

/**
 * Exit program with true or false question
 */
function exit() {
    Exit = true;
}

main()


/*
HappyTunes is a progressive web application for downloading music files. Each time a file is purchased,
a transaction record is created that includes the music genre and price paid. The available genres are Classical,
Easy Listening, Jazz, Pop, Rock, and Other. Develop an application that accepts input data for each
transaction and displays a report that lists each of the music genres,
along with a count of the number of downloads in each of the following price categories
Over $10.00
$6.00 through $9.99
$3.00 through $5.99
Under $3.00
*/