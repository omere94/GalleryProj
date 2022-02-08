'use strict';

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = `<table>
    <thead>
        <tr>
            <th onclick="onSetSortBy('Id')">Id</th>
            <th onclick="onSetSortBy('Title')">Title</th>
            <th onclick="onSetSortBy('Price')">Price</th>
            <th onclick="onSetSortBy('Rate')">Rate</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>`;
    var htmlsArr = books.map((book) => {
        var id = book.id;
        return `<tr>
                    <td>${id}</td>
                    <td>${book.name}</td>
                    <td>${book.price}</td>
                    <td>${book.rate}</td>
                    <td>
                    <button class="action read" onclick="onReadBook(${id})">Read</button> 
                    <button class="action update" onclick="onUpdateBook(${id})">Update</button> 
                    <button class="action delete" onclick="onDeleteBook(${id})">Delete</button>
                    </td>
                </tr> `
    })
    strHtmls += htmlsArr.join('');
    strHtmls += `</tbody></table>`;
    document.querySelector('.books-container').innerHTML = strHtmls;
}

function onReadBook(bookId) {
    const book = getBookById(bookId);
    const elModal = document.querySelector('.modal');
    elModal.querySelector('h2').innerText = book.name;
    elModal.querySelector('.span2').innerHTML = 
    `<button class="rate-buttons" onclick="onRateClick(-1, ${bookId})">-</button>
    <input type="number" value="${book.rate}" class="rate-input"/>
    <button class="rate-buttons" onclick="onRateClick(+1, ${bookId})">+</button>`
    elModal.querySelector('h4 span').innerText = book.price;
    elModal.querySelector('p').innerText = makeLorem();
    elModal.classList.add('open');
}

function onUpdateBook(bookId) {
    const price = prompt('New Price Please ?');
    if (!price) return;
    updateBook(bookId, price);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();;
}

function onAddBook() {
    const elName = document.querySelector('input[name=add-name]');
    const name = elName.value.trim();
    if (!name) return;
    const elPrice = document.querySelector('input[name=add-price]');
    const price = elPrice.value.trim();
    if (!price) return;
    addBook(name, price);
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onRateClick(num, bookId) {
    getBookById(bookId);
    rateBook(num, bookId);
    renderBooks();
}

function onSetSortBy(sortBy) {
    setBookSort(sortBy);
    renderBooks();
}
