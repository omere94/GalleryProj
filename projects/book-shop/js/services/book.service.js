'use strict';

const STORAGE_KEY = 'bookDb';
const bookNames = ['Deadpool', 'Wolverine', 'Spider-Man',
'Iron Man', 'The Avengers'];
var gBookId = 1;
var gBooks;
var gLastSort;
var gNewTable = -1;

_createBooks();

function getBooks() {
    return gBooks;
}

function updateBook(bookId, newPrice){
    const BOOK = gBooks.find((book) => bookId === book.id);
    BOOK.price = newPrice;
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex((book) => book.id === bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price));
    _saveBooksToStorage();
}

function rateBook(num, bookId) {
    const elRateInput = document.querySelector('.rate-input');
    switch (num) {
        case 1:
            if (elRateInput.value >= 10) break;
            elRateInput.value++;
                break;

        case -1:
            if (elRateInput.value <= 0) break;
            elRateInput.value--;
                break;
    }
    var book = getBookById(bookId);
    book.rate = elRateInput.value;
    _saveBooksToStorage();
}

/*function setBookSort(sortBy, newTable) {
    if (gLastSort === sortBy) {
        gNewTable = 1;
    }
    switch (sortBy) {
        case 'Id':
            gBooks.sort((b1, b2) => (b1.id - b2.id) * newTable);
            break;
        case 'Title':
            gBooks.sort((b1, b2) => (b1.name - b2.name) * newTable);
            break;
        case 'Price':
            gBooks.sort((b1, b2) => (b1.price - b2.price) * newTable);
            break;
        case 'Rate':
            gBooks.sort((b1, b2) => (b1.rate - b2.rate) * newTable);
            break;
        default:
            break;
    }
    gNewTable = -1;
    gLastSort = (!gLastSort) ? sortBy : null;
}*/

function getBookById(bookId) {
    var book = gBooks.find((book) => book.id === bookId);
    return book;
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex((book) => book.id === bookId);
    return bookIdx;
}

function _createBook(name , price) {
    return {
        id: gBookId++,
        name,
        price,
        imgUrl: 5,
        rate: ''
    };
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 5; i++) {
            books.push(_createBook(bookNames[i], getRandomIntInclusive(99, 299)));
        }
    }
    gBooks = books;
    gBookId = gBooks[(gBooks.length - 1)].id + 1;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

